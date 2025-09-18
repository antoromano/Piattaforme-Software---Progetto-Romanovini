document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;

        const userData = {
            username: username,
            password: password,
            role: role
        };

        fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.text())
        .then(data => {
            messageDiv.textContent = data;
            messageDiv.style.color = "green";
        })
    });
}); 