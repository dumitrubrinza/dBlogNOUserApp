var _ = require('lodash')
var datastore = require('../datastore');
var Post = require('./post.model');

// error handling function
function handleError(res, err) {
	return res.send(500,err);
}

// get list of posts from mongo db
exports.index = function(req, res) {
	Post.find(function (err, posts) {
		if(err) {return handleError(res, err);}
		return res.json(200, posts);
	});
}

// get post from mogo db
exports.show = function(req, res) {
      Post.findById(req.params.id, function (err, post) {
          if(err) { return handleError(res, err); }
          return res.json(200, post);
      });
  } ;

// create a new Post in mongo db
exports.create = function(req, res) {
	req.body.comments = []
    req.body.upvotes = 0 
	Post.create(req.body, function(err, post) {
		if(err) {return handleError(res, err);}
		return res.json(201, post);
	});
}

// Add a comment to a post
exports.add_comment = function(req, res) {
    Post.findById(req.params.id, function (err, post) {
            var comment = {
                body: req.body.body,
                author: req.body.author,
                createdAt: req.body.createdAt,
                upvotes: 0,
                downvotes: 0
             }
            post.comments.push(comment)
            post.save(function (err) {
              if(err) { return handleError(res, err); }
              var last = _.last(post.comments)
              if (last != undefined) {
                 return res.json(200, last);
              } else {
                return res.send(500,"Database error")
                 }
            });
    });
};

// Update an existing posts upvotes.
  exports.update_upvotes = function(req, res) {
     Post.findById(req.params.id, function (err, post) {
          post.upvotes = req.body.upvotes
          post.save(function (err) {
              if(err) { return handleError(res, err); }
              return res.json(200, post);
          });
      });
  };

exports.update_comment_upvotes = function(req, res) {
      Post.findById(req.params.post_id, function (err, post) {
          var comment = post.comments.id(req.params.comment_id)
          if (comment) {
            comment.upvotes = req.body.upvotes
            post.save(function (err) {
                if (err) { return handleError(res, err); }
                return res.json(200,comment)
              });
          } else {
            return res.send(401,"Bad comment id")
          }

       })
    }

 exports.update_comment_downvotes = function(req, res) {
      Post.findById(req.params.post_id, function (err, post) {
          var comment = post.comments.id(req.params.comment_id)
          if (comment) {
            comment.downvotes = req.body.downvotes
            post.save(function (err) {
                if (err) { return handleError(res, err); }
                return res.json(200,comment)
              });
          } else {
            return res.send(401,"Bad comment id")
          }

       })
    }   

// update an existing Post in mongo db
exports.update = function(req, res) {
	Post.findById(req.params.id, function (err, post) {
		post.title = req.body.title
		post.data = req.body.data
		post.createdAt = req.body.createdAt
		post.by = req.body.by
		post.save(function (err) {
			if(err) {return handleError(res, err);}
			return res.send(200, "Update seccessfull");
		});
	});
};


// delete an Post from mongo db
exports.destroy = function(req, res) {
  Post.findById(req.params.id, function (err, post) {
    post.remove(function (err) {
      if(err) {return handleError(res, err);}
      return res.send(200, 'Deleted');
    });
  });
};