/**
 * PROJECT: Roaji Billing Pro
 * PATH: /01_Identity_Layer/login.js
 * DESCRIPTION: Professional Identity Gatekeeper.
 * 
 * INTEGRATION:
 * - Pulls AdminAuth from /03_Data_Center/database_config.js.
 * - Bridges the user to the Billing Engines upon successful verification.
 */

import { AppDB } from '../03_Data_Center/database_config.js';

// 1. UI COMPONENT: Modern CSS Styles
const styles = `
<style>
    :root {
        --primary-color: #2563eb;
        --bg-gradient: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        --card-bg: #ffffff;
        --text-dark: #1e293b;
    }

    body {
        margin: 0;
        padding: 0;
        font-family: 'Inter', sans-serif;
        background: var(--bg-gradient);
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .login-card {
        background: var(--card-bg);
        padding: 2.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        width: 100%;
        max-width: 400px;
        text-align: center;
    }

    .login-card h2 {
        margin-bottom: 0.5rem;
        color: var(--text-dark);
        font-weight: 700;
    }

    .login-card p {
        color: #64748b;
        font-size: 0.9rem;
        margin-bottom: 2rem;
    }

    .input-group {
        text-align: left;
        margin-bottom: 1.5rem;
    }

    .input-group label {
        display: block;
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: var(--text-dark);
    }

    .input-group input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        font-size: 1rem;
        box-sizing: border-box;
        transition: border-color 0.2s;
    }

    .input-group input:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }

    .login-btn {
        width: 100%;
        background: var(--primary-color);
        color: white;
        padding: 0.75rem;
        border: none;
        border-radius: 6px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.3s;
    }

    .login-btn:hover {
        background: #1d4ed8;
    }
</style>
`;

// 2. UI COMPONENT: HTML Structure
const loginHTML = `
    <div class="login-card">
        <h2>Roaji Billing Pro</h2>
        <p>Enter your credentials to access the vault</p>
        
        <form id="loginForm">
            <div class="input-group">
                <label>Email Address</label>
                <input type="email" id="email" placeholder="name@company.com" required>
            </div>
            
            <div class="input-group">
                <label>Password</label>
                <input type="password" id="password" placeholder="••••••••" required>
            </div>
            
            <button type="submit" class="login-btn">Sign In</button>
        </form>
    </div>
`;

// Initialize UI
document.head.insertAdjacentHTML('beforeend', styles);
document.body.innerHTML = loginHTML;

/**
 * 3. LOGIC: The handleLogin Function
 * Validates inputs against the centralized AppDB config.
 */
const handleLogin = (event) => {
    event.preventDefault();

    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;

    // Cross-referencing with /03_Data_Center/database_config.js
    const adminEmail = AppDB.AdminAuth.email;
    const adminPassword = AppDB.AdminAuth.password;

    if (emailInput === adminEmail && passwordInput === adminPassword) {
        alert("✅ Login Successful! Welcome, Admin.");
        // Logic to redirect to Billing Dashboard:
        // window.location.href = "../02_Billing_Engine/dashboard.html";
    } else {
        alert("❌ Invalid Credentials. Access Denied.");
    }
};

// 4. EVENT LISTENERS
document.getElementById('loginForm').addEventListener('submit', handleLogin);