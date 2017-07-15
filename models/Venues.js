'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Venue = new Schema({
	zip: String,
	id: String,
	place_id: String,
	price: Number,
	rating: Number,
	zips: [String],
	name: String,
	adress: String,
	going:[{
		type: Schema.Types.ObjectId, ref: 'User'
	}]
});


module.exports = mongoose.model('Venue', Venue);