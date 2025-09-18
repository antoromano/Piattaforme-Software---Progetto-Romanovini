document.addEventListener('DOMContentLoaded', function() {
    const orderList = document.getElementById('orderList');
    const messageDiv = document.getElementById('message');
    const token = localStorage.getItem('token');

    if (!token) {
        messageDiv.textContent = "Devi essere loggato per visualizzare gli ordini.";
        return;
    }

    fetch('/api/orders/list', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            data.forEach(order => {
                const orderItem = document.createElement('li');
                orderItem.innerHTML = `
                    <h2>Ordine ID: ${order.id}</h2>
                    <p>Username: ${order.username}</p>
                    <p>Prezzo Totale: €${order.totalPrice}</p>
                    <ul>
                        ${order.items.map(item => `
                            <li>
                                <p>Nome: ${item.productName}</p>
                                <p>Quantità: ${item.quantity}</p>
                                <p>Prezzo: €${item.price}</p>
                            </li>
                        `).join('')}
                    </ul>
                    <button onclick="deleteOrder(${order.id})">Elimina Ordine</button>
                `;
                orderList.appendChild(orderItem);
            });
        } else {
            messageDiv.textContent = "Nessun ordine trovato.";
        }
    })
    .catch(error => {
        messageDiv.textContent = "Errore nel recupero degli ordini.";
        messageDiv.style.color = "red";
    });

    window.deleteOrder = function(orderId) {
        if (!confirm("Sei sicuro di voler eliminare questo ordine?")) {
            return;
        }

        fetch(`/api/orders/delete/${orderId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore durante l\'eliminazione dell\'ordine.');
            }
            return response.text();
        })
        .then(message => {
            alert(message);
            location.reload(); // Ricarica la pagina per aggiornare la lista degli ordini
        })
        .catch(error => {
            alert(error.message);
        });
    };
}); 