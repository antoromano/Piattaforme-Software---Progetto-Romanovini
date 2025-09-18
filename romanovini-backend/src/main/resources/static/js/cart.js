document.addEventListener('DOMContentLoaded', function() {
    const cartList = document.getElementById('cartList');
    const messageDiv = document.getElementById('message');
    const token = localStorage.getItem('token');
    

    if (!token) {
        messageDiv.textContent = "Devi essere loggato per visualizzare il carrello.";
        return;
    }

    fetch('/api/cart/get', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore nel recupero del carrello: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        if (data.items && data.items.length > 0) {
            data.items.forEach(item => {
                const cartItem = document.createElement('li');
                cartItem.innerHTML = `
                    <h2>${item.productName}</h2>
                    <p>Quantità: ${item.quantity}</p>
                    <p>Prezzo: €${item.price}</p>
                    <p>Prezzo Totale: €${item.totalPrice}</p>
                `;
                cartList.appendChild(cartItem);
            });
        } else {
            messageDiv.textContent = "Il carrello è vuoto.";
        }
    })
    .catch(error => {
        messageDiv.textContent = error.message;
        messageDiv.style.color = "red";
    });
}); 