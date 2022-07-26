//
//On modifie le message en true/false

const { Likes } = require("../models");

exports.like = async (req, res, next) => {
	const { PostId } = req.body;
	const UserId = req.user.id;

	try {
		const found = await Likes.findOne({ where: { PostId: PostId, UserId: UserId } });
		if (!found) {
			await Likes.create({
				PostId: PostId,
				UserId: UserId
			});
			return res.status(200).json({ message: true });
		} else {
			await Likes.destroy({ where: { PostId: PostId, UserId: UserId } });
		}
		return res.status(200).json({ message: false });
	} catch (error) {
		res.status(400).json(error);
	}
};
