Shortly: Deployment
==============

In this sprint, you will learn about deployment and various build tools. The tools and techniques you gain experience with here will allow you to kick off your group project with a bang.

### Orientation

We're giving you a canonical version of the Shortly-express repo to start with. Before diving in, do a code review. Take a few minutes with your partner and compare this canonical repo to your work from the last sprint. How was your app architected differently? Could your code be DRYer, or was it well organized? Are there any functional differences between your apps and this one? You can often learn as much from reading code as you can from writing it.

### Tests

You will find all tests are in pending state. They are all written for MongoDB. Before starting on your mongo refactor, remove 'x' from each `describe` block.

### Basic requirements

#### Get your code ready for deployment

 * [ ] Liberate your repo

#### Set up a server using Azure

 * [ ] Use the Azure command line tools to provision and configure a 'production' server

#### Reconfigure your app to work in both evironments

 * [ ] Inject any production configuration dependencies

#### Deploy

 * [ ] Deploy your code to Azure!
 * [ ] Read about [how to use node modules](http://www.windowsazure.com/en-us/documentation/articles/nodejs-use-node-modules-windows-azure-apps/) with Azure. Make any necessary changes.

#### Create a Gruntfile:

**Note:** Building and deploying an app involves a number of important tasks that need to be performed in a certain order. When you're trying to rapidly prototype your app, this can become repetitive and is prone to error. Grunt is a super useful tool that can automate a wide variety of tasks for you. Let Grunt do the work!

 * [ ] Use [Grunt](http://gruntjs.com/) to create a build script
 * [ ] Concatenate files before deployment
 * [ ] Uglify your code using Grunt before deployment -- Don't forget to update your views to point to the minified versions of your asset files (CSS, JS)
 * [ ] Run jshint before deployment -- if jshint fails, the build process should exit
 * [ ] Run your Mocha tests before deployment -- if any tests fail, the build process should exit

When you're done, you will have programmed a hierarchy of tasks that can be run with a single command. Run `grunt deploy` to build and host your app on a local dev server, and run `grunt deploy --prod` when you're ready to push up to the production server

#### Refactor your database

In the previous sprint, our shortened links were stored using sqlite, a server-less database engine. Sqlite is great for development, but it's not well suited for well-trafficked production sites for [various reasons](http://stackoverflow.com/questions/913067/sqlite-as-a-production-database-for-a-low-traffic-site).

  * [ ] Refactor the app to use MongoDB/Mongoose, and run it locally
  * [ ] Host a Mongo instance on [Azure](http://www.windowsazure.com/en-us/documentation/articles/store-mongolab-web-sites-nodejs-store-data-mongodb/). *** Note: see below for help with this ****
  * [ ] Refactor your database code to handle both enviroments--if you're running the app locally, it should connect to a local database, and when you navigate to your deployed site, it should connect to your hosted Mongo instance

### Extra Credit

#### Refactor `server.js` to use promises

  * [ ] Several routes in the server use nested callbacks. Refactor them all to use promises. Consider using [Bluebird](https://github.com/petkaantonov/bluebird), a popular and performant promise library.

#### Serve your pre-compiled JS files from a CDN:

 * [ ] Save your pre-compiled/processed JS files on [Azure's](http://www.windowsazure.com/en-us/documentation/articles/cdn-how-to-use/) content delivery network
 * [ ] Be sure to correctly reference your pre-compiled JS from your application - Hint: this is another development vs production environment issue

### Nightmare Mode

  * [ ] Figure out how to push your latest build to the CDN
  * [ ] Refactor all HTML & templates to use correct paths to the CDN
  * [ ] Version your CDN build & manage [expiration](http://msdn.microsoft.com/en-us/library/gg680306.aspx)  of the files you store

### Other Challenges

#### Incorprate images in your shortened links

  * [ ] Find an image used on the site of the original url and use that instead of the generic icon (hint: use a regular expression or a [parser](http://stackoverflow.com/questions/7977945/html-parser-on-nodejs) to analyze the HTML document). How will you store this new information?
  * [ ] Store saved images in the CDN (this might be very difficult)

#### Use another cloud service

 * [ ] Deploy your site to another service (Heroku, AWS)

### Azure Help

- Setting up MongoDB: In order to use Mongo on Azure, you'll need to add the MongoLab add-on to your account. Follow these steps:
 1. Select your email address in the upper right corner, then choose “View my bill”
 2. Click “Add subscription”
 3. Select “Pay as you go”
 4. Enter in your credit card, etc. **IF YOU FOLLOW THESE STEPS YOU WILL NOT BE CHARGED**
 5. Go back to the Management Portal and select "Subscriptions" on
the top right, then check the "Pay-as-you-go" box.
 6. Return to the portal and select the Sandbox version of MongoLab.
 7. In the Subscription dropdown box, select the “Pay-as-you-go” subscription you just created.
 8. Back in the Azure portal, navigate to Add-Ons to search for and add MongoLab
