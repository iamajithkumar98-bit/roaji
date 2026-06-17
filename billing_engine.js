/**
 * PROJECT: Roaji Billing Pro
 * PATH: /02_Business_Logic/billing_engine.js
 * DESCRIPTION: Core Calculation Engine for Financial Operations.
 * 
 * ARCHITECTURAL INTEGRATION:
 * - Maintenance Vault: Imports logError to record data integrity issues.
 * - Data Center: (Commented) Prepared to fetch dynamic tax rates via AppDB.
 */

// Importing Error Logging from the Maintenance Vault
// This ensures that any "bad data" is audited immediately.
import { logError } from '../04_Maintenance_Vault/logger.js';

/**
 * FUTURE SCALABILITY INTEGRATION:
 * To make tax rates dynamic (e.g., changing from 18% to 12%), we will eventually use:
 * 
 * import { AppDB } from '../03_Data_Center/database_config.js';
 * const GST_RATE = AppDB.BillingData.taxRates.gstDefault || 0.18;
 */

const DEFAULT_GST_RATE = 0.18; // 18% GST

/**
 * 1. calculateTotal
 * Processes an array of items to produce a subtotal.
 * @param {Array} items - Array of objects { name: string, price: number, quantity: number }
 * @returns {number} - The calculated subtotal.
 */
export const calculateTotal = (items) => {
    try {
        if (!Array.isArray(items)) throw new Error("Items must be an array");

        return items.reduce((acc, item) => {
            const price = parseFloat(item.price);
            const quantity = parseFloat(item.quantity);

            // ERROR HANDLING: Validation for invalid numbers or negative values
            if (isNaN(price) || isNaN(quantity) || price < 0 || quantity < 0) {
                const errorMsg = `Invalid Price/Quantity detected for item: ${item.name || 'Unknown'}`;
                logError(errorMsg); // Logs to Maintenance Vault
                throw new Error(errorMsg);
            }

            return acc + (price * quantity);
        }, 0);

    } catch (error) {
        console.error("Billing Engine Error:", error.message);
        return 0;
    }
};

/**
 * 2. applyGST
 * Applies Government Service Tax to a given amount.
 * @param {number} subtotal - The base amount before tax.
 * @returns {number} - Total amount including GST.
 */
export const applyGST = (subtotal) => {
    if (typeof subtotal !== 'number' || subtotal < 0) {
        logError("Attempted GST calculation on invalid subtotal.");
        return 0;
    }

    const taxAmount = subtotal * DEFAULT_GST_RATE;
    const finalTotal = subtotal + taxAmount;

    // Returns the total rounded to 2 decimal places for financial precision
    return Math.round(finalTotal * 100) / 100;
};

/**
 * EXAMPLE USAGE:
 * const cart = [
 *   { name: "Service A", price: 1000, quantity: 2 },
 *   { name: "Product B", price: 500, quantity: 1 }
 * ];
 * 
 * const sub = calculateTotal(cart); // 2500
 * const total = applyGST(sub);      // 2950
 */