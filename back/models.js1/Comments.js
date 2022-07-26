module.exports = (sequelize, DataTypes) => {
	const Commentss = sequelize.define("Commentss", {
		CommentsBody: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});

	return Commentss;
};

////
("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Comments extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here

			models.Comments.belongsTo(models.Posts);
		}
	}
	Comments.init(
		{
			CommentBody: {
				type: DataTypes.STRING,
				allowNull: false
			}
		},
		{
			sequelize,
			modelName: "Comments"
		}
	);
	return Comments;
};
