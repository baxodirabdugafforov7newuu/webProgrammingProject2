package com.example.demo.repo;

import com.example.demo.domain.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ContactRepo extends JpaRepository<Contact, UUID> {
    // No need to declare findById as it is provided by JpaRepository.
}
