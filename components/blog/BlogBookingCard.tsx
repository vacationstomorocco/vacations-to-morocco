"use client";

import { FormEvent, useState } from "react";

const BRAND_NAME = "Vacations to Morocco";
const WHATSAPP_NUMBER = "212668422869";
const CONTACT_EMAIL = "vacationstomorocco@gmail.com";

interface BlogBookingCardProps {
  postTitle: string;
}

export default function BlogBookingCard({ postTitle }: BlogBookingCardProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(
    "Travel dates, number of travelers and any special requests..."
  );

  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello, I read your article "${postTitle}" and I want help planning a Morocco trip.`
  )}`;

  function onInquiry(e: FormEvent) {
    e.preventDefault();

    // Build plain text body first, then encode ONCE (this was the bug)
    const bodyText = `Hello ${BRAND_NAME},

I read your article: ${postTitle}

Name: ${name}
Email: ${email}

Message:
${message}
`;

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `Trip inquiry from blog: ${postTitle}`
    )}&body=${encodeURIComponent(bodyText)}`;

    window.location.href = mailto;
  }

  return (
    <div className="booking-card">
      <p className="eyebrow" style={{ marginBottom: 8 }}>
        Plan Your Trip
      </p>

      <p
        style={{
          marginTop: 4,
          fontSize: "0.76rem",
          color: "var(--muted)",
          lineHeight: "1.4",
        }}
      >
        The final itinerary depends on your travel dates, group size,
        accommodation level and any changes you request.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "14px 0 18px",
          fontSize: "0.84rem",
          color: "var(--muted)",
        }}
      >
        <span>Response time</span>
        <strong style={{ color: "var(--forest)" }}>Within 24h</strong>
      </div>

      <form onSubmit={onInquiry} style={{ display: "grid", gap: 14 }}>
        {/* Your Name field above Email */}
        <div className="booking-field">
          <label>Your Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
          />
        </div>

        {/* Email address field */}
        <div className="booking-field">
          <label>Email address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
          />
        </div>

        {/* Your message field */}
        <div className="booking-field">
          <label>Your message</label>
          <textarea
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              minHeight: 110,
              padding: 12,
              border: "1px solid var(--line)",
              borderRadius: 12,
              background: "#fffefa",
              fontFamily: "inherit",
              resize: "vertical",
            }}
          />
        </div>

        <button type="submit" className="button button-primary booking-button">
          Send Request
        </button>

        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="button button-outline"
          style={{ width: "100%" }}
        >
          <IconWhatsApp /> WhatsApp us
        </a>
      </form>
    </div>
  );
}

function IconWhatsApp({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 0 5.37 0 12a11.9 11.9 0 0 0 1.64 6.05L0 24l6.18-1.62A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52ZM12 22a9.94 9.94 0 0 1-5.07-1.39l-.36-.21-3.67.96.98-3.58-.24-.37A9.94 9.94 0 1 1 22 12c0 5.52-4.48 10-10 10Zm5.47-7.55c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15s-.78.97-.96 1.17c-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.8-1.67-2.1-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.63-.93-2.24-.24-.58-.5-.5-.68-.5h-.58c-.2 0-.52.08-.8.38-.28.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.13 3.25 5.15 4.55 3.02 1.3 3.02.87 3.57.82.55-.05 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}