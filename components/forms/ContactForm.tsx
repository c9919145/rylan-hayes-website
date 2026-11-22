"use client";

import { useId, useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { isValidEmail } from "@/lib/validation";

const topics = [
  "General question",
  "Booking & live shows",
  "Press & media",
  "Store order support",
  "Fan mail",
] as const;

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const formId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const topic = String(data.get("topic") ?? "").trim();
    const body = String(data.get("message") ?? "").trim();

    const nextErrors: Record<string, string> = {};
    if (name.length < 2) nextErrors.name = "Please enter your name.";
    if (!isValidEmail(email)) nextErrors.email = "Please enter a valid email address.";
    if (!topics.includes(topic as (typeof topics)[number])) nextErrors.topic = "Choose a topic.";
    if (body.length < 10) nextErrors.message = "Please write at least 10 characters.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          topic,
          message: body,
          company: String(data.get("company") ?? ""),
        }),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Your message could not be sent. Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-gold/40 bg-gold/[0.06] p-7" role="status">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-ink">
          <Icon name="check" size={18} />
        </span>
        <h2 className="mt-5 font-display text-3xl text-cream">Message received.</h2>
        <p className="mt-3 text-sm leading-relaxed text-cream-2">
          Thanks for reaching out. Our team reads every message and will reply within two
          business days.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="link-arrow mt-6"
        >
          Send another message
          <Icon name="arrow-right" size={15} />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-name`} className="field-label">
            Your name
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            className="field"
            placeholder="Full name"
            aria-invalid={errors.name ? "true" : undefined}
          />
          {errors.name && <p className="field-error">{errors.name}</p>}
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
            className="field"
            placeholder="you@example.com"
            aria-invalid={errors.email ? "true" : undefined}
          />
          {errors.email && <p className="field-error">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor={`${formId}-topic`} className="field-label">
          What can we help with?
        </label>
        <select
          id={`${formId}-topic`}
          name="topic"
          className="field"
          defaultValue={topics[0]}
          aria-invalid={errors.topic ? "true" : undefined}
        >
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
        {errors.topic && <p className="field-error">{errors.topic}</p>}
      </div>

      <div>
        <label htmlFor={`${formId}-message`} className="field-label">
          Message
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          className="field"
          placeholder="Tell us what's on your mind…"
          aria-invalid={errors.message ? "true" : undefined}
        />
        {errors.message && <p className="field-error">{errors.message}</p>}
      </div>

      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />

      <button type="submit" disabled={status === "loading"} className="btn btn-gold w-full sm:w-auto">        {status === "loading" ? "Sending…" : "Send message"}
        {status !== "loading" && <Icon name="arrow-right" size={15} />}
      </button>

      {status === "error" && (
        <p className="text-[0.85rem] text-[#e8a3a3]" role="alert">
          {message}
        </p>
      )}
    </form>
  );
}
