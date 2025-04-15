package com.example.demo.service;

import com.example.demo.domain.Contact;
import com.example.demo.repo.ContactRepo;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.UUID;
import java.util.function.BiFunction;
import java.util.function.Function;

import static com.example.demo.constant.Constant.PHOTO_DIRECTORY;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@Service
@Transactional(rollbackOn = Exception.class)
public class ContactService {

    private ContactRepo contactRepo;

    // Constructor for dependency injection
    public ContactService(ContactRepo contactRepo) {
        this.contactRepo = contactRepo;
    }

    // Get all contacts with pagination
    public Page<Contact> getAllContacts(int page, int size) {
        return contactRepo.findAll(PageRequest.of(page, size, Sort.by("name")));
    }

    // Get a contact by UUID
    public Contact getContact(UUID id) {
        return contactRepo.findById(id).orElseThrow(() -> new RuntimeException("Contact not found"));
    }

    // Create a new contact
    public Contact createContact(Contact contact) {
        return contactRepo.save(contact);
    }

    // Delete a contact
    public void deleteContact(Contact contact) {
        contactRepo.delete(contact);
    }

    // Upload photo for a contact
    public String uploadPhoto(UUID id, MultipartFile file) {
        logInfo("Saving picture for user ID: {}", id);
        Contact contact = getContact(id);
        String photoUrl = photoFunction.apply(id.toString(), file);  // Convert UUID to String for filename
        contact.setPhotoUrl(photoUrl);
        contactRepo.save(contact);
        return photoUrl;
    }

    // Helper function to get file extension
    private final Function<String, String> fileExtension = filename -> Optional.of(filename).filter(name -> name.contains("."))
            .map(name -> "." + name.substring(filename.lastIndexOf(".") + 1)).orElse(".png");

    // Function to handle the photo saving
    private final BiFunction<String, MultipartFile, String> photoFunction = (id, image) -> {
        String filename = id + fileExtension.apply(image.getOriginalFilename());
        try {
            Path fileStorageLocation = Paths.get(PHOTO_DIRECTORY).toAbsolutePath().normalize();
            if (!Files.exists(fileStorageLocation)) {
                Files.createDirectories(fileStorageLocation);
            }
            Files.copy(image.getInputStream(), fileStorageLocation.resolve(filename), REPLACE_EXISTING);
            return ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/contacts/image/" + filename)
                    .toUriString();
        } catch (Exception exception) {
            throw new RuntimeException("Unable to save image", exception);
        }
    };

    // Custom logging function (replace with actual logging framework if needed)
    private void logInfo(String message, Object... args) {
        System.out.printf(message + "%n", args);  // Simple console log for demonstration
    }

    // Getter for contactRepo
    public ContactRepo getContactRepo() {
        return contactRepo;
    }

    // Setter for contactRepo
    public void setContactRepo(ContactRepo contactRepo) {
        this.contactRepo = contactRepo;
    }
}
