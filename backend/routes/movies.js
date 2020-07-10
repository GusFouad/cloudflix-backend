const moviesRoute = require('express').Router();
const User = require('../models/User');

const verifyToken = require('./verifyToken');

moviesRoute.get('/list', verifyToken, async (req, res) => {
	const user = await User.findById(req.user._id).then(function(document) {
		res.json(document.movies);
		console.log(document.movies);
	});
});
// for (i = 0; i < movies.length; i++) {
//   if (movies[i].movieId === req.body)
//     return res.status(400).send("Already on list");
//   console.log(movies[i].movieId);

moviesRoute.post('/add', verifyToken, async (req, res) => {
	const user = await User.findById(req.user._id);
	// const movies = await User.find({
	//   movies: { $eq: { movieId: req.body } },
	// });
	// console.log(movies);
	user.movies.push(req.body);
	console.log(req.body);
	await user.save().then((movies) => {
		res.json('movies updated');
	});
});
moviesRoute.delete('/:id', verifyToken, async (req, res) => {
	const result = await User.updateOne(
		{ _id: req.user._id },
		{ $pull: { movies: { movieId: { $eq: { _id: req.params.id } } } } }
	);
	console.log(result);
	if (result.nModified === 0) {
		return res.status(404).send({ message: 'Ya dun goofed. ' });
	}
	return res.status(200).send({ message: 'You deleted it. ' });
});

module.exports = moviesRoute;
