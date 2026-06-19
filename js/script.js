/**
 * ROAJI - Login System Script (Version 1)
 * Focus: Form Validation and Password Visibility
 */

document.addEventListener('DOMContentLoaded', () => {
    // Select DOM Elements
    const loginForm = document.getElementById('loginForm');
    const mobileInput = document.getElementById('mobile');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    
    /**
     * 1. Show/Hide Password Functionality
     * Toggles the input type between 'password' and 'text'
     */
    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', function () {
            // Toggle the type attribute
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            // Toggle button text or icon class if applicable
            this.textContent = type === 'password' ? 'Show' : 'Hide';
            
            // Optional: Toggle FontAwesome icon if used in HTML
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-eye');
                icon.classList.toggle('fa-eye-slash');
            }
        });
    }

    /**
     * 2. Form Validation & Submission
     */
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            // Prevent the default form submission
            e.preventDefault();

            // Sanitize and get values
            const mobileValue = mobileInput.value.trim();
            const passwordValue = passwordInput.value.trim();

            // Clear previous error states (if any helper functions exist)
            clearErrors();

            // Validation Logic
            let isValid = true;

            if (!mobileValue) {
                showErrorMessage(mobileInput, 'Mobile number is required');
                isValid = false;
            } else if (!/^\d{10,15}$/.test(mobileValue)) {
                showErrorMessage(mobileInput, 'Please enter a valid mobile number');
                isValid = false;
            }

            if (!passwordValue) {
                showErrorMessage(passwordInput, 'Password is required');
                isValid = false;
            } else if (passwordValue.length < 6) {
                showErrorMessage(passwordInput, 'Password must be at least 6 characters');
                isValid = false;
            }

            // If validation passes
            if (isValid) {
                handleLoginSuccess(mobileValue);
            }
        });
    }

    /**
     * Helper: Display Error Messages
     */
    function showErrorMessage(inputElement, message) {
        // Highlight input field
        inputElement.style.borderColor = '#ef4444';
        
        // Check if an error message already exists
        let errorDisplay = inputElement.parentElement.querySelector('.error-msg');
        
        if (!errorDisplay) {
            errorDisplay = document.createElement('small');
            errorDisplay.className = 'error-msg';
            errorDisplay.style.color = '#ef4444';
            errorDisplay.style.fontSize = '12px';
            errorDisplay.style.marginTop = '4px';
            errorDisplay.style.display = 'block';
            inputElement.parentElement.appendChild(errorDisplay);
        }
        
        errorDisplay.textContent = message;
    }

    /**
     * Helper: Clear Error States
     */
    function clearErrors() {
        const inputs = [mobileInput, passwordInput];
        inputs.forEach(input => {
            if (input) {
                input.style.borderColor = '';
                const errorMsg = input.parentElement.querySelector('.error-msg');
                if (errorMsg) errorMsg.remove();
            }
        });
    }

    /**
     * Final Submission Logic (Simulated)
     */
    function handleLoginSuccess(mobile) {
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;

        // Visual Feedback
        submitBtn.disabled = true;
        submitBtn.textContent = 'Authenticating...';

        console.log(`ROAJI Login Attempt for: ${mobile}`);

        // Simulate API Delay
        setTimeout(() => {
            alert('Login successful! Welcome to ROAJI.');
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            // logic for redirection would go here: window.location.href = 'dashboard.html';
        }, 1500);
    }
});
