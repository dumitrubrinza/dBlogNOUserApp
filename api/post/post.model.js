var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
        body: { type: String, required: true },
        author: { type: String, required: true }, 
        createdAt: { type: Date, required: true },
        upvotes: Number,
        downvotes: Number
      });

var EventSchema = new Schema({
    title: { type: String, required: true },
    data: { type: String, required: true },
    createdAt: { type: Date, required: true },
    by: { type: String, required: true },
    comments: [CommentSchema] 
});

module.exports = mongoose.model('posts', EventSchema);
