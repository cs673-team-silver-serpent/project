// require mongoose
let mongo = require("mongoose");
let ObjectId = mongo.Schema.Types.ObjectId;
let users = require("../models/users-model");
User = users.Users; 

// Sessions schema
const SessionsSchema = mongo.Schema({
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  sessionToken: {
    type: String,
    required: true
  },
  expirationDate: {
    type: Date,
    required: true  
  }
  
});

// convert schema to project model and export
const Sessions = module.exports = mongo.model('Sessions',SessionsSchema);