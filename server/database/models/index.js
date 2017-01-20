"use strict"

var Sequelize = require("sequelize");
var fs        = require("fs");
var path      = require("path");

var sequelize = new Sequelize('codename_rooster', 'farmer', 'USF>UNF', {
    host: 'danek.me',
    port: 3306,
    dialect: 'mysql',
    native: true,
    freezeTableName: true,
    define: {
        timestamps: false
    },
    pool: {
        max: 9,
        min: 0,
        idle: 10000
    }
});


var db = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize["import"](path.join(__dirname, file));
        db[model.name] = model;
    });



Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;