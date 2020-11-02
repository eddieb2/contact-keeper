import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRECT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
} from '../types';

const ContactState = (props) => {
	const initialState = {
		contacts: [
			{
				id: 1,
				name: 'Dad',
				email: 'Dad@gmail.com',
				phone: '111-111-1111',
				type: 'personal',
			},
			{
				id: 2,
				name: 'Mom',
				email: 'Mome@gmail.com',
				phone: '111-111-1111',
				type: 'personal',
			},
		],
	};

	const [state, dispatch] = useReducer(contactReducer, initialState);

	// Add Contact
	const addContact = (contact) => {
		contact.id = uuidv4();
		dispatch({ type: ADD_CONTACT, payload: contact });
	};

	// Delete Contact
	// Set Current Contact
	// Clear Current Contact
	// Update Contact
	// Filter Contacts
	// Clear Filter

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				addContact,
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
