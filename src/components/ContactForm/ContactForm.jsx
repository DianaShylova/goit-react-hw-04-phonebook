import { Component } from 'react';
import css from "./ContactForm.module.css";

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handelChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handelSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    this.props.onAddContact(name, number);
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={css.submit_form} onSubmit={this.handelSubmit}>
        <h3 className={css.name_title}>Name</h3>
        <input className={css.shape_input}
          onChange={this.handelChange}
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <h3 className={css.number_title}>Number</h3>
        <input className={css.shape_input}
          onChange={this.handelChange}
          value={number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        />
        <button type="submit" className={css.add_contact_btn} >Add contact</button>
      </form>
    );
  }
}