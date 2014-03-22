var express = require('express');
var util = require('./lib/utility');
var partials = require('express-partials');

var db = require('./app/config');
// var Users = require('./app/collections/users');
var User = require('./app/models/user');
// var Links = require('./app/collections/links');
var Link = require('./app/models/link');
// var Click = require('./app/models/click');


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

var checkUser = function(req, res, next) {
  if (!util.isLoggedIn(req)) {
    res.redirect('/login');
  } else {
    next();
  }
};

app.get('/', checkUser, function(req, res) {
  res.render('index');
});

app.get('/create', checkUser, function(req, res) {
  res.render('index');
});

app.get('/links', checkUser, function(req, res) {
  Link.find({}).exec(function(err,links) {
    console.log('links')
    res.send(200, links);
  })
});

app.post('/links', function(req, res) {
  var uri = req.body.url;

  if (!util.isValidUrl(uri)) {
    console.log('Not a valid url: ', uri);
    return res.send(404);
  }

  Link.findOne({ url: uri }).exec(function(err, found) {
    if (found) {
      res.send(200, found);
    } else {
      util.getUrlTitle(uri, function(err, title) {
        if (err) {
          console.log('Error reading URL heading: ', err);
          return res.send(404);
        }
        var sha = util.createSha(uri);
        var newLink = new Link({
          url: uri,
          title: title,
          code: sha,
          base_url: req.headers.origin,
          visits: 0
        });
        newLink.save(function(err,newEntry) {
          if (err) {
            res.send(500, err);
          } else {
            console.log('newEntry',newEntry);
            app.get('/' + sha, function(req, res){
              console.log('sha',sha,'req', req.body);
              Link.findOne({ code: sha}).exec(function(err, entry) {
                console.log('1', entry);
                entry.visits = entry.visits += 1;
                entry.save(function(entry){
                  console.log(entry);
                });
                res.redirect(entry.url);
              })
            })
            res.send(200,newEntry);
          }
        });
      })
    };
  });
});


app.get('/login', function(req, res) {
  res.render('login');
});

app.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username })
    .exec(function(err,user) {
      if (!user) {
        res.redirect('/login');
      } else {
        var userPassword = user.password;
        util.comparePassword(password, userPassword, function(err, match) {
          if (match) {
            util.createSession(app, req, res, user);
          } else {
            res.redirect('/login');
          }
        });
      }
  });
});

app.get('/logout', function(req, res) {
  req.session.destroy(function(){
    res.redirect('/login');
  });
});

app.get('/signup', function(req, res) {
  res.render('signup');
});

app.post('/signup', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username })
    .exec(function(err, user) {
      if (!user) {
        util.hashPassword(password, function(hashedPassword) {
          var newUser = new User({
            username: username,
            password: hashedPassword
          });
          newUser.save(function(err, newUser) {
            if (err) {
              res.send(500, err);
            }
            util.createSession(app, req, res, newUser);
          });
        });
      } else {
        console.log('Account already exists');
        res.redirect('/signup');
      }
    });
});

var port = process.env.PORT || 4568;
app.listen(port);

console.log('Server now listening on port ' + port);
