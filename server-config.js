var express = require('express');
var partials = require('express-partials');
/* START SOLUTION */
var util = require('./lib/utility.solution');
/* ELSE
var util = require('./lib/utility');
END SOLUTION */

var db = require('./app/config');
var User = require('./app/models/user');
var Link = require('./app/models/link');
/* START SOLUTION */
/* ELSE
var Users = require('./app/collections/users');
var Links = require('./app/collections/links');
var Click = require('./app/models/click');
END SOLUTION */

var app = express();

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(partials());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
  app.use(express.cookieParser('shhhh, very secret'));
  app.use(express.session());
});

app.get('/', util.checkUser, function(req, res) {
  res.render('index');
});

app.get('/create', util.checkUser, function(req, res) {
  res.render('index');
});

app.get('/links', util.checkUser, util.fetchLinks);

app.post('/links', util.saveLink);

app.get('/login', function(req, res) {
  res.render('login');
});

app.post('/login', util.loginUser);

app.get('/logout', function(req, res) {
  req.session.destroy(function(){
    res.redirect('/login');
  });
});

app.get('/signup', function(req, res) {
  res.render('signup');
});

app.post('/signup', util.createUser);

app.get('/*', util.navToLink);


module.exports = app;
