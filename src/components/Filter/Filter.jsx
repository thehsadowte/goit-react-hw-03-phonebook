import PropTypes from 'prop-types';
import css from './Filter.module.css';

export default function Filter({ searchContact, filterValue }) {
  return (
    <>
      <h2 className={css.title}>Contacts</h2>
      <label className={css.label}>
        Enter search query
        <input
          className={css.input}
          type="text"
          name="filter"
          onChange={e => searchContact(e)}
          value={filterValue}
        />
      </label>
    </>
  );
}

Filter.propTypes = {
  filterValue: PropTypes.string.isRequired,
  searchContact: PropTypes.func.isRequired,
};
