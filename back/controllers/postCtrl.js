//
//On rajoute le UserId suite à la creattion & le ALTER TABLE de UserId dans le Model USER & le WorkBench de Post
//On fait également le UPDATE DU POST title && POST text (ATTENTION on n'a pas la route en ":/ "ici)

const { Posts, Likes } = require('../models');

//CREATE POST
exports.createPost = async (req, res, next) => {
  try {
    const post = req.body;
    post.username = req.user.username;
    post.UserId = req.user.id;
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

//GET SINGLE POST BY USER
exports.getPostUser = async (req, res, next) => {
  try {
    const post = await Posts.findAll({ where: { UserId: req.params.id }, include: [Likes] });

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json(error);
  }
};

//UPDATE POST TITLE (on n'a pas ici /:id)
exports.updatePostTitle = async (req, res, next) => {
  try {
    const { title, id } = req.body;
    const post = await Posts.update({ title: title }, { where: { id: id } });
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
//UPDATE POST TEXT (on n'a pas ici /:id)
exports.updatePostText = async (req, res, next) => {
  try {
    const { text, id } = req.body;
    const post = await Posts.update({ postText: text }, { where: { id: id } });
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
