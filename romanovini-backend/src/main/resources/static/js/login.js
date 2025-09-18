document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const credentials = {
            username: username,
            password: password
        };

        fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('token', data.token);
            messageDiv.textContent = "Login successful";
            messageDiv.style.color = "green";
        })
        .catch(error => {
            messageDiv.textContent = "No login";
            messageDiv.style.color = "red";
        });
    });
}); 