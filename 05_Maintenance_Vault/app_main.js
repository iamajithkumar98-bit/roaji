/**
 * PROJECT: Roaji Billing Pro
 * PATH: /05_Maintenance_Vault/app_main.js
 * DESCRIPTION: Main Orchestrator - Bridges all layers.
 */

import { AppDB } from '../03_Data_Center/database_config.js';
import { handleLogin } from '../01_Identity_Layer/login.js';
import { calculateTotal, applyGST } from '../02_Business_Logic/billing_engine.js';
import { renderBillingPage } from '../04_Presentation_Layer/ui_controller.js';

const startApp = () => {
    console.log("Roaji Billing Pro: System Initialized...");
    console.log("Current Status:", AppDB.status);

    // Default credentials for system start
    const email = "iamajithukumar98@gmail.com";
    const password = "ajithroja98";

    // Trigger Authentication Flow
    const isAuthenticated = handleLogin(email, password);

    if (isAuthenticated) {
        renderBillingPage();
    }
};

// Global Exposure for debugging
window.RoajiCore = {
    calculateTotal,
    applyGST
};

// Start the Orchestrator
startApp();
