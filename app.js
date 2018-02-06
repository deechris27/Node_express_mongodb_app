var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var mongojs = require('mongojs');
var db = mongojs('customerapp', ['users']);

var app = express();

/* var logger = function(req, res, next){
	console.log('Logging...');
	next();
}

app.use(logger); */

//view engine

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Set static path

app.use(express.static(path.join(__dirname, 'public')));

//Global variables
app.use(function(req, res, next){
   res.locals.errors = null;
   next();
});

//Express validator middleware
app.use(expressValidator({
   errorFormatter: function(param, msg, value){
   	var namespace = param.split('.');
   	global = namespace.shift();
   	formParam = global;

   	while(namespace.length){
   		formParam += '[' + namespace.shift() + ']';
   	}

   	return{
   		param : formParam,
   		msg: msg,
   		value : value
   	};
   }
}));

 /* var users = [
 {
     id: 1,
     first_name: 'Deepak',
     last_name: 'Dee',
     email: 'dee@gmail.com'
 },

 {
      id: 2,
      first_name: 'Shy',
      last_name: 'Dee',
      email: 'shy@gmail.com'
 },

 {
      id: 3,
      first_name: 'fui',
      last_name: 'Dee',
      email: 'fui@gmail.com'
 }

]; */


app.get('/', function(req, res){
	db.users.find(function(err, docs){
         res.render('index', {title: 'customers', users:docs});
	});
   
});

app.post('/users/add', function(req,res){

	req.checkBody('first_name','First name is required').notEmpty();
	req.checkBody('last_name', 'Last Name is required').notEmpty();
	req.checkBody('email', 'Email ID is required').notEmpty();

     var errors = req.validationErrors();

     if(errors){
          res.render('index', {
          	title: 'Customers',
          	users: users,
          	errors: errors
          });
     }else{
     	var newUser = {
       first_name: req.body.first_name,
       last_name : req.body.last_name,
       email_ID : req.body.email
   }

      console.log('success');

     } //end of else

});

app.listen(3000, function(){
	console.log('Server is now listening to port 3000');
});