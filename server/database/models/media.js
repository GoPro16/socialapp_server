"use strict"

module.exports = function(sequelize,DataTypes){
	var Media = sequelize.define('Media',{
		link:DataTypes.STRING
	},{
		classMethods: {
			//associated with userid
			associate: function(models) {
        		Media.belongsTo(models.Post,{foreignKey:'post'});
      		}
		},
		tableName: 'media'
	});

	return Media;
}

