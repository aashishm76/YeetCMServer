var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect("mongodb://BrettNH:#Samus6597@cop-4331-api-shard-00-00-d2e8i.mongodb.net:27017,cop-4331-api-shard-00-01-d2e8i.mongodb.net:27017,cop-4331-api-shard-00-02-d2e8i.mongodb.net:27017/test?ssl=true&replicaSet=COP-4331-API-shard-0&authSource=admin&retryWrites=true", { useNewUrlParser: true	});

require('./models/contact');
require('./models/user');

var contactRouter = require('./routes/contacts');
var userRouter = require('./routes/user');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes which should handle requests
app.use('/user', userRouter);
app.use('/contacts', contactRouter);

app.use((req, res, next) =>{
	const error = new Error('Not found');
	error.status = 404;
	next(error);
})

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	})
});

module.exports = app;