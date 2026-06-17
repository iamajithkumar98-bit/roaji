/**
 * PROJECT: Roaji Billing Pro
 * PATH: /04_Presentation_Layer/ui_controller.js
 * DESCRIPTION: Manages the transitions and the billing dashboard interface.
 * 
 * ARCHITECTURAL ROLE:
 * This file acts as the 'Conductor'. It takes data from the UI, 
 * passes it to the Business Logic (billing_engine.js), 
 * and returns the results to the user.
 */

import { calculateTotal, applyGST } from '../02_Business_Logic/billing_engine.js';

// Internal state to track items for the current session
let currentInvoiceItems = [];

/**
 * 1. UI COMPONENT: The Billing Interface Template
 */
const billingTemplate = `
<div class="billing-container" style="max-width: 800px; margin: 2rem auto; padding: 2rem; background: #fff; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
    <header style="border-bottom: 2px solid #2563eb; padding-bottom: 1rem; margin-bottom: 2rem;">
        <h1 style="color: #1e293b; margin: 0;">Roaji Billing Pro</h1>
        <small style="color: #64748b;">Dashboard > Invoice Generator</small>
    </header>

    <div class="input-section" style="display: grid; grid-template-columns: 2fr 1fr 1fr auto; gap: 10px; margin-bottom: 2rem;">
        <input type="text" id="itemName" placeholder="Item Description" style="padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
        <input type="number" id="itemPrice" placeholder="Price" style="padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
        <input type="number" id="itemQty" placeholder="Qty" style="padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
        <button id="addItemBtn" style="background: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">Add Item</button>
    </div>

    <table id="billingTable" style="width: 100%; border-collapse: collapse; margin-bottom: 2rem;">
        <thead>
            <tr style="background: #f8fafc; text-align: left;">
                <th style="padding: 12px; border-bottom: 1px solid #ddd;">Description</th>
                <th style="padding: 12px; border-bottom: 1px solid #ddd;">Price</th>
                <th style="padding: 12px; border-bottom: 1px solid #ddd;">Qty</th>
                <th style="padding: 12px; border-bottom: 1px solid #ddd;">Total</th>
            </tr>
        </thead>
        <tbody id="invoiceBody">
            <!-- Items will be injected here -->
        </tbody>
    </table>

    <div id="resultsArea" style="text-align: right; font-size: 1.2rem; border-top: 2px solid #eee; padding-top: 1rem;">
        <!-- displayResults() will update this area -->
    </div>
</div>
`;

/**
 * 2. LOGIC: renderBillingPage
 * Clears the login screen and injects the billing dashboard.
 */
export const renderBillingPage = () => {
    // Clear screen
    document.body.innerHTML = '';
    
    // Inject Template
    document.body.insertAdjacentHTML('beforeend', billingTemplate);
    
    // Attach Event Listeners
    document.getElementById('addItemBtn').addEventListener('click', handleAddItem);
};

/**
 * 3. LOGIC: handleAddItem
 * Captures user input and updates the current session.
 */
const handleAddItem = () => {
    const name = document.getElementById('itemName').value;
    const price = document.getElementById('itemPrice').value;
    const quantity = document.getElementById('itemQty').value;

    if (name && price && quantity) {
        const item = { name, price: parseFloat(price), quantity: parseInt(quantity) };
        currentInvoiceItems.push(item);
        
        updateUI();
        clearInputs();
    } else {
        alert("Please fill all item fields.");
    }
};

/**
 * 4. UI: updateUI
 * Refreshes the table and triggers the calculation engine.
 */
const updateUI = () => {
    const tbody = document.getElementById('invoiceBody');
    tbody.innerHTML = ''; // Clear table

    currentInvoiceItems.forEach(item => {
        const row = `<tr>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">${item.name}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">₹${item.price}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">${item.quantity}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">₹${item.price * item.quantity}</td>
        </tr>`;
        tbody.insertAdjacentHTML('beforeend', row);
    });

    // Use Business Logic Engine
    const subtotal = calculateTotal(currentInvoiceItems);
    const finalTotal = applyGST(subtotal);

    displayResults(subtotal, finalTotal);
};

/**
 * 5. UI: displayResults
 * Displays the final calculated values on the screen.
 */
export const displayResults = (subtotal, total) => {
    const area = document.getElementById('resultsArea');
    area.innerHTML = `
        <p style="margin: 5px 0; color: #64748b;">Subtotal: ₹${subtotal.toFixed(2)}</p>
        <p style="margin: 5px 0; color: #64748b;">GST (18%): ₹${(total - subtotal).toFixed(2)}</p>
        <h3 style="margin: 10px 0; color: #1e293b;">Grand Total: ₹${total.toFixed(2)}</h3>
        <button onclick="window.print()" style="margin-top: 1rem; padding: 10px 20px; border: 1px solid #2563eb; color: #2563eb; background: transparent; cursor: pointer; border-radius: 4px;">Print Invoice</button>
    `;
};

const clearInputs = () => {
    document.getElementById('itemName').value = '';
    document.getElementById('itemPrice').value = '';
    document.getElementById('itemQty').value = '';
};