"use strict"

module.exports = function(sequelize,DataTypes){
	var Content = sequelize.define('Content',{
		content:DataTypes.STRING
	},{
		classMethods: {
			//associated with userid
			associate: function(models) {
        		Content.belongsTo(models.Post);
      		}
		},
		tableName: 'content'
	});

	return Content;
}

