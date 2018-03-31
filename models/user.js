var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({

	username: {
		type: String, 
		trim: true
	},
	password: {
		type: String,
		trim: true
	}, 
	email: {
		type: String,
		trim: true
	},
	facebook: {
		fbid: {
			type: String,
			trim: true
		},
		token: {
			type: String
		},
		displayName: {
			type: String
		},
		email: {
			type: String
		},
		avatar: {
			type: String
		},
		profileUrl: {
			type: String
		}
	}
});

module.exports = mongoose.model('User', userSchema);