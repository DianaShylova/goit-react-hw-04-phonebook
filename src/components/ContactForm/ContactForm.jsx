import { useState } from 'react';
import css from "./ContactForm.module.css";
import { nanoid } from 'nanoid';

export const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');    


  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }    
  };

  const handleSubmit = e => {
    e.preventDefault();
    const id = nanoid();
    onSubmit({ name, number, id });
    setName('');
    setNumber('');
  };

     
    return (
      <form className={css.submit_form} onSubmit={handleSubmit}>
        <h3 className={css.name_title}>Name</h3>
        <input className={css.shape_input}
          onChange={handleChange}
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <h3 className={css.number_title}>Number</h3>
        <input className={css.shape_input}
          onChange={handleChange}
          value={number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        />
        <button type="submit" className={css.add_contact_btn} >Add contact</button>
      </form>
    );
  
};