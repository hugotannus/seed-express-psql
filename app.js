var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var alunosRouter = require('./routes/alunos');
var usersRouter = require('./routes/users');
var httpMethodOverrider = require('./middlewares/http-method-overrider');

var app = express();

// https://github.com/expressjs/method-override?tab=readme-ov-file#custom-logic
app.use(bodyParser.urlencoded());

// Custom Middlewares
app.use(httpMethodOverrider);  // TODO: Criar testes para este middleware

// view engine setup
// https://github.com/ericf/express-handlebars?tab=readme-ov-file#extnamehandlebars
var { create } = require('express-handlebars');
var hbs =  create({ extname: '.hbs' })

app.engine('hbs', hbs.engine);
app.set('views', './views');
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/alunos', alunosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
