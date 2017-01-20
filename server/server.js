var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var models = require("./database/models");
var validateRequest = require('./middleware/validateRequest');

models.sequelize.authenticate().then(function(err){
	console.log('Connection established with DB');
},function(err){
	console.log('Unable to connect to DB');
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set("view engine","ejs");


app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

//ROUTES
app.use('/', require('./routes/routes'));
app.use(express.static(__dirname+"/public"));//for stylesheet



models.sequelize.sync({force: false}).then(function () {
  var server = app.listen(3000, function() {
    console.log('Express server listening');
  });
});
