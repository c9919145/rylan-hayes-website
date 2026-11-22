import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { productBySlug } from "@/lib/products";
import { orderTotals, isShippingMethod, type ShippingMethodId } from "@/lib/cart-math";
import {
  cleanText,
  isCardNumber,
  isCvc,
  isExpiry,
  isPostalCode,
  isUsState,
  isValidEmail,
} from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface CheckoutLine {
  slug: string;
  quantity: number;
  variant?: string;
  unitPrice: number;
  name: string;
  lineTotal: number;
}

const generateOrderNumber = () => {
  const stamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `RH-${stamp}${random}`;
};

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const errors: Record<string, string> = {};
  const rawItems = Array.isArray(payload.items) ? payload.items : [];
  if (rawItems.length === 0) {
    errors.items = "Your cart is empty.";
  }
  if (rawItems.length > 25) {
    errors.items = "Too many items in one order.";
  }

  const items: CheckoutLine[] = [];
  rawItems.forEach((raw, index) => {
    if (!raw || typeof raw !== "object") {
      errors.items = "Your cart contains an invalid item.";
      return;
    }
    const entry = raw as Record<string, unknown>;
    const product = productBySlug(cleanText(entry.slug, 100));
    if (!product) {
      errors.items = "One of the products in your cart is no longer available.";
      return;
    }
    const quantity = Math.round(Number(entry.quantity));
    if (!Number.isFinite(quantity) || quantity < 1 || quantity > 10) {
      errors[`items.${index}`] = "Quantity must be between 1 and 10.";
      return;
    }
    let variant: string | undefined;
    if (product.variant) {
      variant = cleanText(entry.variant, 60);
      if (!product.variant.options.includes(variant)) {
        errors[`items.${index}`] = "Please choose a valid product option.";
        return;
      }
    }
    items.push({
      slug: product.slug,
      quantity,
      variant,
      unitPrice: product.price,
      name: product.name,
      lineTotal: product.price * quantity,
    });
  });

  const customer =
    payload.customer && typeof payload.customer === "object"
      ? (payload.customer as Record<string, unknown>)
      : {};
  const payment =
    payload.payment && typeof payload.payment === "object"
      ? (payload.payment as Record<string, unknown>)
      : {};

  const firstName = cleanText(customer.firstName, 60);
  const lastName = cleanText(customer.lastName, 60);
  const email = cleanText(customer.email, 160).toLowerCase();
  const address1 = cleanText(customer.address1, 120);
  const address2 = cleanText(customer.address2, 120);
  const city = cleanText(customer.city, 80);
  const state = cleanText(customer.state, 2).toUpperCase();
  const postalCode = cleanText(customer.postalCode, 12);
  const country = cleanText(customer.country, 60) || "United States";

  if (firstName.length < 2) errors.firstName = "Enter your first name.";
  if (lastName.length < 2) errors.lastName = "Enter your last name.";
  if (!isValidEmail(email)) errors.email = "Enter a valid email address.";
  if (address1.length < 4) errors.address1 = "Enter your street address.";
  if (city.length < 2) errors.city = "Enter your city.";
  if (!isUsState(state)) errors.state = "Use a two-letter state code.";
  if (!isPostalCode(postalCode)) errors.postalCode = "Enter a valid postal code.";

  const shippingMethod: ShippingMethodId = isShippingMethod(payload.shippingMethod)
    ? payload.shippingMethod
    : "standard";

  const cardName = cleanText(payment.cardName, 100);
  const cardNumber = cleanText(payment.cardNumber, 25);
  const expiry = cleanText(payment.expiry, 7);
  const cvc = cleanText(payment.cvc, 4);

  if (cardName.length < 2) errors.cardName = "Enter the name on the card.";
  if (!isCardNumber(cardNumber)) errors.cardNumber = "Enter a valid card number.";
  if (!isExpiry(expiry)) errors.expiry = "Use MM/YY with a future date.";
  if (!isCvc(cvc)) errors.cvc = "Enter a valid security code.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", errors },
      { status: 422 },
    );
  }

  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const totals = orderTotals(subtotal, shippingMethod);

  try {
    const db = await getDb();
    let orderNumber = generateOrderNumber();
    let attempts = 0;
    while (
      (
        await db.execute({
          sql: "SELECT 1 FROM orders WHERE order_number = ?",
          args: [orderNumber],
        })
      ).rows.length > 0
    ) {
      orderNumber = generateOrderNumber();
      attempts += 1;
      if (attempts > 5) throw new Error("Could not allocate an order number");
    }

    // `batch` runs every statement in one transaction, so an order and its
    // items are written atomically. Order items resolve their order id from the
    // unique order number, which avoids relying on connection-local last-row ids.
    await db.batch(
      [
        {
          sql: `INSERT INTO orders (
                  order_number, email, first_name, last_name, address1, address2, city, state,
                  postal_code, country, shipping_method, subtotal, shipping, tax, total, status
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'confirmed')`,
          args: [
            orderNumber,
            email,
            firstName,
            lastName,
            address1,
            address2 || null,
            city,
            state,
            postalCode,
            country,
            shippingMethod,
            totals.subtotal,
            totals.shipping,
            totals.tax,
            totals.total,
          ],
        },
        ...items.map((item) => ({
          sql: `INSERT INTO order_items (
                  order_id, product_slug, product_name, variant, unit_price, quantity, line_total
                )
                SELECT id, ?, ?, ?, ?, ?, ? FROM orders WHERE order_number = ?`,
          args: [
            item.slug,
            item.name,
            item.variant ?? null,
            item.unitPrice,
            item.quantity,
            item.lineTotal,
            orderNumber,
          ],
        })),
      ],
      "write",
    );

    return NextResponse.json({ ok: true, orderNumber, totals });
  } catch (error) {
    console.error("checkout failed", error);
    return NextResponse.json(
      { error: "We couldn't place your order. Please try again." },
      { status: 500 },
    );
  }
}
