import axios from 'axios';

const BASE_URL = 'http://localhost:8081/contacts';

export const getContacts = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data.content; // only the actual list
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }
};

export const addContact = async (contact) => {
  try {
    const response = await axios.post(BASE_URL, contact);
    return response.data;
  } catch (error) {
    console.error('Error adding contact:', error);
    throw error;
  }
};

export const deleteContact = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting contact:', error);
  }
};

export const updateContact = async (contact) => {
  try {
    const response = await axios.put(`${BASE_URL}/${contact.id}`, contact);
    return response.data;
  } catch (error) {
    console.error('Error updating contact:', error);
    throw error;
  }
};
