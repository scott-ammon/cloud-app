var express = require('express');
require('dotenv').config();

var path = require('path');
var app = express();
var ejsLayouts = require('express-ejs-layouts');

var port = process.env.PORT || 2000;

app.use(express.static(path.join(__dirname, 'static')));

app.set('view engine', 'ejs');
app.use(ejsLayouts);


app.get('/', function(req, res) {
	res.render('index');
});

app.get('/upload', function(req, res) {
	res.render('upload');
});

app.post('/upload', function(req, res) {
  console.log('post route hit!');
});

app.listen(port, function() {
	console.log('Server is running on port 3000');
});