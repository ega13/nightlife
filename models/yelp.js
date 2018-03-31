var mongoose = require('mongoose');

var goSchema = new mongoose.Schema({
	url: {
		type: String
	},
	going: {
		uid: [],
		count: {
			type: Number,
			default: 100
		},
		checked: {
			type: Number,
			default: 0
		}
	}
})

module.exports = mongoose.model('Go', goSchema);