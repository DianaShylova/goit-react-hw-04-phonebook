import css from "./ContactList.module.css"
export function ContactList({ contacts, onDeleteContact }) {
  return (
    <ul className={css.contact_list}>
      {contacts.map(contact => (
        <li className={css.contact_list_item} key={contact.id}>
          {contact.name}:{contact.number}
          <button className={css.contact_btn} onClick={() => onDeleteContact(contact.id)} type="button">
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}