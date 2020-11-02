import React, { useContext } from 'react';

// SECTION Components
import ContactItem from './ContactItem';

// SECTION React Context API
import ContactContext from '../../context/contact/contactContext';

const Contacts = () => {
	const contactContext = useContext(ContactContext);

	const { contacts, filtered } = contactContext;

	if (contacts.length === 0) {
		return <h4>Please add a contact</h4>;
	}

	return (
		<React.Fragment>
			{filtered !== null
				? filtered.map((contact) => <ContactItem key={contact.id} contact={contact} />)
				: contacts.map((contact) => <ContactItem key={contact.id} contact={contact} />)}
		</React.Fragment>
	);
};

export default Contacts;
