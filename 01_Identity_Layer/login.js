import { AppDB } from '../03_Data_Center/database_config.js';

/**
 * handleLogin: Validates user credentials against administrative records.
 * @param {string} email - The email entered by the user.
 * @param {string} password - The password entered by the user.
 */
export const handleLogin = (email, password) => {
    const validEmail = 'iamajithukumar98@gmail.com';
    const validPassword = 'ajithroja98';

    if (email === validEmail && password === validPassword) {
        alert('Login Successful');
        // Future integration: Trigger renderBillingPage() from the Presentation Layer
    } else {
        alert('Invalid Credentials');
    }
};
