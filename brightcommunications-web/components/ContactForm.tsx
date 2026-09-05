"use client";

import { useState } from "react";
import { services } from "@/lib/site-content";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (globalError) {
      setGlobalError(null);
    }
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) {
      errors.name = "Your name is required.";
    }
    if (!formData.email.trim()) {
      errors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) {
      errors.message = "Please tell us about your project.";
    } else if (formData.message.trim().length < 5) {
      errors.message = "Message must be at least 5 characters.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }

    if (isSubmitting) return;

    if (!validate()) {
      setGlobalError("Please fill in the required fields correctly.");
      return;
    }

    setIsSubmitting(true);
    setGlobalError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        }
        setGlobalError(result.error || "Failed to submit enquiry. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setIsSuccess(true);
      setSuccessMessage(
        result.message ||
          "Thank you for contacting Bright Communications. We will review your details and get in touch with you shortly."
      );
      setFormData({
        name: "",
        email: "",
        company: "",
        service: "",
        message: "",
      });
      setFieldErrors({});
    } catch (err) {
      console.error("Submission error:", err);
      setGlobalError("A network error occurred. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="cta-form" noValidate>
      <p className="cta-form__label">Business Enquiry Form</p>

      {isSuccess ? (
        <div
          style={{
            background: "rgba(34, 197, 94, 0.12)",
            border: "1px solid rgba(34, 197, 94, 0.4)",
            borderRadius: "var(--radius-md, 8px)",
            padding: "24px",
            color: "#e2e8f0",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "#22c55e",
                color: "#0f172a",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              ✓
            </span>
            <strong style={{ fontSize: "17px", color: "#f8fafc" }}>
              Enquiry Received!
            </strong>
          </div>
          <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.6", color: "rgba(245, 240, 232, 0.85)" }}>
            {successMessage}
          </p>
          <button
            type="button"
            onClick={() => {
              setIsSuccess(false);
              setSuccessMessage("");
            }}
            className="btn-outline btn-outline--light"
            style={{
              marginTop: "8px",
              alignSelf: "flex-start",
              fontSize: "13px",
              padding: "8px 16px",
              cursor: "pointer",
            }}
          >
            Send another enquiry →
          </button>
        </div>
      ) : (
        <>
          {globalError && (
            <div
              style={{
                background: "rgba(239, 68, 68, 0.15)",
                border: "1px solid rgba(239, 68, 68, 0.4)",
                borderRadius: "var(--radius-md, 8px)",
                padding: "12px 16px",
                color: "#fca5a5",
                fontSize: "14px",
              }}
            >
              {globalError}
            </div>
          )}

          <div className="form-row">
            <div>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name *"
                disabled={isSubmitting}
                style={
                  fieldErrors.name
                    ? { borderColor: "rgba(239, 68, 68, 0.85)", background: "#221111" }
                    : undefined
                }
              />
              {fieldErrors.name && (
                <span
                  style={{
                    color: "#f87171",
                    fontSize: "12px",
                    display: "block",
                    marginTop: "4px",
                  }}
                >
                  {fieldErrors.name}
                </span>
              )}
            </div>

            <div>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address *"
                disabled={isSubmitting}
                style={
                  fieldErrors.email
                    ? { borderColor: "rgba(239, 68, 68, 0.85)", background: "#221111" }
                    : undefined
                }
              />
              {fieldErrors.email && (
                <span
                  style={{
                    color: "#f87171",
                    fontSize: "12px",
                    display: "block",
                    marginTop: "4px",
                  }}
                >
                  {fieldErrors.email}
                </span>
              )}
            </div>
          </div>

          <div>
            <input
              id="company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              disabled={isSubmitting}
            >
              <option value="">Service interested in</option>
              {services.map((s) => (
                <option key={s.num} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your project... *"
              disabled={isSubmitting}
              style={
                fieldErrors.message
                  ? { borderColor: "rgba(239, 68, 68, 0.85)", background: "#221111" }
                  : undefined
              }
            />
            {fieldErrors.message && (
              <span
                style={{
                  color: "#f87171",
                  fontSize: "12px",
                  display: "block",
                  marginTop: "4px",
                }}
              >
                {fieldErrors.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            id="contact-submit-button"
            disabled={isSubmitting}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              width: "100%",
              padding: "16px 28px",
              background: isSubmitting ? "#e5ded3" : "var(--cream, #f5f0e8)",
              color: "var(--black, #111)",
              border: "none",
              borderRadius: "var(--radius-pill, 9999px)",
              fontFamily: "var(--font-body), sans-serif",
              fontSize: "15px",
              fontWeight: 600,
              cursor: isSubmitting ? "not-allowed" : "pointer",
              transition: "background 0.2s ease, transform 0.15s ease",
              position: "relative",
              zIndex: 5,
            }}
          >
            {isSubmitting ? "Sending Your Enquiry..." : "Start Your Project →"}
          </button>
        </>
      )}
    </form>
  );
}
