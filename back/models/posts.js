'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Posts.hasMany(models.Comments, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      models.Posts.hasMany(models.Likes, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Posts.init(
    {
      title: DataTypes.STRING,
      postText: DataTypes.STRING,
      username: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Posts'
    }
  );
  return Posts;
};
