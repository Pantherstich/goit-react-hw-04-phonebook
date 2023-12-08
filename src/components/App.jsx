import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { H1Title, H2Title, Layout } from './App.styled';
const CONTACTS_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem(CONTACTS_KEY));
    savedContacts && setContacts(savedContacts);
  }, []);

  useEffect(() => {
    if (!contacts.length) {
      return;
    }
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    const isExist = contacts.find(
      contact =>
        contact.name.toLowerCase() === newContact.name.toLowerCase().trim()
    );
    const contactObj = {
      ...newContact,
      id: nanoid(),
    };
    if (isExist) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }
    setContacts(prevState => [...prevState, contactObj]);
  };

  const deleteContact = e => {
    const contactToDelete = e.target.id;
    setContacts(prev => prev.filter(({ id }) => id !== contactToDelete));
  };

  const onChangeFilter = e => {
    setFilter(e.target.value);
  };

  const filterContacts = () => {
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
    return filteredContacts;
  };
  return (
    <Layout>
      <H1Title>Phonebook</H1Title>
      <ContactForm addContact={addContact} />
      <Filter filter={filter} onChangeFilter={onChangeFilter} />
      <H2Title>Contacts</H2Title>
      <ContactList contacts={filterContacts()} deleteContact={deleteContact} />
    </Layout>
  );
};
