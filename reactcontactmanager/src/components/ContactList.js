import React from 'react';
import Contact from './Contact';

const ContactList = ({ data, onEditContact, onDeleteContact }) => {
  return (
    <main className="main">
      {data.length === 0 ? (
        <p>No contacts yet. Please add one.</p>
      ) : (
        <ul className="contact__list">
          {data.map((contact) => (
            <Contact
              key={contact.id}
              contact={contact}
              onEdit={() => onEditContact(contact)}
              onDelete={() => onDeleteContact(contact.id)}
            />
          ))}
        </ul>
      )}
    </main>
  );
};

export default ContactList;
