import { Phone } from "lucide-react";
import styles from "./FloatingContact.module.css";

// Accept formatted numbers, but never turn placeholder text into a contact link.
function contactNumber(value: string | undefined) {
  const number = value?.trim() ?? "";
  if (!/^\+?[\d\s().-]+$/.test(number)) return null;
  const digits = number.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) return null;
  return { digits, dial: `${number.startsWith("+") ? "+" : ""}${digits}` };
}

export function FloatingContact({ phone, whatsapp }: { phone?: string; whatsapp?: string }) {
  const callNumber = contactNumber(phone);
  const chatNumber = contactNumber(whatsapp) ?? callNumber;

  return (
    <nav className={styles.contacts} aria-label="Quick contact">
        <a className={`${styles.button} ${styles.call}`} href={callNumber ? `tel:${callNumber.dial}` : "/contact"} aria-label={callNumber ? "Call Bright Communications" : "Contact Bright Communications"} title={callNumber ? "Call us" : "Contact us"}>
          <Phone size={23} strokeWidth={1.8} aria-hidden="true" />
          <span className={styles.label}>{callNumber ? "Call us" : "Contact us"}</span>
        </a>
        <a
          className={`${styles.button} ${styles.whatsapp}`}
          href={chatNumber ? `https://wa.me/${chatNumber.digits}` : undefined}
          aria-disabled={!chatNumber || undefined}
          aria-label={chatNumber ? "Chat with Bright Communications on WhatsApp" : "WhatsApp chat is currently unavailable"}
          title={chatNumber ? "Chat on WhatsApp" : "WhatsApp chat is currently unavailable"}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.52 3.48A11.87 11.87 0 0 0 12.04 0C5.44 0 .07 5.37.07 11.97c0 2.11.55 4.17 1.6 5.99L0 24l6.2-1.63a11.94 11.94 0 0 0 5.83 1.49h.01c6.6 0 11.97-5.37 11.97-11.97 0-3.2-1.24-6.2-3.49-8.41ZM12.04 21.84a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.68.96.98-3.59-.24-.37a9.93 9.93 0 0 1-1.52-5.28c0-5.49 4.47-9.96 9.97-9.96a9.88 9.88 0 0 1 7.04 2.92 9.9 9.9 0 0 1 2.92 7.05c0 5.49-4.47 9.96-9.96 9.96Zm5.46-7.46c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
          </svg>
          <span className={styles.label}>WhatsApp</span>
        </a>
    </nav>
  );
}
