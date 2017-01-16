"use strict"

module.exports = function(sequelize,DataTypes){
	var User = sequelize.define('User',{
		username: DataTypes.STRING,
		hash : DataTypes.STRING
	},{
		classMethods: {
			associate: function(models) {
        	}
		},
		tableName: 'users'
	});

	return User;
}

