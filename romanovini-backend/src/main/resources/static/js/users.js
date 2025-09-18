document.addEventListener('DOMContentLoaded', function() {
    const userList = document.getElementById('userList');
    const messageDiv = document.getElementById('message');
    const token = localStorage.getItem('token');

    if (!token) {
        messageDiv.textContent = "Devi essere loggato per visualizzare gli utenti.";
        return;
    }

    fetch('/api/admin/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            data.forEach(user => {
                const userItem = document.createElement('li');
                userItem.innerHTML = `
                    <p>ID: ${user.id}</p>
                    <p>Username: ${user.username}</p>
                    <p>Ruolo: ${user.role}</p>
                `;
                userList.appendChild(userItem);
            });
        } else {
            messageDiv.textContent = "Nessun utente trovato.";
        }
    })
    .catch(error => {
        messageDiv.textContent = "Errore nel recupero degli utenti.";
        messageDiv.style.color = "red";
    });
}); 