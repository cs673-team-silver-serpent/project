// require mongoose
const mongo = require('mongoose');

// define ProjectPortalSchema with title, description
const ProjectPortalSchema = mongo.Schema({
   title: {
      type: String,
      required: true
   },
   description: String
});

// convert schema to project model and export
const Project = module.exports = mongo.model('Project',ProjectPortalSchema);

///////////////////////////
// database query functions
///////////////////////////

// getAllProjects() is ues to return all projects from MongoDB
module.exports.getAllProjects = (callback) => {
   Project.find(callback);
}

// addProject() is used to insert new project into MongoDB
module.exports.addProject = (newProject,callback) => {
   newProject.save(callback);
}

// deleteById() uses an id parameter to remove a project from MongoDB
module.exports.deleteProjectById = (id,callback) => {
   let query = {_id: id};
   Project.remove(query,callback);
}
