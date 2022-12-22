import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Component } from 'react';

import css from './ContactForm.module.css';

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  onInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  formReset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const { name, number } = this.state;
    const newContact = {
      name,
      number,
      id: nanoid(),
    };
    this.props.onSubmit(newContact);
    this.formReset();
  };

  render() {
    return (
      <div className={css.container}>
        <form className={css.form} onSubmit={this.onSubmit}>
          <h1>PhoneBook</h1>
          <div className="wrapper">
            <label>
              Name
              <input
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                onChange={this.onInputChange}
                value={this.state.name}
              />
            </label>
            Number
            <input
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={this.onInputChange}
              value={this.state.number}
            />
            <button type="submit">Add Contact</button>
          </div>
        </form>
      </div>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
