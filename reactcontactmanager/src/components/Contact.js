import React from 'react';

const Contact = ({ contact, onEdit, onDelete }) => (
  <li className="contact-card">
    <div className="contact-card-header">
      <h3>{contact.name}</h3>
    </div>
    <p><strong>Email:</strong> {contact.email}</p>
    <p><strong>Phone:</strong> {contact.phone}</p>
    <p><strong>Address:</strong> {contact.address}</p>
    <div className="contact-card-footer">
      <button className="delete-btn" onClick={onDelete}>Delete</button>
      <button className="edit-btn" onClick={onEdit}>Edit</button>
    </div>
  </li>
);

export default Contact;
