// Initialize Telegram WebApp
const tg = window.Telegram.WebApp;

// Expand the app to full view (optional)
tg.expand();

// Get user data
const user = tg.initDataUnsafe?.user;
if (user) {
    document.getElementById('user-info').textContent = 
        `Hello, ${user.first_name || 'User'}!`;
} else {
    document.getElementById('user-info').textContent = 
        'Hello, User!';
}

// Handle main button click
document.getElementById('main-button').addEventListener('click', () => {
    tg.showAlert('Button clicked!');
});

// Ready to show the app
tg.ready();