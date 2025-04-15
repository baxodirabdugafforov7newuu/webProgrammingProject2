package com.example.demo.service;

import com.example.demo.domain.Contact;
import com.example.demo.repo.ContactRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.UUID;

@Service
public class ContactService {

    @Autowired
    private ContactRepo contactRepo;

    private static final String PHOTO_DIRECTORY = "/path/to/photo/directory";

    // Create a new contact
    public Contact createContact(Contact contact) {
        return contactRepo.save(contact);
    }

    // Get contact by ID
    public Contact getContact(UUID id) {
        Optional<Contact> contact = contactRepo.findById(id);
        if (contact.isPresent()) {
            return contact.get();
        }
        throw new RuntimeException("Contact not found");
    }

    // Delete contact
    public void deleteContact(UUID id) {
        Contact contact = getContact(id);
        contactRepo.delete(contact);
    }

    // Upload photo for the contact
    public String uploadPhoto(UUID id, MultipartFile file) {
        try {
            Contact contact = getContact(id);
            String photoUrl = saveFile(file);
            contact.setPhotoUrl(photoUrl);
            contactRepo.save(contact);
            return photoUrl;
        } catch (IOException e) {
            throw new RuntimeException("Could not upload file", e);
        }
    }

    // Helper method to save the photo
    private String saveFile(MultipartFile file) throws IOException {
        String filename = UUID.randomUUID() + ".jpg";  // Generate a unique filename
        Path targetLocation = Paths.get(PHOTO_DIRECTORY).resolve(filename);

        // Save the file
        Files.copy(file.getInputStream(), targetLocation);

        // Build and return the file URL
        return ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/contacts/images/")
                .path(filename)
                .toUriString();
    }
}
