import React, { useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

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
			<TransitionGroup>
				{filtered !== null
					? filtered.map((contact) => (
							<CSSTransition key={contact.id} timeout={500} classNames='item'>
								<ContactItem contact={contact} />
							</CSSTransition>
					  ))
					: contacts.map((contact) => (
							<CSSTransition key={contact.id} timeout={500} classNames='item'>
								<ContactItem contact={contact} />
							</CSSTransition>
					  ))}
			</TransitionGroup>
		</React.Fragment>
	);
};

export default Contacts;
