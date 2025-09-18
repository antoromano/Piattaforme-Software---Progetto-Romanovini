document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('productList');
    const messageDiv = document.getElementById('message');
    const token = localStorage.getItem('token');
    const userRole = extractUserRoleFromToken(token);

    // Mostra il pulsante "Aggiungi Prodotto" solo per gli admin
    if (userRole === 'ADMIN') {
        document.getElementById('addProductButton').style.display = 'block';
    }

    fetch('/api/products', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            data.forEach(product => {
                const productItem = document.createElement('li');
                productItem.innerHTML = `
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <p>Prezzo: €${product.price}</p>
                    <p>Stock: ${product.stock}</p>
                    <p>Attivo: ${product.active ? 'Sì' : 'No'}</p>
                    <input type="number" id="quantity-${product.id}" min="1" value="1">
                    <button onclick="addToCart(${product.id})">Inserisci nel carrello</button>
                    <button onclick="removeFromCart(${product.id})">Rimuovi dal carrello</button>
                    ${userRole === 'ADMIN' ? `
                        <button class="admin-button" onclick="updateProduct(${product.id})">Modifica Prodotto</button>
                        <button class="admin-button" onclick="deleteProduct(${product.id})">Rimuovi Prodotto</button>
                        <button class="admin-button" onclick="activateProduct(${product.id})">Attiva Prodotto</button>
                        <button class="admin-button" onclick="deactivateProduct(${product.id})">Disattiva Prodotto</button>
                    ` : ''}
                `;
                productList.appendChild(productItem);
            });
        } else {
            messageDiv.textContent = "Nessun prodotto disponibile.";
        }
    })
    .catch(error => {
        messageDiv.textContent = "Errore nel recupero dei prodotti.";
        messageDiv.style.color = "red";
    });

    window.addProduct = function() {
        const newProduct = {
            name: prompt("Nome del prodotto:"),
            price: parseFloat(prompt("Prezzo del prodotto:")),
            stock: parseInt(prompt("Stock del prodotto:"))
        };

        fetch('/api/admin/products/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(newProduct)
        })
        .then(response => response.json())
        .then(data => {
            alert("Prodotto aggiunto con successo: " + data.name);
            location.reload();
        })
        .catch(error => {
            alert("Errore nell'aggiunta del prodotto.");
        });
    };

    window.addToCart = function(productId) {
        const quantity = document.getElementById(`quantity-${productId}`).value;
        if (!token) {
            alert("Devi essere loggato per aggiungere prodotti al carrello.");
            return;
        }

        fetch('/api/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ productId: productId, quantity: parseInt(quantity) })
        })
        .then(response => response.json())
        .then(data => {
            alert("Prodotto aggiunto al carrello. Prezzo totale: €" + data.totalPrice);
        })
        .catch(error => {
            alert("Errore nell'aggiunta del prodotto al carrello.");
        });
    };

    window.removeFromCart = function(productId) {
        const quantity = document.getElementById(`quantity-${productId}`).value;
        if (!token) {
            alert("Devi essere loggato per rimuovere prodotti dal carrello.");
            return;
        }

        fetch('/api/cart/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ productId: productId, quantity: parseInt(quantity) })
        })
        .then(response => response.json())
        .then(data => {
            alert("Prodotto rimosso dal carrello. Prezzo totale: €" + data.totalPrice);
        })
        .catch(error => {
            alert("Errore nella rimozione del prodotto dal carrello.");
        });
    };


    window.updateProduct = function(productId) {
        const updatedProduct = {
            name: prompt("Nome aggiornato del prodotto:"),
            price: parseFloat(prompt("Prezzo aggiornato del prodotto:")),
            stock: parseInt(prompt("Stock aggiornato del prodotto:"))
        };

        fetch(`/api/admin/products/update/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(updatedProduct)
        })
        .then(response => response.json())
        .then(data => {
            alert("Prodotto aggiornato con successo: " + data.name);
            location.reload();
        })
        .catch(error => {
            alert("Errore nell'aggiornamento del prodotto.");
        });
    };

    window.deleteProduct = function(productId) {
        if (!confirm("Sei sicuro di voler eliminare questo prodotto?")) {
            return;
        }

        fetch(`/api/admin/products/delete/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore durante l\'eliminazione del prodotto.');
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            location.reload();
        })
        .catch(error => {
            alert(error.message);
        });
    };

    window.activateProduct = function(productId) {
        fetch(`/api/admin/activate/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore durante l\'attivazione del prodotto.');
            }
            return response.text();
        })
        .then(message => {
            alert(message);
            location.reload();
        })
        .catch(error => {
            alert(error.message);
        });
    };

    window.deactivateProduct = function(productId) {
        fetch(`/api/admin/deactivate/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore durante la disattivazione del prodotto.');
            }
            return response.text();
        })
        .then(message => {
            alert(message);
            location.reload();
        })
        .catch(error => {
            alert(error.message);
        });
    };

    function extractUserRoleFromToken(token) {
        if (!token) return null;
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const payload = JSON.parse(jsonPayload);
        return payload.role; // Assumendo che il ruolo sia memorizzato nel campo 'role'
    }
}); 