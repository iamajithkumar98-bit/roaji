document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const eyeIcon = document.getElementById('eyeIcon');

    // 1. Show/Hide Password Functionality
    togglePasswordBtn.addEventListener('click', () => {
        // Toggle the type attribute
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle the icon
        eyeIcon.classList.toggle('fa-eye');
        eyeIcon.classList.toggle('fa-eye-slash');
    });

    // 2. Form Submission Handling
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const mobile = document.getElementById('mobile').value;
        const password = passwordInput.value;
        const rememberMe = document.getElementById('rememberMe').checked;

        // Basic validation feedback
        const loginBtn = document.querySelector('.login-btn');
        const originalText = loginBtn.innerText;
        
        // Simulate an API Loading state
        loginBtn.innerText = 'Authenticating...';
        loginBtn.disabled = true;
        loginBtn.style.opacity = '0.7';

        setTimeout(() => {
            console.log('Login Attempt:', {
                mobile: mobile,
                password: password,
                remember: rememberMe
            });
            
            alert('Login logic triggered for ROAJI. (V1 System)');
            
            // Reset button state
            loginBtn.innerText = originalText;
            loginBtn.disabled = false;
            loginBtn.style.opacity = '1';
        }, 1500);
    });
});
