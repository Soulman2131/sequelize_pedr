//
//On met res.status(200) au lieu de 400 pour faire jouer le FRONT & notmt P0ST03.JS
//On rajoute le req.user = validToken dans le chap12 && on l'introduit ensuite (req.user) dans le controller Like dans const UserId = req.user.id. Et biensur le id vient du LOGIN (id: user.id)

const { verify } = require("jsonwebtoken");

const authToken = (req, res, next) => {
	/* Ce "accessToken" du REQ.HEADER provient du LOGIN du FRONT notmt du SessionStorage*/
	const accessToken = req.header("accessToken");

	if (!accessToken) return res.json({ error: "User not logged in" });
	try {
		const decodedToken = verify(accessToken, "importantsecret");
		/**Pour faire sortir le nom du user et qui va aider au Front */
		req.user = decodedToken;
		if (decodedToken) return next();
	} catch (error) {
		return res.json(error);
	}
};
module.exports = { authToken };
