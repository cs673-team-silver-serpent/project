// require mongoose
let mongo = require("mongoose");
let ObjectId = mongo.Schema.Types.ObjectId;
let users = require('../models/users-model');
Users = users.Users;

// Comments schema
const CommentsSchema = mongo.Schema({
  title: String,
  body: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now,
    required: true
  },
  dateModified: {
    type: Date,
    default: Date.now
  }
});

// convert schema to project model and export
const Comments = module.exports = mongo.model('Comments',CommentsSchema);


///////////////////////////
// database query functions
///////////////////////////

// see examples in portal-model.js