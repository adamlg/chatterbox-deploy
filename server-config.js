var express = require('express');
var util = require('./lib/utility');
var partials = require('express-partials');

var db = require('./app/config');
var User = require('./app/models/user');
var Link = require('./app/models/link');

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


/* START SOLUTION */
var loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username })
    .exec(function(err,user) {
      if (!user) {
        res.redirect('/login');
      } else {
        var savedPassword = user.password;
        User.comparePassword(password, savedPassword, function(err, match) {
          if (match) {
            util.createSession(app, req, res, user);
          } else {
            res.redirect('/login');
          }
        });
      }
  })
};
var createUser = function(req,res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username })
    .exec(function(err, user) {
      if (!user) {
        var newUser = new User({
          username: username,
          password: password
        });
        newUser.save(function(err, newUser) {
          if (err) {
            res.send(500, err);
          }
          util.createSession(app, req, res, newUser);
        });
      } else {
        console.log('Account already exists');
        res.redirect('/signup');
      }
    });
};

var navToLink = function(req, res) {
  Link.findOne({ code: req.params[0] }).exec(function(err,link) {
    if (!link) {
      res.redirect('/');
    } else {
      link.visits++;
      link.save(function(err,link){
        res.redirect(link.url);
        return;
      })
    }
  });
};

var fetchLinks = function(req,res) {
  Link.find({}).exec(function(err,links) {
    res.send(200, links);
  })
};


var saveLink  = function(req, res) {
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
        var newLink = new Link({
          url: uri,
          title: title,
          base_url: req.headers.origin,
          visits: 0
        });

        newLink.save(function(err,newEntry) {
          if (err) {
            res.send(500, err);
          } else {
            res.send(200,newEntry);
          }
        });
      })
    }
  });
};
/* ELSE

var fetchLinks = function(req, res) {
  Links.reset().fetch().then(function(links) {
    res.send(200, links.models);
  })
};

var createLink = function(req, res) {
  var uri = req.body.url;

  if (!util.isValidUrl(uri)) {
    console.log('Not a valid url: ', uri);
    return res.send(404);
  }

  new Link({ url: uri }).fetch().then(function(found) {
    if (found) {
      res.send(200, found.attributes);
    } else {
      util.getUrlTitle(uri, function(err, title) {
        if (err) {
          console.log('Error reading URL heading: ', err);
          return res.send(404);
        }

        var link = new Link({
          url: uri,
          title: title,
          base_url: req.headers.origin
        });

        link.save().then(function(newLink) {
          Links.add(newLink);
          res.send(200, newLink);
        });
      });
    }
  });
};


var navToLink = function(req, res) {
  new Link({ code: req.params[0] }).fetch().then(function(link) {
    if (!link) {
      res.redirect('/');
    } else {
      var click = new Click({
        link_id: link.get('id')
      });

      click.save().then(function() {
        db.knex('urls')
          .where('code', '=', link.get('code'))
          .update({
            visits: link.get('visits') + 1,
          }).then(function() {
            return res.redirect(link.get('url'));
          });
      });
    }
  });
};

var loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  new User({ username: username })
    .fetch()
    .then(function(user) {
      if (!user) {
        res.redirect('/login');
      } else {
        user.comparePassword(password, function(match) {
          if (match) {
            util.createSession(app, req, res, user);
          } else {
            res.redirect('/login');
          }
        })
      }
  });
};

var createUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  new User({ username: username })
    .fetch()
    .then(function(user) {
      if (!user) {
        var newUser = new User({
          username: username,
          password: password
        });
        newUser.save()
          .then(function(newUser) {
            util.createSession(app, req, res, newUser);
            Users.add(newUser);
          });
      } else {
        console.log('Account already exists');
        res.redirect('/signup');
      }
    })
};

var saveLink = function(req, res) {
  var uri = req.body.url;

  if (!util.isValidUrl(uri)) {
    console.log('Not a valid url: ', uri);
    return res.send(404);
  }

  new Link({ url: uri }).fetch().then(function(found) {
    if (found) {
      res.send(200, found.attributes);
    } else {
      util.getUrlTitle(uri, function(err, title) {
        if (err) {
          console.log('Error reading URL heading: ', err);
          return res.send(404);
        }
        var sha = util.createSha(uri);
        var link = new Link({
          url: uri,
          title: title,
          code: sha,
          base_url: req.headers.origin,
          visits: 0
        });

        var click = new Click({
          url: uri,
          createdAt: new Date(),
          link_id: link.attributes.code
        });

        click.save().then(function () {

          link.save().then(function(newLink) {
            Links.add(newLink);
            util.addShortenedUrlRedirect(app, link);
            res.send(200, newLink);
          });

        });
      });
    }
  });
};
END SOLUTION */

app.get('/', checkUser, function(req, res) {
  res.render('index');
});

app.get('/create', checkUser, function(req, res) {
  res.render('index');
});

app.get('/links', checkUser, fetchLinks);

app.post('/links', saveLink);

app.get('/login', function(req, res) {
  res.render('login');
});

app.post('/login', loginUser);

app.get('/logout', function(req, res) {
  req.session.destroy(function(){
    res.redirect('/login');
  });
});

app.get('/signup', function(req, res) {
  res.render('signup');
});

app.post('/signup', createUser);

app.get('/*', navToLink);


module.exports = app;
