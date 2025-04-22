package com.example.demo.service;

import com.example.demo.domain.Contact;
import com.example.demo.repo.ContactRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactService {

    @Autowired
    private ContactRepo contactRepo;

    public List<Contact> getAllContacts() {
        return contactRepo.findAll();
    }

    public Contact createContact(Contact contact) {
        return contactRepo.save(contact);
    }

    public Contact updateContact(Long id, Contact updatedContact) {
        Optional<Contact> optionalContact = contactRepo.findById(id);
        if (optionalContact.isPresent()) {
            Contact contact = optionalContact.get();
            contact.setName(updatedContact.getName());
            contact.setEmail(updatedContact.getEmail());
            contact.setPhone(updatedContact.getPhone());
            contact.setAddress(updatedContact.getAddress());
            contact.setTitle(updatedContact.getTitle());
            contact.setStatus(updatedContact.getStatus());
            return contactRepo.save(contact);
        } else {
            throw new RuntimeException("Contact not found with id " + id);
        }
    }

    public void deleteContact(Long id) {
        contactRepo.deleteById(id);
    }
}