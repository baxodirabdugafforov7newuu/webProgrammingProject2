import React, { useState, useEffect } from 'react';

const ContactDetail = ({ newContact, setNewContact, onSaveContact, onClose }) => {
  const handleChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Ensure the newContact has default values
    if (!newContact.name || !newContact.email) {
      alert('Name and Email are required!');
      return;
    }

    // Save the contact (this function should be passed as a prop)
    onSaveContact(newContact);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <h3>{newContact.id ? 'Edit Contact' : 'Add New Contact'}</h3>

        <input
          type="text"
          name="name"
          value={newContact.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={newContact.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="phone"
          value={newContact.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
        <input
          type="text"
          name="address"
          value={newContact.address}
          onChange={handleChange}
          placeholder="Address"
        />
        <input
          type="text"
          name="title"
          value={newContact.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <select
          name="status"
          value={newContact.status}
          onChange={handleChange}
        >
          <option value="">Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button className="btn" onClick={handleSave}>
          {newContact.id ? 'Save Changes' : 'Add Contact'}
        </button>
      </div>
    </div>
  );
};

export default ContactDetail;
