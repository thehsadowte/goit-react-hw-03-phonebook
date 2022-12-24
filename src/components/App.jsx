import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contactStorage = JSON.parse(localStorage.getItem('contacts'));
    if (contactStorage) {
      this.setState({ contacts: contactStorage });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  normalizedContact = value => value.toLowerCase().trim();

  addNewContact = newContact => {
    const { contacts } = this.state;
    const exist = contacts.some(
      contact =>
        this.normalizedContact(contact.name) ===
        this.normalizedContact(newContact.name)
    );

    if (exist) {
      alert(`Contact is already exist`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  searchContact = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      this.normalizedContact(contact.name).includes(
        this.normalizedContact(filter)
      )
    );
  };

  deleteContact = id => {
    const { contacts } = this.state;
    const newContacts = contacts.filter(contact => contact.id !== id);
    this.setState({ contacts: newContacts });
  };

  render() {
    const filteredContacts = this.filterContacts();
    return (
      <div className={css.container}>
        <ContactForm onSubmit={this.addNewContact} />
        <Filter
          searchContact={this.searchContact}
          filterValue={this.state.filter}
        />
        <ContactsList
          contacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
