package com.romanovini.service;

import com.romanovini.entity.Role;
import com.romanovini.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/**
 * JwtUtil fornisce metodi per la creazione, estrazione e validazione dei token JWT.
 */
@Service
@Component
public class JwtUtil {

    @Autowired
    private UserService userService;

    // Chiave segreta per la firma dei token JWT
    private static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // Estrai il nome utente dal token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Estrai il ruolo dal token JWT.
     */
    public String extractRole(String token) {
        Claims claims = extractAllClaims(token);
        return claims.get("role", String.class);
    }

    /**
     * Estrai la data di scadenza dal token JWT.
     */
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Estrai un claim specifico dal token JWT.
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Estrai tutti i claims
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    // Controlla se il token è scaduto
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Metodo per generare il token JWT
    public String generateToken(String username, Role role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role.name());
        return createToken(claims, username);
    }

    /**
     * Crea un token JWT con i claims specificati.
     */
    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 ore di scadenza
                .signWith(key, SignatureAlgorithm.HS256) // Usa una chiave forte
                .compact();
    }

    // Valida il token
    public Boolean validateToken(String token, String username) {
        final String extractedUsername = extractUsername(token);
        return (extractedUsername.equals(username) && !isTokenExpired(token));
    }

    /**
     * Estrai l'ID utente dal token JWT.
     */
    public Long extractUserIdFromToken(String token) {
        String username = extractUsername(token);
        // Recupera l'utente dal database basandosi sull'username
        User user = userService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return user.getId(); // Restituisci l'userId
    }
}
