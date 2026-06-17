/**
 * Roaji Billing Pro - Business Logic Engine
 * Core calculation functions for processing invoice data.
 */

/**
 * Calculates the subtotal from an array of items.
 * @param {Array} items - Array of objects { price: number, quantity: number }
 * @returns {number} The calculated subtotal.
 */
export const calculateTotal = (items) => {
    if (!Array.isArray(items)) {
        console.error("Invalid items array provided to calculateTotal.");
        return 0;
    }

    return items.reduce((acc, item) => {
        const price = parseFloat(item.price) || 0;
        const quantity = parseFloat(item.quantity) || 0;

        if (price < 0 || quantity < 0) {
            console.error("Negative values detected during calculation.");
        }

        return acc + (price * quantity);
    }, 0);
};

/**
 * Applies 18% GST to the provided subtotal.
 * @param {number} subtotal - The base amount before tax.
 * @returns {number} The final amount including GST, rounded to 2 decimal places.
 */
export const applyGST = (subtotal) => {
    if (typeof subtotal !== 'number' || isNaN(subtotal)) {
        console.error("Invalid subtotal provided to applyGST.");
        return 0;
    }

    const GST_RATE = 0.18; // Standard 18% GST
    const finalTotal = subtotal + (subtotal * GST_RATE);

    // Return final value rounded to two decimal places
    return Math.round(finalTotal * 100) / 100;
};
