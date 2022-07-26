//
//On fait la route du CHANGE PASSWORD && il ressemble au LOGIN
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');

//REGISTER
exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    bcrypt
      .hash(password, 10)
      .then(hash => {
        const user = {
          username: username,
          password: hash
        };

        Users.create(user);
        res.status(201).json(user);
      })
      .catch(error => res.status(400).json(error));
  } catch (error) {
    res.status(400).json(error);
  }
};

//LOGIN
exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(200).json({ error: 'Veuillez renseigner un utilisateur et un mot de passe' });
  try {
    const user = await Users.findOne({ where: { username: username } });
    if (!user) return res.status(200).json({ error: "User doesn't exists" });
    bcrypt.compare(password, user.password).then(match => {
      if (!match) return res.status(200).json({ error: ' Password wrong ' });

      //JWT
      const accessToken = sign({ username: user.username, id: user.id }, 'importantsecret');

      // res.status(200).json(accessToken);
      res.status(200).json({ token: accessToken, username: username, id: user.id });
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

//AUTH AN USER
exports.authUser = (req, res, next) => {
  res.json(req.user);
};

//CHANGE PASSWORD
exports.changePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const user = await Users.findOne({ where: { username: req.user.username } });

  bcrypt.compare(oldPassword, user.password).then(async match => {
    if (!match) res.json({ error: 'Wrong Password Entered!' });

    bcrypt.hash(newPassword, 10).then(hash => {
      Users.update({ password: hash }, { where: { username: req.user.username } });
      res.json('SUCCESS');
    });
  });
};
