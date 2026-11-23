"use client";

import { FormEvent, useState } from "react";

export default function CustomTripForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: (formData.get("name") as string)?.trim() || "",
      email: (formData.get("email") as string)?.trim() || "",
      whatsapp: (formData.get("whatsapp") as string)?.trim() || "",
      message: (formData.get("message") as string)?.trim() || "",
      interests: "General Contact Message",
    };

    try {
      const res = await fetch(
        "https://cms.vacationstomorocco.com/wp-json/custom-api/v1/send-inquiry",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      if (res.ok && result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setStatus("error");
    }
  }

  return (
    <form className="cf-form" onSubmit={submit}>
      {/* Name + Email */}
      <div className="cf-row-2">
        <label className="cf-field">
          <span>Full Name</span>
          <input name="name" required placeholder="Your full name" />
        </label>
        <label className="cf-field">
          <span>Email Address</span>
          <input
            name="email"
            type="email"
            required
            placeholder="Your email address"
          />
        </label>
      </div>

      {/* WhatsApp optional */}
      <label className="cf-field">
        <span>
          WhatsApp <em>(optional)</em>
        </span>
        <input name="whatsapp" placeholder="Your WhatsApp number" />
      </label>

      {/* Message */}
      <label className="cf-field">
        <span>Message</span>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Tell us about your trip, interests, or any questions..."
        />
      </label>

      {/* Submit Button */}
      <button className="cf-submit" type="submit" disabled={status === "loading"}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="m22 2-7 20-4-9-9-4Z" />
          <path d="M22 2 11 13" />
        </svg>
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>

      {/* Feedback Messages */}
      {status === "success" ? (
        <p className="cf-ok" role="status">
          Thank you! Your message has been sent. We will contact you shortly.
        </p>
      ) : null}

      {status === "error" ? (
        <p className="cf-err" role="alert">
          Something went wrong. Please try again or WhatsApp us.
        </p>
      ) : null}
    </form>
  );
}