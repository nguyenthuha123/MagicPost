var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/category'); 
var instructionRouter = require('./routes/instruction'); 
var deliveryRouter = require('./routes/delivery'); 
var authRouter = require('./routes/auth');

var app = express();
//SESSION 
var session = require('express-session');
//set session timeout
const timeout = 1000000 * 60 * 60 * 24;
//config session middleware
app.use(session({
  secret: "alien_is_existed_or_not_it_is_still_a_secret", 
  saveUninitialized: false,
  cookie: {maxAge: timeout}, 
  resave: false
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// const{checkSingleSession} = require('./middleware/auth');
// app.use('/category', checkSingleSession); 
  //make session value avaiable in view/ MUST put BEFORE ROUTER URL
  app.use((req, res, next) =>{
    res.locals.username = req.session.username; 
    res.locals.role = req.session.role; 
    next();
  });
  

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category', categoryRouter); 
app.use('/instruction', instructionRouter); 
app.use('/delivery', deliveryRouter);
app.use('/auth', authRouter );

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//1. config database
var monggoose = require('mongoose'); 
var database = "mongodb://127.0.0.1:27017/MagicPost1";
monggoose.connect(database)
.then(() => console.log('connect to database succeed'))
.catch((err)=> console.log('connect to database fail.Error: ' +err))


//cau hinh parser(get data from client-side)
var bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({extended: false})); 
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
