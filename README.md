shortly-deploy
==============

Basic Requirements

- Precompile your handlebars templates and load them up using a single script tag:
 * [ ] Write a script that precompiles your templates
 * [ ] Stop using ejs entirely - use one templating system
 * [ ] Figure out a strategy to load your precompiled templates on the client

Setup a 2nd environment:
 * [ ] Use the Azure command line tools to provision and configure a 'production' server

Refactor to support Two Environments
The production server will have a differet configuration than your development environment; for example, passwords for your database server will be different.
 * [ ] Refactor your app's configuration code to be more modular so that configuration dependencies can be injected at start time
 * [ ] Don't break your development environment in the process! Also don't change your development environment to look like Azure.

Get your code ready for deployment
 * [ ] Liberate your repo

Deploy your code
 * [ ] Use Grunt to create a deployment script
 * [ ] Deploy your code to Azure

Extra Credit

More Grunt! 
 * [ ] Automate your pre-compile step - refactor your compile script to use Grunt
 * [ ] Add uglify and minify steps to your deployment process
 * [ ] Run the deployment pre-processing steps on the remote server instead of locally

Serve your pre-compiled JS files from a CDN:
 * [ ] Save your pre-compiled/processed JS files on Azure's content delivery network
 * [ ] Be sure to correctly reference your pre-compiled JS from your application - Hint: this is another development vs production environment issue. 

Incorprate images in your shortened links
 * [ ] Find an image used on the site of the original url and use that instead of an icon (hint: use a regular expression or a [parser](http://stackoverflow.com/questions/7977945/html-parser-on-nodejs) to analyze the document)
 * [ ] Store saved images in the CDN

Use another service
 * [ ] deploy your site to another service (Heroku, AWS)
