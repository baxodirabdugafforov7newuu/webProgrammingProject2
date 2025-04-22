import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ContactList from './components/ContactList';
import ContactDetail from './components/ContactDetail';
import { getContacts, addContact, updateContact, deleteContact } from './api/ContactService';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastSuccess, toastError } from './api/ToastService';
import './App.css';

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

  const fetchContacts = async () => {
    const data = await getContacts();
    setContacts(data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSaveContact = async () => {
    try {
      if (newContact.id) {
        await updateContact(newContact);
        toastSuccess("Contact updated!");
      } else {
        await addContact(newContact);
        toastSuccess("Contact added!");
      }

      setIsModalOpen(false);
      setNewContact({ id: null, name: '', email: '', phone: '', address: '', title: '', status: '' });
      fetchContacts();
    } catch (error) {
      toastError("Failed to save contact");
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await deleteContact(id);
      toastSuccess("Contact deleted!");
      fetchContacts();
    } catch (error) {
      toastError("Failed to delete contact");
    }
  };

  const handleEditContact = (contact) => {
    setNewContact(contact);
    setIsModalOpen(true);
  };

  const handleOpenAddModal = () => {
    setNewContact({ id: null, name: '', email: '', phone: '', address: '', title: '', status: '' });
    setIsModalOpen(true);
  };

  return (
    <div>
      <Header onAddContact={handleOpenAddModal} nbOfContacts={contacts.length} />
      {isModalOpen && (
        <ContactDetail
          newContact={newContact}
          setNewContact={setNewContact}
          onClose={() => setIsModalOpen(false)}
          onSaveContact={handleSaveContact}
        />
      )}
      <ContactList data={contacts} onEditContact={handleEditContact} onDeleteContact={handleDeleteContact} />
      <ToastContainer />
    </div>
  );
};

export default App;
