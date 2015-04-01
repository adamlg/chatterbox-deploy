Shortly: Deployment
==============

In this sprint, you will learn about deployment and various build tools. The tools and techniques you gain experience with here will allow you to kick off your group project with a bang.

## Orientation

We're giving you a canonical version of the Shortly-express repo to start with. Before diving in, do a code review. Take a few minutes with your partner and compare this canonical repo to your work from the last sprint. How was your app architected differently? Could your code be DRYer, or was it well organized? Are there any functional differences between your apps and this one? You can often learn as much from reading code as you can from writing it.


## Basic requirements

### Check out the Heroku tutorials
 * [ ] Create a free account at Heroku and [try out the deployment tutorial](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)

### Reconfigure your app to work in both environments (locally and in production)

 * [ ] Change your port number in shortly.js to 'process.env.PORT || 3468'. This will use either Heroku's default port number when it's deployed, or port 3468 if that doesn't exist.

## Create a Gruntfile:

**Note:** Building and deploying an app involves a number of important tasks that need to be performed in a certain order. When you're trying to rapidly prototype your app, this can become repetitive and is prone to error. Grunt is a super useful tool that can automate a wide variety of tasks for you. Still not convinced? Read [this](http://24ways.org/2013/grunt-is-not-weird-and-hard/) article about the advantages of using Grunt. Let Grunt do the work!

 * [ ] Use [Grunt](http://gruntjs.com/) to create a build script
 * [ ] Concatenate files before deployment
 * [ ] Uglify your code using Grunt before deployment -- Don't forget to update your views to point to the minified versions of your asset files in the public/dist folder (CSS, JS). The folder public/dist is already .gitignored for you, but make sure that you aren't committing your compiled scripts and CSS to your Github repo.
 * [ ] Run jshint before deployment -- if jshint fails, the build process should exit
 * [ ] Run your Mocha tests before deployment -- if any tests fail, the build process should exit

When you're done, you will have programmed a hierarchy of tasks that can be run with a single command. Run `grunt deploy` to build and host your app on a local dev server, and run `grunt deploy --prod` when you're ready to push up to the production server


## Extra Credit

## Refactor your database

In the previous sprint, our shortened links were stored using sqlite, a server-less database engine. Sqlite is great for development, but it's not well suited for well-trafficked production sites for [various reasons](http://stackoverflow.com/questions/913067/sqlite-as-a-production-database-for-a-low-traffic-site). You will find all tests are in pending state. They are all written for MongoDB. Before starting on your mongo refactor, remove 'x' from each `describe` block.

  * [ ] Refactor the app to use MongoDB/Mongoose, and run it locally. A lot of the code written in Shortly-Angular can be used in this sprint. 
  * [ ] Normally you would need to go to MongoLab to setup a free MongoDB account, but that requires a credit card to signup. Use this link as your database `mongodb://home:test@ds059821.mongolab.com:59821/heroku_app35427496`
  * [ ] Refactor your database code to handle both environments--if you're running the app locally, it should connect to a local database, and when you navigate to your deployed site, it should connect to your hosted Mongo instance


### Refactor `server.js` to use promises

  * [ ] Several routes in the server use nested callbacks. Refactor them all to use promises. Consider using [Bluebird](https://github.com/petkaantonov/bluebird), a popular and performant promise library.

### Use Grunt to deploy your concatenated and minified project onto Heroku
 * [ ] Follow the instructions on [here] (https://github.com/mbuchetics/heroku-buildpack-nodejs-grunt) to get your Heroku server to recognize and run your Grunt files. 

### Nightmare Mode

  * [ ] Figure out how to push your latest build to the CDN
  * [ ] Refactor all HTML & templates to use correct paths to the CDN
  * [ ] Version your CDN build & manage [expiration](http://msdn.microsoft.com/en-us/library/gg680306.aspx)  of the files you store

### Other Challenges

### Incorporate images in your shortened links

  * [ ] Find an image used on the site of the original url and use that instead of the generic icon (hint: use a regular expression or a [parser](http://stackoverflow.com/questions/7977945/html-parser-on-nodejs) to analyze the HTML document). How will you store this new information?
  * [ ] Store saved images in the CDN (this might be very difficult)

### Use another cloud service

 * [ ] Deploy your site to another service such as AWS. AWS has a staffed (both with food and with people!) [popup location](https://aws.amazon.com/blogs/aws/aws-popup-loft-in-san-francisco/) that is open to the public. Their staff will help you with your AWS deployment if needed.  
