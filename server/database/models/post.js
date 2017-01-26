"use strict"

module.exports = function(sequelize,DataTypes){
	var Post = sequelize.define('Post',{
		time: DataTypes.DATE
	},{
		classMethods: {
			//associated with userid
			associate: function(models) {
        		Post.belongsTo(models.User,{foreignKey:'username'});
        	}
		},
		tableName: 'posts'
	});

	return Post;
}

