import React from 'react';

const Header = ({ onAddContact, nbOfContacts }) => (
  <header className="header">
    <h1>My Contacts ({nbOfContacts})</h1>
    <button className="btn" onClick={onAddContact}>Add Contact</button>
  </header>
);

export default Header;
