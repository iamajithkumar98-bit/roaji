/**
 * PROJECT: Roaji Billing Pro
 * PATH: /02_Business_Logic/billing_engine.js
 * DESCRIPTION: Pure logic for financial calculations.
 */

export const calculateTotal = (items) => {
    if (!Array.isArray(items)) return 0;

    return items.reduce((acc, item) => {
        const price = parseFloat(item.price || 0);
        const qty = parseFloat(item.quantity || 0);
        return acc + (price * qty);
    }, 0);
};

export const applyGST = (subtotal) => {
    const GST_RATE = 0.18; // 18%
    const total = subtotal + (subtotal * GST_RATE);
    return Math.round(total * 100) / 100;
};
