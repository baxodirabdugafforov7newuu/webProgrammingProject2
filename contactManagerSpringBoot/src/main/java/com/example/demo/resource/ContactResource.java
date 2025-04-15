package com.example.demo.resource;

import com.example.demo.domain.Contact;
import com.example.demo.service.ContactService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

import static com.example.demo.constant.Constant.PHOTO_DIRECTORY;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

@RestController
@RequestMapping("/contacts")
public class ContactResource {

    private final ContactService contactService;

    // Constructor to inject the ContactService
    public ContactResource(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<Contact> createContact(@RequestBody Contact contact) {
        // Create the contact and return the created resource with a URI containing its ID
        Contact createdContact = contactService.createContact(contact);
        URI location = URI.create("/contacts/" + createdContact.getId());
        return ResponseEntity.created(location).body(createdContact);
    }

    @GetMapping
    public ResponseEntity<Page<Contact>> getContacts(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        Page<Contact> contacts = contactService.getAllContacts(page, size);
        return ResponseEntity.ok(contacts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contact> getContact(@PathVariable("id") String id) {
        UUID contactId = UUID.fromString(id); // Convert String ID to UUID
        Contact contact = contactService.getContact(contactId);
        return ResponseEntity.ok(contact);
    }

    @PutMapping("/photo")
    public ResponseEntity<String> uploadPhoto(@RequestParam("id") String id, @RequestParam("file") MultipartFile file) {
        UUID contactId = UUID.fromString(id); // Convert String ID to UUID
        String photoUrl = contactService.uploadPhoto(contactId, file);
        return ResponseEntity.ok(photoUrl);  // Returning the URL of the uploaded photo
    }

    @GetMapping(path = "/image/{filename}", produces = { IMAGE_PNG_VALUE, IMAGE_JPEG_VALUE })
    public byte[] getPhoto(@PathVariable("filename") String filename) throws IOException {
        return Files.readAllBytes(Paths.get(PHOTO_DIRECTORY + filename));
    }
}
