const loginForm = document.getElementById('login-form');

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // In a real application, you would send the credentials to the server for authentication.
        // For this simulation, we'll just set a flag in localStorage.
        localStorage.setItem('isLoggedIn', 'true');
        alert('Logged in successfully!');
        window.location.href = 'index.html';
    });
}