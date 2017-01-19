"use strict"
var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize,DataTypes){
	var User = sequelize.define('User',{
		username: DataTypes.STRING,
		hash:{
			type:DataTypes.STRING,
			set:function(v){
				var pw = bcrypt.hashSync(v);
				return this.setDataValue('hash',pw);
			}
		}
	},{
		classMethods: {
			associate: function(models) {
        	}
		},
		tableName: 'users'
	});

	return User;
}

