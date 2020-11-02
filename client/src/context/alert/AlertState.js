import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { v4 as uuidv4 } from 'uuid';
import { REMOVE_ALERT, SET_ALERT } from '../types';

const AlertState = (props) => {
	const initialState = [];

	const [state, dispatch] = useReducer(alertReducer, initialState);

	// Actions
	// Set Alert
	const setAlert = (message, type, timeout = 5000) => {
		const id = uuidv4();

		dispatch({
			type: SET_ALERT,
			payload: { message, type, id },
		});

		setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
	};

	return (
		<AlertContext.Provider
			value={{
				alerts: state,
				setAlert,
			}}
		>
			{props.children}
		</AlertContext.Provider>
	);
};

export default AlertState;
