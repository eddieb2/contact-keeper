import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
	// SECTION Context API
	const contactContext = useContext(ContactContext);
	const { filterContacts, clearFilter, filtered } = contactContext;

	// Refs
	const text = useRef('');

	useEffect(() => {
		if (filtered === null) {
			text.current.value = '';
		}
		// eslint-disable-next-line
	}, []);

	// Helpers
	const onChange = (e) => {
		if (text.current.value !== '') {
			filterContacts(e.target.value);
		} else {
			clearFilter();
		}
	};

	return (
		<form>
			<input ref={text} type='text' placeholder='Filter Contacts...' onChange={onChange} />
		</form>
	);
};

export default ContactFilter;
