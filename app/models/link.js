var db = require('../config');
var mongoose = require('mongoose');

var linkSchema = mongoose.Schema({
 visits: Number,
 link: String,
 title: String,
 code: String,
 base_url: String,
 url: String
});

var Link = mongoose.model('Link', linkSchema);

module.exports = Link;
