import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import ContactList from './components/ContactList';
import ContactDetail from './components/ContactDetail';
import { toastSuccess, toastError } from './api/ToastService';
import "./App.css"

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContact, setNewContact] = useState({
    id: null,
    name: '',
    email: '',
    phone: '',
    address: '',
    title: '',
    status: ''
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    const simulatedData = [
      { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St', title: 'Developer', status: 'Active' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com', phone: '987-654-3210', address: '456 Elm St', title: 'Designer', status: 'Inactive' }
    ];
    setContacts(simulatedData);
  };

  const handleSaveContact = () => {

    const requiredFields = ['name', 'email', 'phone', 'address', 'title', 'status'];
    const isEmpty = requiredFields.some(
      key => !newContact[key] || newContact[key].toString().trim() === ''
    );

    if (isEmpty) {
      toastError("Please fill all fields!");
      return;
    }

    const isEmptyField = Object.entries(newContact).some(
      ([key, value]) => {
        if (key === 'id') return false; // skip id check
        return !value || String(value).trim() === '';
      }
    );
    
    if (isEmptyField) {
      toastError("Please fill all fields!");
      return;
    }
    

    if (newContact.id) {
      // Edit existing contact
      setContacts(prev =>
        prev.map(c => (c.id === newContact.id ? newContact : c))
      );
      toastSuccess("Contact updated!");
    } else {
      // Add new contact
      const id = contacts.length ? Math.max(...contacts.map(c => c.id)) + 1 : 1;
      setContacts([...contacts, { ...newContact, id }]);
      toastSuccess("Contact added!");
    }

    setIsModalOpen(false);
    setNewContact({
      id: null,
      name: '',
      email: '',
      phone: '',
      address: '',
      title: '',
      status: ''
    });
  };

  const handleDeleteContact = (id) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
    toastSuccess("Contact deleted!");
  };

  const handleEditContact = (contact) => {
    setNewContact(contact);
    setIsModalOpen(true);
  };

  const handleOpenAddModal = () => {
    setNewContact({
      id: null,
      name: '',
      email: '',
      phone: '',
      address: '',
      title: '',
      status: ''
    });
    setIsModalOpen(true);
  };

  return (
    <div>
      <Header onAddContact={handleOpenAddModal} nbOfContacts={contacts.length} />

      {isModalOpen && (
        <ContactDetail
          newContact={newContact}
          setNewContact={setNewContact}
          onSaveContact={handleSaveContact}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <ContactList
        data={contacts}
        onEditContact={handleEditContact}
        onDeleteContact={handleDeleteContact}
      />

      <ToastContainer position="top-right" autoClose={4000} />
    </div>
  );
};

export default App;
