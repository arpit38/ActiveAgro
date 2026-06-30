// ─── WhatsApp click-to-chat config ───────────────────────────
// Change the number or message HERE — it's the single source of truth
// for every "Get Quote" / WhatsApp button on the site.

// Full international format, digits only: country code + number,
// no "+", spaces, or leading zeros.
// Example: India (+91) number 7063034128  ->  "917063034128"
export const WHATSAPP_NUMBER = "917063034128";

// The message that is pre-filled in WhatsApp when the user taps the button.
export const WHATSAPP_MESSAGE = "Hi, I would like to know about your products";

/**
 * Builds a wa.me click-to-chat URL with a pre-filled message.
 * Opens WhatsApp (mobile app or WhatsApp Web) targeting WHATSAPP_NUMBER.
 */
export function getWhatsAppUrl(message: string = WHATSAPP_MESSAGE): string {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
