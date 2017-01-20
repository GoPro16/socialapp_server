"use strict"

module.exports = function(sequelize,DataTypes){
	var Comment = sequelize.define('Comment',{
		content : DataTypes.STRING,
		time : DataTypes.DATE
	},{
		classMethods: {
			//associated with userid
			associate: function(models) {
        		Comment.belongsTo(models.User,{foreignKey:'user'});
        		Comment.belongsTo(models.Post,{foreignKey:'post'});
      		}
		},
		tableName: 'comments'
	});

	return Comment;
}

