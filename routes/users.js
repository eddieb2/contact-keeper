const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');

/**
 * @route   POST api/users
 * @desc    Register a user
 * @access  Public
 */

router.post(
	'/',
	[
		// NOTE User Account Validation (Validation Result generated from here)
		check('name', 'Please enter a name.').not().isEmpty(),
		check('email', 'Please enter a valid email.').isEmail(),
		check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req);

		// NOTE Are there validation errors ?
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		// NOTE Check if the user exists, else create a new used and add to the database.
		try {
			let user = await User.findOne({ email: email });

			if (user) {
				return res.status(400).json({ message: 'User already exists.' });
			}

			user = new User({
				name,
				email,
				password,
			});

			// NOTE Password encryption
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			await user.save();

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{
					expiresIn: 360000,
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (error) {
			console.error(error.message);
			res.status(500).json({ error: 'Server error.' });
		}
	}
);

module.exports = router;
