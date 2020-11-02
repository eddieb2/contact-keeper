import React, { useContext } from 'react';
import axios from 'axios';

// SECTION Components
import ContactItem from './ContactItem';

// SECTION React Context API
import ContactContext from '../../context/contact/contactContext';

const Contacts = () => {
	const contactContext = useContext(ContactContext);

	const { contacts } = contactContext;

	return (
		<React.Fragment>
			{contacts.map((contact) => (
				<ContactItem key={contact.id} contact={contact} />
			))}
		</React.Fragment>
	);
};

export default Contacts;
