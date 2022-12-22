import PropTypes from 'prop-types';
import css from './ContactsList.module.css';

export default function ContactsList({ contacts, deleteContact }) {
  return (
    <>
      <ul className={css.list}>
        {contacts.map(({ id, name, number }) => (
          <li className={css.item} key={id}>
            {name}, {number}
            <button
              className={css.btn}
              onClick={() => deleteContact(id)}
              type="button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
