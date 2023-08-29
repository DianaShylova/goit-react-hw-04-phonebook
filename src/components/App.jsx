import { Component } from 'react';
import { ContactList } from "./ContactsList/ContactList";
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';
import css from "./App.module.css"

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const storedContacts = window.localStorage.getItem("contacts");
    
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }


  handleAddContact = (name, number) => {
    if (this.state.contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, { id: nanoid(), name, number }],
    }));
  };
  
  componentDidUpdate(_, prevState) {
    const { contacts } = this.state
    if (prevState.contacts !== contacts){
      window.localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }

  applyFilter = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  handleChangeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onAddContact={this.handleAddContact} />

        <h2 className={css.title}>Contacts</h2>
        <p className={css.filter_title}>Find contacts by name</p>
        <Filter
          onChangeFilter={this.handleChangeFilter}
          filter={this.state.filter}
        />
        <ContactList
          contacts={this.applyFilter()}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}