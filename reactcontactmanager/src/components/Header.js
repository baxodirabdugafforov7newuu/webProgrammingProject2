import React from 'react';

const Header = ({ onAddContact, nbOfContacts }) => {
  return (
    <header className="header">
      <div className="container">
        <h3>Contact List ({nbOfContacts})</h3>
        <button onClick={onAddContact} className="btn">
          <i className="bi bi-plus-square"></i> Add New Contact
        </button>
      </div>
    </header>
  );
};

export default Header;
