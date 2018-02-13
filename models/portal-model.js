// require mongoose
const mongo = require('mongoose');

// Users schema
const Users = mongo.Schema({
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
    role: {
        type: String,
        enum: ['admin','user','visitor']
    }
});

// Comments schema
const Comments = mongo.Schema({
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

// define ProjectPortalSchema
const ProjectPortalSchema = mongo.Schema({
    dateCreated: {
        type: Date,
        default: Date.now,
        required: true
    },
    dateModified: {
        type: Date,
        default: Date.now,
    },
    projectName: {
        type: String,
        required: true
    },
    projectDescription: {
        type: String,
        required: true
    },
    projectMembers: {
        type: [Users]
    },
    techStack: [String],
    repositoryLink: String,
    projectManger: String,
    projectDemo: String,
    comments: [Comments],
    labels: [String],
});

// convert schema to project model and export
const Project = module.exports = mongo.model('Project',ProjectPortalSchema);

///////////////////////////
// database query functions
///////////////////////////

// getAllProjects() is ues to return all projects from MongoDB
module.exports.getAllProjects = (callback) => {
   Project.find(callback);
};

// addProject() is used to insert new project into MongoDB
module.exports.addProject = (newProject,callback) => {
   newProject.save(callback);
};

// deleteById() uses an id parameter to remove a project from MongoDB
module.exports.deleteProjectById = (id,callback) => {
   let query = {_id: id};
   Project.remove(query,callback);
};
