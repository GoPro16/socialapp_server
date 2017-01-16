"use strict"

module.exports = function(sequelize,DataTypes){
	var Post = sequelize.define('Post',{
		content: DataTypes.STRING,
		time: DataTypes.DATE
	},{
		classMethods: {
			//associated with userid
			associate: function(models) {
        		Post.belongsTo(models.User,{foreignKey:'user'});
        	}
		},
		tableName: 'posts'
	});

	return Post;
}

