"use strict"

module.exports = function(sequelize,DataTypes){
	var Comment = sequelize.define('Comment',{
		time : DataTypes.DATE,
		content : DataTypes.STRING
	},{
		classMethods: {
			//associated with userid
			associate: function(models) {
        		Comment.belongsTo(models.Post,{foreignKey:'post'});
      		}
		},
		tableName: 'comments'
	});

	return Comment;
}

