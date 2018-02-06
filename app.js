var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

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

var users = [
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

];


app.get('/', function(req, res){
   res.render('index', {title: 'customers', users:users});
});



app.listen(3000, function(){
	console.log('Server is now listening to port 3000');
});