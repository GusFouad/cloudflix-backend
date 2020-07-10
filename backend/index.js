const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const cors = require('cors');

const authRoute = require('./routes/auth');
const moviesRoute = require('./routes/movies');

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

dotenv.config();

app.post('/api/form', (req, res) => {
	const data = req.body;
	const mailTransport = nodemailer.createTransport({
		service: 'Gmail',
		port: 465,
		auth: {
			user: process.env.GMAIL_ACCOUNT,
			pass: process.env.GMAIL_PASSWORD
		}
	});
	const mailOptions = {
		from: data.email,
		to: process.env.GMAIL_ACCOUNT,
		subject: `Message from ${data.name}`,
		html: `<ul>
    <li>Name: ${data.name}</li>
    <li>email: ${data.email}</li>
    </ul>
    <h3> Message</h3>
    <p>${data.message}</p>`
	};
	mailTransport.sendMail(mailOptions, (error, response) => {
		if (error) {
			res.send(error);
		} else {
			res.send('success');
		}
		mailTransport.close();
	});
});
mongoose.connect(
	process.env.DB_CONNECT,
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
	() => console.log('connected to Mongodb')
);

app.use('/user', authRoute);
app.use('/movies', moviesRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server is runnong on port: ${port}`);
});
