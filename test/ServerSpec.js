var request = require('supertest');
var express = require('express');

var app = require('../server-config.js');

var expect = require('chai').expect;
var xrequest = require('request');

var db = require('../app/config');
// var Users = require('../app/collec/tions/users');
var User = require('../app/models/user');
// var Links = require('../app/collections/links');
var Link = require('../app/models/link');



describe('', function() {
  before(function(done) {
    // log out currently signed in user
    request(app)
      .get('/logout')
      .end(function(err, res) {
        if(err) return done(err);
        console.log('Logged out');

        // delete objects from db so they can be created later for the test
        Link.remove({title : 'Rofl Zoo - Daily funny animal pictures'}).exec();
        User.remove({username : 'Savannah'}).exec();
        User.remove({username : 'Phillip'}).exec();

        done();
      });

  });

  it('Shortens links', function(done) {
    request(app)
      .post('/links')
      .send({
        'url': 'http://www.roflzoo.com/'})
      .expect(200)
      .expect(function(res) {
        expect(res.body.url).to.equal('http://www.roflzoo.com/');
      })
      .end(function(err, res) {
        if(err) return done(err);
        done();
      });
  });

  it('Only shortens valid urls, returning a 404 - Not found for invalid urls', function(done) {
    request(app)
      .post('/links')
      .send({
        'url': 'definitely not a valid url'})
      .expect(404)
      .end(function(err, res) {
        if(err) return done(err);
        done();
      });
  });


  it('New links create a database entry', function(done) {
    Link.findOne({'url' : 'http://www.roflzoo.com/'})
      .exec(function(err,link){
        if (err){
          console.log(error);
        }
        expect(link.url).to.equal('http://www.roflzoo.com/');
        done();
      });
  });

  it('Fetches the link url title', function (done) {
    var foundTitle;
    Link.findOne({'url':'http://www.roflzoo.com'})
      .exec(function(err,link) {
        if (err){
          console.log(err);
        }
        if (link){
          foundTitle = link.title;
        }
        expect(foundTitle).to.equal('Rofl Zoo - Daily funny animal pictures');
        done();
      });
  });

  it('Returns the same shortened code if attempted to add the same URL twice', function(done) {
    var firstCode, secondCode;
    Link.findOne({'url':'http://www.roflzoo.com'})
      .exec(function(err,link) {
        firstCode = link.code;
        request(app)
          .post('/links')
          .send({
            'url': 'http://www.roflzoo.com/'})
          .expect(200)
          .expect(function(res) {
            var secondCode = res.body.code;
            expect(secondCode).to.equal(firstCode);
          })
          .end(function(err, res) {
            if(err) return done(err);
            done();
          });
      });
  });

  it('Shortcode redirects to correct url', function(done) {
    this.timeout(5000);
    //TOSAVANNAH: wat? LOLZ.
      Link.findOne({'title': 'Rofl Zoo - Daily funny animal pictures'})
      .exec(function(err,link) {
        var sha = link.code;
        request(app)
          .get('/' + sha)
          .expect(302)
          .expect(function(res) {
            var currentLocation = res.request.href;
            expect(currentLocation).to.equal('http://www.roflzoo.com/');
          })
          .end(function(err, res) {
            if(err) return done(err);
            done();
          });
      });
  });


  // /*  Authentication  */
  // // TODO: xit out authentication
  it('Redirects to login page if a user tries to access the main page and is not signed in', function(done) {
    request(app)
      .get('/')
      .expect(302)
      .expect(function(res) {
        expect(res.headers.location).to.equal('/login');
      })
      .end(function(err, res) {
        if(err) return done(err);
        done();
      });
  });

  it('Redirects to login page if a user tries to create a link and is not signed in', function(done) {
    request(app)
      .get('/create')
      .expect(302)
      .expect(function(res) {
        expect(res.headers.location).to.equal('/login');
      })
      .end(function(err, res) {
        if(err) return done(err);
        done();
      });
  });

  it('Redirects to login page if a user tries to see all of the links and is not signed in', function(done) {
    request(app)
      .get('/links')
      .expect(302)
      .expect(function(res) {
        expect(res.headers.location).to.equal('/login');
      })
      .end(function(err, res) {
        if(err) return done(err);
        done();
      });
  });

  it('Signup creates a new user', function(done) {
    request(app)
      .post('/signup')
      .send({
        'username': 'Svnh',
        'password': 'Svnh'
      })
      .expect(200)
      .expect(function(res) {
        User.findOne({'username': 'Svnh'})
        .exec(function(err,user) {
          expect(user.username).to.equal('Svnh');
          done();
        });
      });
  });

  it('Successful signup logs in a new user', function(done) {
    request(app)
      .post('/signup')
      .send({
        'username': 'Phillip',
        'password': 'Phillip'
      })
      .expect(200)
      .expect(function(res) {
        expect(res.headers.location).to.equal('/');
        request(app)
          .get('/logout')
          .end(done)
      });
  });

  it('Logs in existing users', function(done) {
    request(app)
      .post('/login')
      .send({
        'username': 'Phillip',
        'password': 'Phillip'
      })
      .expect(302)
      .expect(function(res) {
        expect(res.headers.location).to.equal('/');
      })
      .end(done);
  });

  // // TODO: What should I do to test for all links? This sends back a string.
  it('Returns all of the links to display on the links page', function(done) {
    var options = {
      'method': 'POST',
      'uri': 'http://127.0.0.1:4568/login',
      'json': {
        'username': 'Phillip',
        'password': 'Phillip'
      }
    };

    // enable cookies for login information
    xrequest = xrequest.defaults({jar: true});
    xrequest(options, function(error, res, body) {
      xrequest('http://127.0.0.1:4568/links', function(error, res, body) {
        expect(body).to.include('"title": "Rofl Zoo - Daily funny animal pictures"');
        done();
      });
    });

  });

  it('Users that do not exist are kept on login page', function(done) {
    request(app)
      .post('/login')
      .send({
        'username': 'Fred',
        'password': 'Fred'
      })
      .expect(302)
      .expect(function(res) {
        expect(res.headers.location).to.equal('/login');
      })
      .end(done)
  });
});
