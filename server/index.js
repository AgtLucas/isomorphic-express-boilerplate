var
  express = require('express'),
  app = express(),
  logger = require('bunyan-request-logger'),
  noCache = require('connect-cache-control');

var
  log = logger(),
  pubPath = __dirname + '/../public';

// Expose the logger so that requiring modules can
// use it.
app.log = log;

// Automatically log all incoming requests with
// response data and request ids.
app.use( log.requestLogger() );

// Route to handle client side log messages.
//
// This route prepends the cache-control
// middleware so that the browser always logs
// to the server instead of fetching a useless
// OK message from its cache.
// 
// Using a 1x1 transparent gif allows you to
// use the logger in emails or embed the tracking
// pixel on third party sites without resorting
// to JavaScript.
app.get( '/log.gif', noCache, log.route() );

app.get( '/', express.static(pubPath) );

module.exports = app;
