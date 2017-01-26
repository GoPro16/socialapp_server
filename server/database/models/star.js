"use strict"

module.exports = function(sequelize,DataTypes){
	var Star = sequelize.define('Star',{
	},{
		classMethods: {
			//associated with userid
			associate: function(models) {
        		Star.belongsTo(models.Post,{foreignKey:'post'});
        		Star.belongsTo(models.User,{foreignKey:'user'});
      		}
		},
		tableName: 'stars'
	});

	return Star;
}

