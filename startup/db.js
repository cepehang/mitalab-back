const mongoose = require('mongoose');

module.exports = function() {
	mongoose.connect(process.env.DB_PATH, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
    .then(() => console.log(`Connected to ${process.env.DB_PATH}`))
		.catch((e) => console.log('Error while connecting to MongoDB', e.message));
}
