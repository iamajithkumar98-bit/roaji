/**
 * Roaji Billing Pro - Business Logic Layer
 * Handles core financial calculations and tax applications.
 */

/**
 * Calculates the subtotal from an array of products.
 * @param {Array} items - Array of objects containing price and quantity.
 * @returns {number} The sum of all item totals.
 */
export const calculateTotal = (items) => {
    try {
        if (!Array.isArray(items)) {
            throw new Error("Calculation failed: Items must be provided as an array.");
        }

        return items.reduce((acc, item) => {
            const price = parseFloat(item.price);
            const quantity = parseFloat(item.quantity);

            // Validation: Ensure values are numbers and non-negative
            if (isNaN(price) || isNaN(quantity) || price < 0 || quantity < 0) {
                console.error("Data Integrity Error: Invalid price or quantity found in item list.", item);
                return acc;
            }

            return acc + (price * quantity);
        }, 0);
    } catch (error) {
        console.error("Billing Engine Error:", error.message);
        return 0;
    }
};

/**
 * Applies a standard 18% GST to the given subtotal.
 * @param {number} subtotal - The base amount before tax.
 * @returns {number} The total amount including GST, rounded to 2 decimal places.
 */
export const applyGST = (subtotal) => {
    const GST_RATE = 0.18; // 18% GST

    if (typeof subtotal !== 'number' || isNaN(subtotal) || subtotal < 0) {
        console.error("Tax Calculation Error: Invalid subtotal provided.");
        return 0;
    }

    const totalWithTax = subtotal + (subtotal * GST_RATE);

    // Return rounded to 2 decimal places for financial accuracy
    return Math.round(totalWithTax * 100) / 100;
};
