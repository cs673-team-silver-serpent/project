// require mongoose
let mongo = require("mongoose");

// Comments schema
const CommentsSchema = mongo.Schema({
  author: String,
  title: String,
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
});

// convert schema to project model and export
const Comments = module.exports = mongo.model('Comments',CommentsSchema);


///////////////////////////
// database query functions
///////////////////////////

// see examples in portal-model.js