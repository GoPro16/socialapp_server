var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var models = require("./database/models");

models.sequelize.authenticate().then(function(err){
	console.log('Connection established with DB');
},function(err){
	console.log('Unable to connect to DB');
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

//ROUTES
app.use('/', require('./routes/routes'));
app.use(express.static(__dirname+"/public"));//for stylesheet


models.sequelize.sync({force: false}).then(function () {
  var server = app.listen(3000, function() {
    console.log('Express server listening');
  });
});