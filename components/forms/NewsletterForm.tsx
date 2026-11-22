"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { cn } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";
import { isValidEmail } from "@/lib/validation";

interface NewsletterFormProps {
  source?: string;
  className?: string;
  showPostal?: boolean;
  buttonLabel?: string;
}

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm({
  source = "website",
  className,
  showPostal = true,
  buttonLabel = "Join the list",
}: NewsletterFormProps) {
  const formId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(true);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const postal = String(data.get("postal") ?? "").trim();

    const nextErrors: Record<string, string> = {};
    if (name.length < 2) nextErrors.name = "Please tell us your first name.";
    if (!isValidEmail(email)) nextErrors.email = "Please enter a valid email address.";
    if (!consent) nextErrors.consent = "Please accept the email updates to continue.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          postal,
          consent,
          source,
          company: String(data.get("company") ?? ""),
        }),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
        message?: string;
      };
      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      setMessage(result.message || "You're on the list. Welcome to the family.");
      form.reset();
      setConsent(true);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex items-start gap-3 border border-gold/40 bg-gold/[0.07] px-5 py-5",
          className,
        )}
        role="status"
      >
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
          <Icon name="check" size={15} />
        </span>
        <div>
          <p className="font-display text-xl text-cream">You&apos;re on the list.</p>
          <p className="mt-1 text-sm leading-relaxed text-cream-2">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)} noValidate>
      <div className={cn("grid gap-4", showPostal ? "sm:grid-cols-2" : "")}>
        <div>
          <label htmlFor={`${formId}-name`} className="field-label">
            First name
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="given-name"
            placeholder="Rylan"
            className="field"
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? `${formId}-name-error` : undefined}
          />
          {errors.name && (
            <p className="field-error" id={`${formId}-name-error`}>
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${formId}-email`} className="field-label">
            Email address
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="field"
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? `${formId}-email-error` : undefined}
          />
          {errors.email && (
            <p className="field-error" id={`${formId}-email-error`}>
              {errors.email}
            </p>
          )}
        </div>
        {showPostal && (
          <div className="sm:col-span-2">
            <label htmlFor={`${formId}-postal`} className="field-label">
              Postal code <span className="normal-case tracking-normal opacity-60">(optional)</span>
            </label>
            <input
              id={`${formId}-postal`}
              name="postal"
              type="text"
              autoComplete="postal-code"
              placeholder="37203"
              className="field"
            />
          </div>
        )}
      </div>

      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />

      <label className="mt-4 flex cursor-pointer items-start gap-3 text-[0.8rem] leading-relaxed text-cream-2">
        <input
          type="checkbox"
          name="consent"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="checkbox"
        />
        <span>
          Send me tour announcements, new music and exclusive offers. I can unsubscribe at any
          time.
        </span>
      </label>
      {errors.consent && <p className="field-error">{errors.consent}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn btn-gold mt-5 w-full"
      >
        {status === "loading" ? "Signing you up…" : buttonLabel}
        {status !== "loading" && <Icon name="arrow-right" size={15} />}
      </button>

      {status === "error" && (
        <p className="mt-3 text-[0.82rem] text-[#e8a3a3]" role="alert">
          {message}
        </p>
      )}
      <p className="mt-3 text-[0.7rem] leading-relaxed text-cream-3">
        No spam, ever. Read our{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-cream">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
