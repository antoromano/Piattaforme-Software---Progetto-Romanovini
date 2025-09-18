package com.romanovini.service;

import com.romanovini.entity.User;
import com.romanovini.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

/**
 * MyUserDetailService implementa UserDetailsService per caricare i dettagli dell'utente
 * necessari per l'autenticazione e l'autorizzazione.
 */
@Service("myUserDetailsService")
public class MyUserDetailService implements UserDetailsService{

    @Autowired
    private UserRepository userRepository;

    /**
     * Carica un utente per nome utente.
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword())
                .roles(user.getRole().name())  // Usando il singolo ruolo dell'enum
                .build();
    }
}
