"use strict"

module.exports = function(sequelize,DataTypes){
	var Connection = sequelize.define('Connection',{
	},{
		classMethods: {
			//associated with userid
			associate: function(models) {
        		Connection.belongsTo(models.User,{foreignKey:'user'});
        		Connection.belongsTo(models.User,{foreignKey:'following'});
      		}
		},
		tableName: 'connections'
	});

	return Connection;
}

