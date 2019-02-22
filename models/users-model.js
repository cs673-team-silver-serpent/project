// require mongoose
let mongo = require("mongoose");
mongo.Promise = require('bluebird');
let project = require("../models/projects-model");
let ObjectId = mongo.Schema.Types.ObjectId;
Project = project.Project; 

// Users schema
const UsersSchema = mongo.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  title: String,
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  myProjects: [  //****************** */
    {
      type: ObjectId,
      ref: 'Project'
    }
  ],
  role: {
    type: String,
    enum: ["admin", "user", "visitor"]
  }
});

// convert schema to User model and export
const User = module.exports = mongo.model('User',UsersSchema);