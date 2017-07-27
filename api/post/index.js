var express = require('express');
var controller = require('./posts.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/:id/upvotes', controller.update_upvotes);
router.post('/:id/comments', controller.add_comment);
router.post('/:post_id/comments/:comment_id/upvotes', controller.update_comment_upvotes);
router.post('/:post_id/comments/:comment_id/downvotes', controller.update_comment_downvotes);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;