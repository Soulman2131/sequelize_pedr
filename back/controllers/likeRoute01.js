//
//On rajoute le req.user = validToken dans le chap12 && on l'introduit ensuite (req.user) dans le controller Like dans const UserId = req.user.id. Et biensur le id vient du LOGIN (id: user.id)
//Pour vérifier le controller du Like sur POSTMAN, le UserId sera le BEARER && le PostId sera le body

const { Likes } = require("../models");

exports.like = async (req, res, next) => {
	const { PostId } = req.body;
	const UserId = req.user.id; /* Le user.id vient du LOGIN du AUTHCTRL02 P43*/

	try {
		const found = await Likes.findOne({ where: { PostId: PostId, UserId: UserId } });
		if (!found) {
			await Likes.create({
				PostId: PostId,
				UserId: UserId
			});
			return res.status(200).json({ message: "Liked" });
		} else {
			await Likes.destroy({ where: { PostId: PostId, UserId: UserId } });
		}
		return res.status(200).json({ message: "unLiked" });
	} catch (error) {
		res.status(400).json(error);
	}
};
