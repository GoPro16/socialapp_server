"use strict"
var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize,DataTypes){
	var User = sequelize.define('User',{
		username: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		email: DataTypes.STRING,
		firstName: DataTypes.STRING,
		lastName: DataTypes.STRING,
		birthday: DataTypes.DATE,
		dateJoined: DataTypes.DATE,
		overallRating: DataTypes.NUMERIC(12,2),
		slogan: DataTypes.STRING,
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
				User.hasMany(models.Post);
				User.belongsToMany(models.User,{through:'connections',as:'follower'});
        	}
		},
		tableName: 'users'
	});

	return User;
}

