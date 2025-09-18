document.addEventListener('DOMContentLoaded', function() {
    const userInfoDiv = document.getElementById('userInfo');
    const token = localStorage.getItem('token');
    const userRole = extractUserRoleFromToken(token);

    if (token) {
        const username = extractUsernameFromToken(token);
        userInfoDiv.innerHTML = `Benvenuto, ${username} <button class="logout-button" id="logoutButton">Logout</button>`;
    } else {
        userInfoDiv.textContent = "Login non effettuato";
    }

    document.getElementById('logoutButton')?.addEventListener('click', function() {
        localStorage.removeItem('token');
        location.reload();
    });

    const loginButton = document.querySelector('button[onclick="location.href=\'/login\'"]');
    if (loginButton && token) {
        loginButton.disabled = true;
        loginButton.textContent = "Logout per accedere";
    }

    // Mostra i pulsanti "Visualizza Utenti" e "Visualizza Ordini" solo per gli admin
    if (userRole === 'ADMIN') {
        document.getElementById('viewUsersButton').style.display = 'block';
        document.getElementById('viewOrdersButton').style.display = 'block';
    }
});

function viewUsers() {
    const userList = document.getElementById('userList');
    const messageDiv = document.getElementById('message');
    const token = localStorage.getItem('token');

    if (!token) {
        messageDiv.textContent = "Devi essere loggato per visualizzare gli utenti.";
        return;
    }

    if (userList.style.display === 'block') {
        userList.style.display = 'none';
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
            userList.innerHTML = ''; // Pulisce la lista prima di aggiungere nuovi elementi
            data.forEach(user => {
                const userItem = document.createElement('li');
                userItem.innerHTML = `
                    <p>ID: ${user.id}</p>
                    <p>Username: ${user.username}</p>
                    <p>Ruolo: ${user.role}</p>
                `;
                userList.appendChild(userItem);
            });
            userList.style.display = 'block';
        } else {
            messageDiv.textContent = "Nessun utente trovato.";
        }
    })
    .catch(error => {
        messageDiv.textContent = "Errore nel recupero degli utenti.";
        messageDiv.style.color = "red";
    });
}

function viewOrders() {
    const orderList = document.getElementById('orderList');
    const messageDiv = document.getElementById('message');
    const token = localStorage.getItem('token');

    if (!token) {
        messageDiv.textContent = "Devi essere loggato per visualizzare gli ordini.";
        return;
    }

    if (orderList.style.display === 'block') {
        orderList.style.display = 'none';
        return;
    }

    fetch('/api/admin/orders', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            orderList.innerHTML = ''; // Pulisce la lista prima di aggiungere nuovi elementi
            data.forEach(order => {
                const orderItem = document.createElement('li');
                orderItem.innerHTML = `
                    <p>ID Ordine: ${order.id}</p>
                    <p>Username: ${order.username}</p>
                    <p>Prezzo Totale: €${order.totalPrice}</p>
                    <ul>
                        ${order.items.map(item => `
                            <li>
                                <p>Nome Prodotto: ${item.productName}</p>
                                <p>Quantità: ${item.quantity}</p>
                                <p>Prezzo: €${item.price}</p>
                            </li>
                        `).join('')}
                    </ul>
                `;
                orderList.appendChild(orderItem);
            });
            orderList.style.display = 'block';
        } else {
            messageDiv.textContent = "Nessun ordine trovato.";
        }
    })
    .catch(error => {
        messageDiv.textContent = "Errore nel recupero degli ordini.";
        messageDiv.style.color = "red";
    });
}

function extractUsernameFromToken(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const payload = JSON.parse(jsonPayload);
    return payload.sub;
}

function extractUserRoleFromToken(token) {
    if (!token) return null;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const payload = JSON.parse(jsonPayload);
    return payload.role;
}

// Funzione per visualizzare il carrello
function viewCart() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert("Devi essere loggato per visualizzare il carrello.");
        return;
    }

    fetch('/api/cart/get', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.items && data.items.length > 0) {
            let cartContent = `ID: ${data.id}, Username: ${data.username}, Prezzo Totale: €${data.totalPrice}\n`;
            data.items.forEach(item => {
                cartContent += `Nome: ${item.productName}, Quantità: ${item.quantity}, Prezzo: €${item.price}\n`;
            });
            alert(cartContent);
        } else {
            alert("Il carrello è vuoto.");
        }
    })
    .catch(error => {
        alert("Errore nel recupero del carrello.");
    });
}

// Funzione per creare un ordine
function createOrder() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert("Devi essere loggato per creare un ordine.");
        return;
    }

    fetch('/api/orders/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        alert(`Ordine creato con successo! ID Ordine: ${data.id}, Prezzo Totale: €${data.totalPrice}`);
    })
    .catch(error => {
        alert("Errore nella creazione dell'ordine.");
    });
}