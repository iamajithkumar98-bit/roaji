/**
 * PROJECT: Roaji Billing Pro
 * PATH: /01_Identity_Layer/login.js
 * DESCRIPTION: Local Authentication Handler.
 */

export const handleLogin = (email, password) => {
    const adminEmail = "iamajithukumar98@gmail.com";
    const adminPassword = "ajithroja98";

    if (email === adminEmail && password === adminPassword) {
        alert("Login Successful");
        console.log("Identity Verified: Session Started.");
        return true;
    } else {
        alert("Invalid Credentials");
        console.error("Identity Error: Access Denied.");
        return false;
    }
};
