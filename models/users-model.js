// require mongoose
let mongo = require("mongoose");
let ObjectId = mongo.Schema.Types.ObjectId;
let project = require("../models/projects-model");
Project = project.Project; 

// Users schema
const UsersSchema = mongo.Schema({
  firstName: {
    type: String,
    required: true
  },
  middleName: String,
  lastName: {
    type: String,
    required: true
  },
  title: String,
  email: String,
  favorites: {
    type: ObjectId,
    ref: 'Project'
  },
  role: {
    type: String,
    enum: ["admin", "user", "visitor"]
  }
});

// convert schema to project model and export
const Users = module.exports = mongo.model('Users',UsersSchema);


///////////////////////////
// database query functions
///////////////////////////

// see examples in portal-model.js