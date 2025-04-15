package com.example.demo.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_DEFAULT;

@Entity
@Table(name = "contacts")
@JsonInclude(NON_DEFAULT)
public class Contact {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "id", unique = true, updatable = false)
    private UUID id;

    private String name;
    private String email;
    private String title;
    private String phone;
    private String address;
    private String status;

    @Column(name = "photo_url")
    private String photoUrl;

    // Default constructor
    public Contact() {}

    // All-args constructor
    public Contact(UUID id, String name, String email, String title, String phone, String address, String status, String photoUrl) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.title = title;
        this.phone = phone;
        this.address = address;
        this.status = status;
        this.photoUrl = photoUrl;
    }

    // Getters and Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    // Optional: Override toString, equals, hashCode, etc. if needed
}
