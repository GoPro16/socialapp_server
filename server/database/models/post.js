"use strict"

module.exports = function(sequelize,DataTypes){
	var Post = sequelize.define('Post',{
		time: DataTypes.DATE
	},{
		classMethods: {
			//associated with userid
			associate: function(models) {
        		Post.belongsTo(models.User);
        		Post.hasMany(models.Content);
        		Post.hasMany(models.Media);
        		Post.hasMany(models.Comment);
        		Post.hasMany(models.Star);
        	}
		},
		tableName: 'posts'
	});

	return Post;
}

