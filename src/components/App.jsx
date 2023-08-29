import { useState, useEffect } from 'react';
import { ContactList } from "./ContactsList/ContactList";
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';
import css from "./App.module.css"

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');  
 

  useEffect(() => {
    const storedContacts = window.localStorage.getItem("contacts");
    setContacts(JSON.parse(storedContacts));
  }, []);
  


  const handleAddContact = (name, number) => {
    if (contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts`);
      return;
    }
    setContacts([...contacts, { id: nanoid(), name, number }]); 
  };
  

   useEffect(() => {
     window.localStorage.setItem("contacts", JSON.stringify(contacts));
   }, [contacts]);
  
  
  const applyFilter = () => {
    
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleChangeFilter = e => {
    setFilter(e.target.value);
  };

  const handleDeleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onAddContact={handleAddContact} />

        <h2 className={css.title}>Contacts</h2>
        <p className={css.filter_title}>Find contacts by name</p>
        <Filter
          onChangeFilter={handleChangeFilter}
          filter={filter}
        />
        <ContactList
          contacts={applyFilter()}
          onDeleteContact={handleDeleteContact}
        />
      </div>
    );
  }

  
    
