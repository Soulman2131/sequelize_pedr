//
//On va faire comme createComment pour le createPost pour lui accorder le AUTHTOKEN

const { Posts, Likes } = require('../models');

//CREATE POST
exports.createPost = async (req, res, next) => {
  try {
    const post = req.body;
    post.username = req.user.username;
    await Posts.create(post);
    if (!post) {
      return res.status(400).json({ msg: 'Erreur' });
    }
    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

//GET ALL
exports.getPosts = async (req, res, next) => {
  const fields = req.query.fields;
  const limit = parseInt(req.query.limit);
  const offset = parseInt(req.query.offset);
  const order = req.query.order;
  try {
    const posts = await Posts.findAll({
      order: [order != null ? order.split(':') : ['id', 'DESC']],
      attributes: fields !== '*' && fields != null ? fields.split(',') : null,
      limit: !isNaN(limit) ? limit : null,
      offset: !isNaN(offset) ? offset : null,
      include: [Likes]
    });
    const likes = await Likes.findAll({ where: { UserId: req.user.id } });
    res.status(200).json({ count: posts.length, posts: posts, likes: likes });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

//GET SINGLE
exports.getPost = async (req, res, next) => {
  try {
    // const post = await Posts.findOne({ where: { id: req.params.id } });
    const post = await Posts.findByPk(req.params.id);
    if (!post) {
      return res
        .status(400)
        .json({ error: `Pas d'utilisateur trouvé avec l'id ${req.params.id} ` });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json(error);
  }
};

//UPDATE POST
exports.updatePost = async (req, res, next) => {
  try {
    const post = await Posts.update({ ...req.body }, { where: { id: req.params.id } });
    if (!post) {
      return res
        .status(400)
        .json({ error: `Pas d'utilisateur trouvé avec l'id ${req.params.id} ` });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json(error);
  }
};

//DELETE POST
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Posts.destroy({ where: { id: req.params.id } });
    if (!post) {
      return res
        .status(400)
        .json({ error: `Pas d'utilisateur trouvé avec l'id ${req.params.id} ` });
    }
    res.status(200).json({ msg: 'Supprimé...' });
  } catch (error) {
    res.status(400).json(error);
  }
};
