var express = require('express');

require('dotenv').config();

var path = require('path');
var app = express();
var ejsLayouts = require('express-ejs-layouts');
var multer = require('multer');
// referencing the uploads folder
var upload = multer({dest: "./uploads/"})
var cloud = require('cloudinary');

var port = process.env.PORT || 2000;

// app.use(express.static(path.join(__dirname, 'static')));

app.set('view engine', 'ejs');
app.use(ejsLayouts);

var images = [];

app.get('/', function(req, res) {
	res.render('index', {arr: images, cloud});
});

app.get('/upload', function(req, res) {
	res.render('upload');
});

// 'myFile' references the name attribute in the form 
app.post('/upload', upload.single('myFile'), function(req, res) {
  console.log('post route hit!');
  cloud.uploader.upload(req.file.path, function(result) {
    images.push(result.public_id);
    res.redirect('/');
  });
});

app.listen(port, function() {
	console.log('Server is running on port 3000');
});