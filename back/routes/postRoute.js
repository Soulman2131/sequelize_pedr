//
const express = require('express');
const { getComment, addComment, deleteComment } = require('../controllers/commentCtrl');
const {
  createPost,
  getPosts,
  getPost,
  deletePost,
  getPostUser,
  updatePostTitle,
  updatePostText
} = require('../controllers/postCtrl');
const { authToken } = require('../middleware/auth');
const router = express.Router();

//ROUTES
//POST
router.route('/').post(authToken, createPost).get(authToken, getPosts);
router.route('/:id').get(getPost).delete(authToken, deletePost);

//POST UPDATE TITLE && TEXT
router.route('/edit-title').put(authToken, updatePostTitle);
router.route('/edit-text').put(authToken, updatePostText);

//GET POST BY USER
router.route('/byuserId/:id').get(getPostUser);

//COMMENT
router.route('/comment-all/:id').get(getComment);
router.route('/comment-post').post(authToken, addComment);
router.route('/comment-delete/:id').delete(authToken, deleteComment);

module.exports = router;
