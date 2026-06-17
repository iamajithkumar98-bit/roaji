/**
 * PROJECT: Roaji Billing Pro
 * PATH: /03_Data_Center/database_config.js
 * DESCRIPTION: Centralized Data Gateway & Firebase Configuration.
 * 
 * ARCHITECTURAL ROLE:
 * This file acts as the "Bridge" for the entire ecosystem:
 * 1. Login Page: Uses AppDB.AdminAuth and AppDB.UserAuth for identity verification.
 * 2. Billing Engines: Fetch tax rates and price lists via AppDB.BillingData.
 * 3. Maintenance Vault: Accesses AppDB.InventoryData for stock audits and system logs.
 */

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase Project Configuration
// NOTE: In a production environment, these values should be stored in a .env file.
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "roaji-billing-pro.firebaseapp.com",
    projectId: "roaji-billing-pro",
    storageBucket: "roaji-billing-pro.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase Services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/**
 * AppDB: The Centralized Data Object
 * This object is exported to be used by all modules across the application.
 */
export const AppDB = {
    // 1. SYSTEM GATEWAY: Core Firebase references
    core: {
        instance: app,
        auth: auth,
        firestore: db
    },

    // 2. MAINTENANCE VAULT: Administrative Credentials
    // Security Warning: For development only. Shift to Env Variables for production.
    AdminAuth: {
        email: "iamajithukumar98@gmail.com",
        password: "ajithroja98",
        role: "SUPER_ADMIN",
        accessLevel: 10
    },

    // 3. LOGIN PAGE MODULE: Placeholder for User Management
    UserAuth: {
        activeUsers: [], // To be populated by Firestore 'users' collection
        sessionTimeout: 3600 // 1 hour
    },

    // 4. BILLING ENGINES: Placeholder for Financial Logic
    BillingData: {
        taxRates: {},    // To be fetched from Firestore 'settings'
        invoices: {},    // Reference to 'invoices' collection
        currency: "INR"
    },

    // 5. INVENTORY DATA: Placeholder for Stock & Maintenance
    InventoryData: {
        products: [],    // Reference to 'inventory' collection
        lowStockAlert: 10,
        suppliers: []
    }
};

// Exporting as default for easy importing in other modules
export default AppDB;