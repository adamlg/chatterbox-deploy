shortly-deploy
==============

In this sprint, you will learn about deployment and various build tools. The tools and techniques you gain experience with here will allow you to kick off your group project with a bang.

Orientation
===========

We're giving you a canonical version of the Shortly-express repo to start with. You'll notice that it looks a bit different from yours, however. Check out `index.ejs`. The templates are pre-compiled and loaded using a single script tag. //TODO: add justification--speed & SEO -- links

Basic requirements
====================

Get your code ready for deployment
 * [ ] Liberate your repo
 TODO://///find/instructions

Set up a server with Azure:
 * [ ] Use the Azure command line tools to provision and configure a 'production' server

// TODO: Shorten/focus on port?
Refactor this repo to support two environments
The production server will have a differet configuration than your development environment; for example, passwords for your database server will be different.
 * [ ] Refactor your app's configuration code to be more modular so that configuration dependencies can be injected at start time
 * [ ] Don't break your development environment in the process!

Deploy
 * [ ] Deploy your code to Azure!
 * [ ] TODO revise:// Think about what code needs to change in the production environment
 * [ ] Read about [how to use node modules](http://www.windowsazure.com/en-us/documentation/articles/nodejs-use-node-modules-windows-azure-apps/) with Azure. Make any necessary changes.

Create a Gruntfile 
 * [ ] Use [Grunt](http://gruntjs.com/) to create a deployment script
 //TODO: necessary?
 * [ ] Automate the pre-compile step - refactor the compile script to use Grunt
 //TODO: are uglify/minify the same?
 * [ ] Uglify and minify your code using Grunt before deployment
 * [ ] Concatenate files before deployment
 * [ ] Run jshint before deployment -- if jshint fails, the build process should exit
 * [ ] Run your Mocha tests before deployment -- if any tests fail, the build process should exit


//TODO: sqlite in .gitignore? also shortly-exp

//TODO: switch sqlite module in shortly-express

Refactor your database 
======================
In the previous sprint, our shortened links were stored using sqlite, a server-less database engine. Sqlite is great for development, but it's not suited for production sites for [various reasons](http://stackoverflow.com/questions/913067/sqlite-as-a-production-database-for-a-low-traffic-site).
* [ ] Refactor the app to use MongoDB/Mongoose, and run it locally
* [ ] Host a Mongo instance on [Azure](http://www.windowsazure.com/en-us/documentation/articles/store-mongolab-web-sites-nodejs-store-data-mongodb/)
* [ ] Refactor your database code to handle both enviroments--if you're running it locally, it should connect to a local database, and when you navigate to your deployed site, it should connect to your hosted Mongo instance
todo:// notes from above


Extra Credit

More Grunt! 

Incorprate images in your shortened links
 * [ ] Find an image used on the site of the original url and use that instead of an icon (hint: use a regular expression or a [parser](http://stackoverflow.com/questions/7977945/html-parser-on-nodejs) to analyze the document)

Serve your pre-compiled JS files from a CDN:
 * [ ] Save your pre-compiled/processed JS files on [Azure's](http://www.windowsazure.com/en-us/documentation/articles/cdn-how-to-use/) content delivery network
 * [ ] Be sure to correctly reference your pre-compiled JS from your application - Hint: this is another development vs production environment issue

Use another service
 * [ ] deploy your site to another service (Heroku, AWS)

 TODO:// azure cdn--does it autoexpire files that you've updated?


 Nightmare Mode:

 * [ ] how to push latest build to cdn
 * [ ] how to store the correct paths in your index.html
 * [ ] how to version your cdn build 
 * [ ] Store saved images in the CDN (this might be very difficult)



TODO: remove this
Precompile your handlebars templates and load them up using a single script tag:
 * [ ] Write a script that precompiles your templates

Done in canonical version:
- Precompile your handlebars templates and load them up using a single script tag:
 * [ ] Write a script that precompiles your templates

Removed bcuz not important
 * [ ] Stop using ejs entirely - use one templating system
 * [ ] Figure out a strategy to load your precompiled templates on the client
