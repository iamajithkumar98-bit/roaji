import { AppDB } from '../03_Data_Center/database_config.js';
import { handleLogin } from '../01_Identity_Layer/login.js';
import { calculateTotal, applyGST } from '../02_Business_Logic/billing_engine.js';
import { renderBillingPage } from '../04_Presentation_Layer/ui_controller.js';

/**
 * startApp: Initializes the system lifecycle.
 * Acts as the entry point for the Roaji Billing Pro ecosystem.
 */
const startApp = () => {
    try {
        console.log("Roaji Billing Pro: Ready");

        // Authenticate the session using Admin credentials defined in the architecture
        const email = "iamajithukumar98@gmail.com";
        const password = "ajithroja98";

        // Logic to trigger the login validation sequence
        handleLogin(email, password);

    } catch (error) {
        console.error("System Initialization Error:", error.message);
    }
};

// Global System Bridge for maintenance and modular access
window.RoajiPro = {
    Data: AppDB,
    Logic: { calculateTotal, applyGST },
    UI: { renderBillingPage },
    Auth: { startApp }
};

// Execute Application Startup
startApp();
