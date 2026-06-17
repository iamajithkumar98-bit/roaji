/**
 * PROJECT: Roaji Billing Pro
 * PATH: /05_Maintenance_Vault/app_main.js
 * ROLE: App Orchestrator & System Heartbeat
 * 
 * This file centralizes all layers, ensuring the flow of data 
 * between the Vault, the Data Center, and the UI is synchronized.
 */

// 1. IMPORTING THE LAYERS
import { AppDB } from '../03_Data_Center/database_config.js';
import { renderBillingPage } from '../04_Presentation_Layer/ui_controller.js';

// NOTE: To follow professional ESM (ES Module) standards, 
// ensure these functions are exported in their respective files.
import { calculateTotal } from '../02_Business_Logic/billing_engine.js';

/**
 * 2. SYSTEM LOGGING (The Vault's Primary Duty)
 * Acts as the centralized error handler for the entire application.
 * This will print to the console and could later be hooked to a 
 * Firebase logging service or a 'Maintenance Log' file.
 */
export const logError = (message) => {
    const timestamp = new Date().toLocaleString();
    const formattedError = `[SYSTEM_ERROR] | ${timestamp} | : ${message}`;
    
    console.error(formattedError);
    
    // Future expansion: Push this error to AppDB.MaintenanceLogs in Firestore
    return formattedError;
};

/**
 * 3. APP ORCHESTRATION: startApp
 * The entry point function that triggers the application's lifecycle.
 */
export const startApp = () => {
    console.log("--- Roaji Billing Pro: System Initializing ---");

    try {
        // Initialize Database Check
        if (AppDB.AdminAuth.email) {
            console.log("Data Center: Connection Verified.");
        }

        // Trigger the Identity Layer (Login Flow)
        // Architect's Note: The login.js UI usually executes on load, 
        // but we manage the state transition here.
        console.log("Identity Layer: Ready for User Authentication.");
        
        // We can manually trigger the Billing Page for testing, 
        // or wait for handleLogin to verify credentials.
        // renderBillingPage(); 

    } catch (error) {
        logError("Failed to initialize Roaji Billing Pro: " + error.message);
    }
};

/**
 * 4. SYSTEM INTEGRATION BRIDGE
 * This section exposes core logic to the window object (if needed for global access)
 * or simply organizes the tools for the UI Controller.
 */
export const SystemBridge = {
    db: AppDB,
    calculator: calculateTotal,
    logger: logError,
    version: "1.0.0 Pro"
};

// Auto-start the application when the script loads
startApp();