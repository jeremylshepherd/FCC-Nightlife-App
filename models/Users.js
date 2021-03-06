'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	twitter: {
		id: String,
		token: String,
		displayName: String,
		username: String,
        created: Date,
        avatar: String
	}
});

module.exports = mongoose.model('User', User);