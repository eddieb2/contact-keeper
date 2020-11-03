import React, { useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

// SECTION Components
import ContactItem from './ContactItem';

// SECTION React Context API
import ContactContext from '../../context/contact/contactContext';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		'& > * + *': {
			marginLeft: theme.spacing(2),
		},
	},
}));

const Contacts = () => {
	const classes = useStyles();
	const contactContext = useContext(ContactContext);

	const { contacts, filtered, getContacts, loading } = contactContext;

	useEffect(() => {
		getContacts();
		// eslint-disable-next-line
	}, []);

	if (contacts !== null && contacts.length === 0 && !loading) {
		return <h4>Please add a contact</h4>;
	}

	return (
		<React.Fragment>
			{contacts !== null && !loading ? (
				<TransitionGroup>
					{filtered !== null
						? filtered.map((contact) => (
								<CSSTransition key={contact._id} timeout={500} classNames='item'>
									<ContactItem contact={contact} />
								</CSSTransition>
						  ))
						: contacts.map((contact) => (
								<CSSTransition key={contact._id} timeout={500} classNames='item'>
									<ContactItem contact={contact} />
								</CSSTransition>
						  ))}
				</TransitionGroup>
			) : (
				<div className={classes.root}>
					<CircularProgress color='secondary' />
				</div>
			)}
		</React.Fragment>
	);
};

export default Contacts;
