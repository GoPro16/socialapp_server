"use strict"

module.exports = function(sequelize,DataTypes){
	var Star = sequelize.define('Star',{
	},{
		classMethods: {
			//associated with userid
			associate: function(models) {
        		Star.belongsTo(models.Post);
        		Star.belongsTo(models.User);
      		}
		},
		tableName: 'stars'
	});

	return Star;
}

