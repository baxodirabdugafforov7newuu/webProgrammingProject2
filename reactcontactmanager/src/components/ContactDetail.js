import React from 'react';

const ContactDetail = ({ newContact, setNewContact, onClose, onSaveContact }) => {
  const handleChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    const requiredFields = ['name', 'email', 'phone', 'address', 'title', 'status'];
    const isFormValid = requiredFields.every(field => newContact[field]);

    if (!isFormValid) {
      alert('Please fill all required fields.');
      return;
    }

    // If all fields are valid, call onSaveContact
    onSaveContact();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <h3>{newContact.id ? 'Edit Contact' : 'Add New Contact'}</h3>

        <form onSubmit={handleSubmit}>
          {['name', 'email', 'phone', 'address', 'title'].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              value={newContact[field] || ''}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              required // Ensures this field must be filled
            />
          ))}

          <select
            name="status"
            value={newContact.status || ''}
            onChange={handleChange}
            required // Ensures the user selects a status
          >
            <option value="">Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button className="btn" type="submit">
            {newContact.id ? 'Save Changes' : 'Add Contact'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactDetail;
