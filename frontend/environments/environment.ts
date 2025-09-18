export const environment = {
    production: false,
    keycloak: {
        issuer: "http://localhost:9999/realms/MyECommerce",
        redirectUri: "http://localhost:4200",
        clientId: "ecommerce-app",
        scope: "openid profile email offline_access"
    }
};
