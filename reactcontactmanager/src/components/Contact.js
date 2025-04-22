import React from 'react';

const Contact = ({ contact, onEdit, onDelete }) => {
  return (
    <li className="contact__card">
      <h4>{contact.name}</h4>
      <p><strong>Email:</strong> {contact.email}</p>
      <p><strong>Phone:</strong> {contact.phone}</p>
      <p><strong>Address:</strong> {contact.address}</p>
      <p><strong>Title:</strong> {contact.title}</p>
      <p><strong>Status:</strong> {contact.status}</p>
      <div className="btn-group">
        <button onClick={onEdit} className="btn btn-edit">Edit</button>
        <button onClick={onDelete} className="btn btn-delete">Delete</button>
      </div>
    </li>
  );
};

export default Contact;
