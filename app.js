var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http= require("http");

var routes = require('./routes/index');
var users = require('./routes/users');
var blogInter = require('./routes/blog_interface');
var emberInter = require('./routes/ember_interface');
var entry=require('./routes/entry');
var session = require('express-session');

// var column=require('./routes/column');
var app = express();
app.use(session({
    secret: 'ember_api',
    cookie: {
        maxAge: 1000 * 60 * 30
    }
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.use('/', routes);
app.use('/users', users);
app.use('/blog_interface', blogInter);
app.use('/ember_interface', emberInter);
app.use('/entry',entry);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// http.createServer(app).listen('8089',function(){
//   console.log("server start at port 8089!")
// })
app.listen('8089',function(){
  console.log("server start at port 8089!");
  console.log("------------------------------------------");
})
console.log("restart at:"+new Date())
module.exports = app;
