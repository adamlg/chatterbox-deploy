shortly-deploy
==============

In this sprint, you will learn about deployment and various build tools. The tools and techniques you gain experience with here will allow you to kick off your group project with a bang.

Orientation
===========

We're giving you a canonical version of the Shortly-express repo to start with. Before diving in, do a code review. Take a few minutes with your partner and compare this canonical repo to your work from the last sprint. How was your app architected differently? Could your code be DRYer, or was it well organized? Are there any functional differences between the apps? You can often learn as much from reading code as you can from writing it.

Basic requirements
====================

Get your code ready for deployment
 * [ ] Liberate your repo

Set up a server with Azure:
 * [ ] Use the Azure command line tools to provision and configure a 'production' server

Reconfigure your app to work in both evironments
 * [ ] Inject any production configuration dependencies 

Deploy
 * [ ] Deploy your code to Azure!
 * [ ] Read about [how to use node modules](http://www.windowsazure.com/en-us/documentation/articles/nodejs-use-node-modules-windows-azure-apps/) with Azure. Make any necessary changes. 

Create a Gruntfile 
 * [ ] Use [Grunt](http://gruntjs.com/) to create a build script
 * [ ] Uglify your code using Grunt before deployment
 * [ ] Concatenate files before deployment
 * [ ] Run jshint before deployment -- if jshint fails, the build process should exit
 * [ ] Run your Mocha tests before deployment -- if any tests fail, the build process should exit

Refactor your database 
In the previous sprint, our shortened links were stored using sqlite, a server-less database engine. Sqlite is great for development, but it's not well suited for well-trafficked production sites for [various reasons](http://stackoverflow.com/questions/913067/sqlite-as-a-production-database-for-a-low-traffic-site).
* [ ] Refactor the app to use MongoDB/Mongoose, and run it locally
* [ ] Host a Mongo instance on [Azure](http://www.windowsazure.com/en-us/documentation/articles/store-mongolab-web-sites-nodejs-store-data-mongodb/). *** Note: if you receive an error when trying to add MongoLab to your project, read the guide below ****
* [ ] Refactor your database code to handle both enviroments--if you're running the app locally, it should connect to a local database, and when you navigate to your deployed site, it should connect to your hosted Mongo instance


Extra Credit
=====================

Use promises.
* [ ] Several routes in the server use nested callbacks. Refactor them all to use promises. Consider using[Bluebird](https://github.com/petkaantonov/bluebird), a popular and performant promise library.

Incorprate images in your shortened links
 * [ ] Find an image used on the site of the original url and use that instead of an icon (hint: use a regular expression or a [parser](http://stackoverflow.com/questions/7977945/html-parser-on-nodejs) to analyze the document)

Serve your pre-compiled JS files from a CDN:
 * [ ] Save your pre-compiled/processed JS files on [Azure's](http://www.windowsazure.com/en-us/documentation/articles/cdn-how-to-use/) content delivery network
 * [ ] Be sure to correctly reference your pre-compiled JS from your application - Hint: this is another development vs production environment issue

Use another service
 * [ ] Deploy your site to another service (Heroku, AWS)

 Nightmare Mode
 =======================

 * [ ] Figure out how to push your latest build to the CDN
 * [ ] Refactor all HTML & templates to use correct paths to the CDN
 * [ ] Version your CDN build & manage [expiration](http://msdn.microsoft.com/en-us/library/gg680306.aspx) of the files you store
 * [ ] Store saved images in the CDN (this might be very difficult)
