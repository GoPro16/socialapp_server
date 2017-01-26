"use strict"

module.exports = function(sequelize,DataTypes){
	var Post = sequelize.define('Post',{
		time: DataTypes.DATE
	},{
		classMethods: {
			//associated with userid
			associate: function(models) {
        		Post.belongsTo(models.User,{foreignKey:'username'});
        		Post.hasMany(models.Media);
        		Post.hasMany(models.Content);
        	}
		},
		tableName: 'posts'
	});

	return Post;
}

