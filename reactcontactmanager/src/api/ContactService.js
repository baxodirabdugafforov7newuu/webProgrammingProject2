import axios from 'axios';

const BASE_URL = 'http://localhost:8080/contacts';

export const getContacts = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }
};

export const addContact = async (contact) => {
  const response = await axios.post(BASE_URL, contact);
  return response.data;
};

export const updateContact = async (contact) => {
  const response = await axios.put(`${BASE_URL}/${contact.id}`, contact);
  return response.data;
};

export const deleteContact = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
