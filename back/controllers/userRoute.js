//

const { Users } = require('../models');

//GET SINGLE USER
exports.getUser = async (req, res, next) => {
  try {
    const user = await Users.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
    if (!user) {
      return res
        .status(400)
        .json({ error: `Pas d'utilisateur trouvé avec l'id ${req.params.id} ` });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};
