"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { ProductVisual } from "@/components/store/ProductVisual";
import { Icon } from "@/components/ui/Icon";
import { formatPrice } from "@/lib/format";
import {
  isCardNumber,
  isCvc,
  isExpiry,
  isPostalCode,
  isUsState,
  isValidEmail,
} from "@/lib/validation";
import {
  isShippingMethod,
  orderTotals,
  shippingCost,
  shippingMethods,
  type ShippingMethodId,
} from "@/lib/cart-math";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

const emptyForm: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  postalCode: "",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
};

const formatCardNumber = (value: string) =>
  value
    .replace(/\D/g, "")
    .slice(0, 19)
    .replace(/(\d{4})(?=\d)/g, "$1 ");

const formatExpiry = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
};

interface InputFieldProps {
  id: string;
  label: string;
  error?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  inputMode?: "text" | "email" | "tel" | "numeric";
  maxLength?: number;
  className?: string;
}

function InputField({
  id,
  label,
  error,
  className,
  ...props
}: InputFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <input
        id={id}
        className="field"
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p className="field-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

export function CheckoutForm() {
  const router = useRouter();
  const { items, subtotal, hydrated, clearCart } = useCart();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethodId>("standard");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  const totals = orderTotals(subtotal, shippingMethod);
  const update =
    (key: keyof FormState) => (event: ChangeEvent<HTMLInputElement>) => {
      const raw = event.target.value;
      const value =
        key === "cardNumber"
          ? formatCardNumber(raw)
          : key === "expiry"
            ? formatExpiry(raw)
            : key === "state"
              ? raw.toUpperCase().slice(0, 2)
              : raw;
      setForm((current) => ({ ...current, [key]: value }));
    };

  const fillDemoCard = () => {
    setForm((current) => ({
      ...current,
      cardName: current.cardName || `${current.firstName} ${current.lastName}`.trim(),
      cardNumber: "4242 4242 4242 4242",
      expiry: "12/30",
      cvc: "123",
    }));
  };

  function validate() {
    const next: Record<string, string> = {};
    if (form.firstName.trim().length < 2) next.firstName = "Enter your first name.";
    if (form.lastName.trim().length < 2) next.lastName = "Enter your last name.";
    if (!isValidEmail(form.email)) next.email = "Enter a valid email address.";
    if (form.address1.trim().length < 4) next.address1 = "Enter your street address.";
    if (form.city.trim().length < 2) next.city = "Enter your city.";
    if (!isUsState(form.state)) next.state = "Use a two-letter state code.";
    if (!isPostalCode(form.postalCode)) next.postalCode = "Enter a valid postal code.";
    if (form.cardName.trim().length < 2) next.cardName = "Enter the name on the card.";
    if (!isCardNumber(form.cardNumber)) next.cardNumber = "Enter a valid card number.";
    if (!isExpiry(form.expiry)) next.expiry = "Use MM/YY with a future date.";
    if (!isCvc(form.cvc)) next.cvc = "Enter a valid security code.";
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (items.length === 0) {
      setStatus("error");
      setMessage("Your cart is empty.");
      return;
    }

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setMessage("Please check the highlighted fields and try again.");
      return;
    }

    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((line) => ({
            slug: line.slug,
            quantity: line.quantity,
            variant: line.variant,
          })),
          shippingMethod,
          customer: {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            address1: form.address1,
            address2: form.address2,
            city: form.city,
            state: form.state,
            postalCode: form.postalCode,
            country: "United States",
          },
          payment: {
            cardName: form.cardName,
            cardNumber: form.cardNumber,
            expiry: form.expiry,
            cvc: form.cvc,
          },
        }),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        orderNumber?: string;
        error?: string;
        errors?: Record<string, string>;
      };
      if (!response.ok || !result.ok || !result.orderNumber) {
        if (result.errors) setErrors(result.errors);
        throw new Error(result.error || "We couldn't place your order. Please try again.");
      }
      clearCart();
      router.push(`/checkout/success?order=${encodeURIComponent(result.orderNumber)}`);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  if (!hydrated) {
    return (
      <section className="bg-ink pb-20 pt-32 md:pt-36">
        <div className="container-x">
          <p className="border border-line px-6 py-16 text-center text-cream-2">
            Loading checkout…
          </p>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="bg-ink pb-20 pt-32 md:pt-36">
        <div className="container-x">
          <p className="eyebrow">Checkout</p>
          <h1 className="display mt-3 text-[clamp(2.6rem,5.5vw,4.6rem)] text-cream">
            Your cart is empty
          </h1>
          <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-cream-2">
            Add a record or some tour goods before heading to checkout.
          </p>
          <Link href="/store" className="btn btn-gold mt-7">
            Shop the store
            <Icon name="arrow-right" size={15} />
          </Link>
        </div>
      </section>
    );
  }

  const shippingPrice = shippingCost(subtotal, shippingMethod);

  return (
    <section className="bg-ink pb-20 pt-32 md:pt-36">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Secure checkout</p>
            <h1 className="display mt-3 text-[clamp(2.6rem,5.5vw,4.6rem)] text-cream">
              Checkout
            </h1>
          </div>
          <Link href="/cart" className="link-arrow">
            Back to cart
            <Icon name="arrow-left" size={15} />
          </Link>
        </div>

        <div className="mt-8 border border-gold/35 bg-gold/[0.06] px-5 py-4">
          <p className="text-[0.82rem] leading-relaxed text-cream-2">
            <span className="font-semibold text-gold">Demo checkout.</span> This storefront is a
            portfolio demonstration. Orders are recorded, but no payment is processed and no
            charge will appear on your card. Use the demo card below to try the flow.
          </p>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_0.8fr] lg:gap-16">
          <form onSubmit={handleSubmit} noValidate>
            <fieldset className="border-0">
              <legend className="flex items-center gap-3 font-display text-2xl text-cream">
                <span className="font-condensed text-[0.62rem] tracking-[0.2em] text-gold">
                  01
                </span>
                Contact
              </legend>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <InputField
                  id="checkout-email"
                  label="Email address"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={update("email")}
                  error={errors.email}
                  className="sm:col-span-2"
                />
                <InputField
                  id="checkout-first-name"
                  label="First name"
                  autoComplete="given-name"
                  value={form.firstName}
                  onChange={update("firstName")}
                  error={errors.firstName}
                />
                <InputField
                  id="checkout-last-name"
                  label="Last name"
                  autoComplete="family-name"
                  value={form.lastName}
                  onChange={update("lastName")}
                  error={errors.lastName}
                />
              </div>
            </fieldset>

            <fieldset className="mt-10 border-0 border-t border-line pt-8">
              <legend className="flex items-center gap-3 font-display text-2xl text-cream">
                <span className="font-condensed text-[0.62rem] tracking-[0.2em] text-gold">
                  02
                </span>
                Shipping address
              </legend>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <InputField
                  id="checkout-address1"
                  label="Street address"
                  autoComplete="address-line1"
                  value={form.address1}
                  onChange={update("address1")}
                  error={errors.address1}
                  className="sm:col-span-2"
                />
                <InputField
                  id="checkout-address2"
                  label="Apartment, suite, etc. (optional)"
                  autoComplete="address-line2"
                  value={form.address2}
                  onChange={update("address2")}
                  className="sm:col-span-2"
                />
                <InputField
                  id="checkout-city"
                  label="City"
                  autoComplete="address-level2"
                  value={form.city}
                  onChange={update("city")}
                  error={errors.city}
                />
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    id="checkout-state"
                    label="State"
                    autoComplete="address-level1"
                    placeholder="TN"
                    value={form.state}
                    onChange={update("state")}
                    error={errors.state}
                    maxLength={2}
                  />
                  <InputField
                    id="checkout-postal"
                    label="ZIP code"
                    autoComplete="postal-code"
                    placeholder="37203"
                    value={form.postalCode}
                    onChange={update("postalCode")}
                    error={errors.postalCode}
                    maxLength={10}
                  />
                </div>
              </div>
              <p className="mt-3 text-[0.72rem] text-cream-3">
                Shipping within the United States only.
              </p>
            </fieldset>

            <fieldset className="mt-10 border-0 border-t border-line pt-8">
              <legend className="flex items-center gap-3 font-display text-2xl text-cream">
                <span className="font-condensed text-[0.62rem] tracking-[0.2em] text-gold">
                  03
                </span>
                Shipping method
              </legend>
              <div className="mt-5 space-y-3">
                {shippingMethods.map((option) => {
                  const price =
                    option.id === "standard" && subtotal >= 7500 ? 0 : option.price;
                  return (
                    <label
                      key={option.id}
                      className={`flex cursor-pointer items-center gap-4 border px-4 py-4 transition-colors ${
                        shippingMethod === option.id
                          ? "border-gold bg-gold/[0.06]"
                          : "border-line hover:border-line-strong"
                      }`}
                    >
                      <input
                        type="radio"
                        name="shippingMethod"
                        value={option.id}
                        checked={shippingMethod === option.id}
                        onChange={(event) => {
                          if (isShippingMethod(event.target.value)) {
                            setShippingMethod(event.target.value);
                          }
                        }}
                        className="h-4 w-4 accent-[#d9a96c]"
                      />
                      <span className="flex-1">
                        <span className="block text-[0.9rem] text-cream">{option.label}</span>
                        <span className="block text-[0.76rem] text-cream-3">{option.detail}</span>
                      </span>
                      <span className="text-[0.85rem] tabular-nums text-cream">
                        {price === 0 ? "Free" : formatPrice(price)}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className="mt-10 border-0 border-t border-line pt-8">
              <legend className="flex items-center gap-3 font-display text-2xl text-cream">
                <span className="font-condensed text-[0.62rem] tracking-[0.2em] text-gold">
                  04
                </span>
                Payment
              </legend>
              <div className="mt-2 flex items-center justify-between gap-4">
                <p className="text-[0.76rem] text-cream-3">
                  No real charge will be made. This is a demonstration checkout.
                </p>
                <button
                  type="button"
                  onClick={fillDemoCard}
                  className="shrink-0 font-condensed text-[0.62rem] uppercase tracking-[0.16em] text-gold underline underline-offset-4 hover:text-cream"
                >
                  Use demo card
                </button>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <InputField
                  id="checkout-card-name"
                  label="Name on card"
                  autoComplete="cc-name"
                  value={form.cardName}
                  onChange={update("cardName")}
                  error={errors.cardName}
                  className="sm:col-span-2"
                />
                <InputField
                  id="checkout-card-number"
                  label="Card number"
                  autoComplete="cc-number"
                  inputMode="numeric"
                  placeholder="4242 4242 4242 4242"
                  value={form.cardNumber}
                  onChange={update("cardNumber")}
                  error={errors.cardNumber}
                  className="sm:col-span-2"
                />
                <InputField
                  id="checkout-expiry"
                  label="Expiry"
                  autoComplete="cc-exp"
                  inputMode="numeric"
                  placeholder="MM/YY"
                  value={form.expiry}
                  onChange={update("expiry")}
                  error={errors.expiry}
                  maxLength={5}
                />
                <InputField
                  id="checkout-cvc"
                  label="Security code"
                  autoComplete="cc-csc"
                  inputMode="numeric"
                  placeholder="CVC"
                  value={form.cvc}
                  onChange={update("cvc")}
                  error={errors.cvc}
                  maxLength={4}
                />
              </div>
            </fieldset>

            {status === "error" && message && (
              <p
                role="alert"
                className="mt-6 border border-[#e08a8a]/40 bg-[#e08a8a]/[0.07] px-4 py-3 text-[0.84rem] text-[#e8a3a3]"
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="btn btn-gold mt-8 w-full"
            >
              {status === "loading"
                ? "Placing your order…"
                : `Place order — ${formatPrice(totals.total)}`}
              {status !== "loading" && <Icon name="lock" size={15} />}
            </button>
            <p className="mt-3 text-center text-[0.7rem] leading-relaxed text-cream-3">
              By placing this order you agree to the{" "}
              <Link href="/terms" className="underline underline-offset-2 hover:text-cream">
                terms &amp; conditions
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline underline-offset-2 hover:text-cream">
                privacy policy
              </Link>
              .
            </p>
          </form>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="border border-line bg-ink-2 p-6">
              <h2 className="font-display text-2xl text-cream">Order summary</h2>
              <ul className="mt-5 divide-y divide-line">
                {items.map((line) => (
                  <li
                    key={`${line.slug}-${line.variant ?? "default"}`}
                    className="flex gap-3 py-3 first:pt-0"
                  >
                    <div className="w-14 shrink-0 overflow-hidden border border-line">
                      <ProductVisual
                        visual={line.visual}
                        name={line.name}
                        uid={`checkout-${line.slug}-${line.variant ?? "default"}`}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.82rem] leading-snug text-cream">{line.name}</p>
                      {line.variant && (
                        <p className="mt-0.5 font-condensed text-[0.56rem] uppercase tracking-[0.16em] text-cream-3">
                          {line.variant} · Qty {line.quantity}
                        </p>
                      )}
                      {!line.variant && (
                        <p className="mt-0.5 font-condensed text-[0.56rem] uppercase tracking-[0.16em] text-cream-3">
                          Qty {line.quantity}
                        </p>
                      )}
                    </div>
                    <span className="text-[0.8rem] tabular-nums text-cream">
                      {formatPrice(line.price * line.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 space-y-2.5 border-t border-line pt-4 text-[0.84rem]">
                <div className="flex items-center justify-between">
                  <span className="text-cream-2">Subtotal</span>
                  <span className="tabular-nums text-cream">{formatPrice(totals.subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-cream-2">Shipping</span>
                  <span className="tabular-nums text-cream">
                    {shippingPrice === 0 ? "Free" : formatPrice(totals.shipping)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-cream-2">Estimated tax</span>
                  <span className="tabular-nums text-cream">{formatPrice(totals.tax)}</span>
                </div>
              </div>

              <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
                <span className="font-condensed text-[0.7rem] uppercase tracking-[0.2em] text-cream-2">
                  Total
                </span>
                <span className="font-display text-3xl text-cream">{formatPrice(totals.total)}</span>
              </div>

              <div className="mt-5 space-y-2 border-t border-line pt-4">
                <p className="flex items-center gap-2 text-[0.72rem] text-cream-3">
                  <Icon name="truck" size={13} className="text-gold" />
                  {shippingMethod === "standard"
                    ? "Standard shipping · 4–7 business days"
                    : "Expedited shipping · 2–3 business days"}
                </p>
                <p className="flex items-center gap-2 text-[0.72rem] text-cream-3">
                  <Icon name="mail" size={13} className="text-gold" />
                  Confirmation sent to {form.email || "your email"}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
