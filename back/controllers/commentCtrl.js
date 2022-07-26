//
//Dans le GET COMMENTS, on va que le PostId soit égal au req.params.id

const { Comments } = require("../models");

//CREATE COMMENT

//GET COMMENTS
exports.getComment = async (req, res, next) => {
	try {
		const id = req.params.id;
		const comment = await Comments.findAll({
			where: { PostId: id }
		});

		res.json(comment);
	} catch (error) {
		res.status(400).json(error);
	}
};

//CREATE COMMENT
exports.addComment = async (req, res, next) => {
	try {
		const comment = req.body;
		/* On introduit le username du user pour le Front qui vient du AUTH/MIDDLEWARE: c'est l'association */
		const username = req.user.username;
		comment.username = username;
		await Comments.create(comment);
		if (!comment) {
			return res.status(400).json({ msg: "Erreur" });
		}

		res.status(201).json(comment);
	} catch (error) {
		res.status(400).json(error);
	}
};

//DELETE COMMENT
exports.deleteComment = async (req, res, next) => {
	const id = req.params.id;
	await Comments.destroy({ where: { id: id } });
	res.status(200).json("DELETED...");
};
