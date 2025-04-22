import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import ContactList from './components/ContactList';
import ContactDetail from './components/ContactDetail';
import { toastSuccess, toastError } from './api/ToastService';
import "./App.css";
import axios from "axios";
import {
  getContacts,
  addContact,
  updateContact,
  deleteContact
} from './api/ContactService';


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

  const fetchContacts = async () => {
    const data = await getContacts();
    setContacts(data);
  };


  const handleSaveContact = async () => {
    const requiredFields = ['name', 'email', 'phone', 'address', 'title', 'status'];

    // Validate required fields
    const isEmpty = requiredFields.some(
      key => !newContact[key] || newContact[key].toString().trim() === ''
    );

    if (isEmpty) {
      toastError("Please fill all fields!");
      return;
    }

    try {
      let response;

      if (newContact.id) {
        // Update contact
        response = await axios.put(`http://localhost:8081/contacts/${newContact.id}`, newContact);
        toastSuccess("Contact updated!");
      } else {
        // Add new contact
        response = await axios.post(`http://localhost:8081/contacts`, newContact);
        toastSuccess("Contact added!");
      }

      // Refresh the contact list after save
      await fetchContacts();

      // Close modal and reset form
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

      console.log('Saved contact:', response.data);

    } catch (error) {
      console.error("Error saving contact:", error);
      toastError("Error saving contact. Please try again.");
    }
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
    // Reset form for new contact
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
