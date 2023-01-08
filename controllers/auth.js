import { db } from '../connect.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//register
export const register = (req, res) => {
	//check for user
	const q = 'SELECT * FROM users WHERE username  = ?';
	//
	db.query(q, [req.body.username], (err, data) => {
		if (err) return res.status(500).json(err);
		if (data.length) return res.status(409).json('User already exists');

		//Hash password
		//create new user
		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(req.body.password, salt);

		const q =
			'INSERT INTO users(`name`,`username`,`email`,`password`,`profilePic`,`coverPic`) VALUE (?)';

		const values = [
			req.body.name,
			req.body.username,
			req.body.email,
			hashedPassword,
			req.body.profilePic,
			req.body.coverPic,
		];
		db.query(q, [values], (err, data) => {
			if (err) return res.status(500).json(err);
			return res.status(200).json('User created');
		});
	});
};

//login
export const login = (req, res) => {
	const q = 'SELECT * FROM users WHERE username=?';
	db.query(q, [req.body.username], (err, data) => {
		if (err) return res.status(500).json(err);
		if (data.length === 0) return res.status(404).json('User not found');

		const checkPassword = bcrypt.compareSync(
			req.body.password,
			data[0].password
		);

		if (!checkPassword)
			return res.status(400).json('Invalid username or password');

		const token = jwt.sign({ id: data[0].id }, 'KeyToken');

		const { password, ...info } = data[0];

		res
			.cookie('accessToken', token, {
				domain: '.onrender.com',
				sameSite: 'none',
				httpOnly: true,
				secure: true,
			})
			.status(200)
			.json(info);
	});
};

//logout
export const logout = (req, res) => {
	res
		.clearCookie('accessToken', {
			secure: true,
			sameSite: 'none',
		})
		.status(200)
		.json('Logged out');
};
