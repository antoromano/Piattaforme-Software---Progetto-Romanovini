package com.romanovini.service;

import com.romanovini.entity.User;
import com.romanovini.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * UserService gestisce le operazioni relative agli utenti, come la registrazione,
 * l'autenticazione e il recupero delle informazioni utente.
 */
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User register(User user) {
        return userRepository.save(user);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    public List<User> findAllUsers(){
        return userRepository.findAll();
    }
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User registerUser(String username, String password) {
        // Verifica se l'utente esiste già
        Optional<User> existingUser = userRepository.findByUsername(username);
        if (existingUser.isPresent()) {
            throw new RuntimeException("Username already taken");
        }

        // Crea un nuovo utente
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);  // In un sistema reale, la password dovrebbe essere criptata
        return userRepository.save(user);
    }

    // Metodo per autenticare l'utente
    public boolean authenticateUser(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);
        return user.isPresent() && user.get().getPassword().equals(password);
    }
}

