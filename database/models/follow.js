"use strict"

module.exports = function(sequelize,DataTypes){
	var Follow = sequelize.define('Follow',{
	},{
		classMethods: {
			//associated with userid
			associate: function(models) {
        		Follow.belongsTo(models.User,{foreignKey:'follower'});
        		Follow.belongsTo(models.User,{foreignKey:'following'});
      		}
		},
		tableName: 'friendships'
	});

	return Follow;
}

