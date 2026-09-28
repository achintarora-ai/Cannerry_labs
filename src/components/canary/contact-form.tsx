"use client";

import { FormEvent, useState } from "react";

export function CanaryContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = (await response.json()) as { error?: string; message?: string };
      if (!response.ok) throw new Error(result.error || "Something went wrong.");
      setStatus("sent");
      setMessage(result.message || "Thanks — your message is on its way.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to send. Please try again.");
    }
  }

  return (
    <form className="canary-form" onSubmit={submit}>
      <div className="form-grid">
        <label>Name<input name="name" required minLength={2} autoComplete="name" placeholder="Your name" /></label>
        <label>Work email<input name="email" type="email" required autoComplete="email" placeholder="you@company.com" /></label>
        <label>Company<input name="company" required minLength={2} autoComplete="organization" placeholder="Company name" /></label>
        <label>What do you want to build?
          <select name="interest" required defaultValue="">
            <option value="" disabled>Choose a starting point</option>
            <option>Customer-facing AI assistant</option>
            <option>Internal knowledge assistant</option>
            <option>Connected workflow or automation</option>
            <option>Lead capture and qualification</option>
            <option>Website and practical SEO</option>
            <option>Not sure yet</option>
          </select>
        </label>
      </div>
      <label>Anything else? <span>(optional)</span><textarea name="message" rows={4} maxLength={3000} placeholder="Tell us what is slowing your team down today." /></label>
      <div className="bot-field" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="form-submit">
        <button className="signal-button" disabled={status === "sending"} type="submit">
          <span>{status === "sending" ? "Sending…" : "Discuss your AI workflow"}</span><b>↗</b>
        </button>
        <p>We’ll review your note and reply by email. No mailing list. No automated sales sequence.</p>
      </div>
      {message && <p className={`form-status ${status}`} role="status">{message}</p>}
    </form>
  );
}
