Questa repository contiene il codice del progetto sviluppato per il corso di "Piattaforme software"

Il progetto prevedeva lo sviluppo un’applicazione full-stack e-commerce, sviluppata con:
	•	Backend: Spring Boot (Java 17+), Spring Security (JWT), Spring Data JPA, MySQL
	•	Frontend: Angular (Node.js, npm)
	•	Build & Deployment: Maven, RESTful API

Struttura Backend
	•	Entities: User, Cart, CartItem, Order, OrderItem, Product
	•	Repositories: interfacce JPA per ogni entità
	•	Services: logica applicativa (UserService, CartService, OrderService, ProductService)
	•	Controllers:
	•	AuthController → registrazione/login
	•	CartController → gestione carrello
	•	OrderController → gestione ordini
	•	AdminController → gestione avanzata (utenti, ordini, prodotti)
Frontend 
	•	Creato con Angular CLI (ng new romanovini-frontend).
	•	Configurazione base completata (Node.js 22.x e npm 10.x).
	•	Sarà collegato al backend tramite chiamate REST su /api/....
	•	In futuro includerà:
	•	Moduli per login/registrazione
	•	Catalogo prodotti e carrello
	•	Dashboard admin per la gestione utenti, prodotti e ordini.
 
Autenticazione & Ruoli
	•	Registrazione e login utenti con JWT.
	•	Gestione ruoli:
	•	CLIENTE → può gestire il carrello, creare ordini, consultare i propri ordini.
	•	ADMIN → possiede gli stessi poteri dei CLIENTI + funzionalità avanzate:
	1.	Visualizzare la lista di tutti gli utenti registrati.
	2.	Gestire il catalogo prodotti (aggiungere, modificare, attivare/disattivare).
	3.	Visualizzare la lista completa degli ordini, filtrabile per utente e per prodotto.

Gestione Carrello
	•	Aggiungere, rimuovere prodotti dal carrello (/api/cart/add, /api/cart/remove).
	•	Recuperare lo stato attuale del carrello (/api/cart/get).
	•	Il carrello mantiene il totale aggiornato.
 
Gestione Ordini
	•	Creazione ordine a partire dal carrello (/api/orders/create).
	•	Visualizzazione lista ordini di un utente (/api/orders/list).
	•	Eliminazione di un ordine (/api/orders/delete/{id}).
	•	Verifica di un ordine (/api/orders/verify/{id}).
	•	Fix: risolto il problema NullPointerException e LazyInitializationException introducendo @OneToMany(fetch = FetchType.EAGER) negli items dell’ordine.

Gestione 
	•	I prodotti sono mantenuti in tabella con attributo active.
	•	CLIENTI vedono solo i prodotti con active = true.
	•	ADMIN può:
	•	Aggiungere un nuovo prodotto (/api/admin/products/add).
	•	Modificare un prodotto (/api/admin/products/update/{id}).
	•	Attivare/disattivare un prodotto (/api/admin/products/toggle/{id}).



 Set up e Avvio
1.	Clona il repository
2.	Configura application.properties con le credenziali MySQL:
spring.datasource.url=jdbc:mysql://localhost:3306/romanovini_db
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
3.  Avvia il backend:
mvn spring-boot:run

4.  Frontend
cd romanovini-frontend
npm install
ng serve
Frontend disponibile su http://localhost:4200/




 
