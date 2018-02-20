// require mongoose
let mongo = require('mongoose');
let ObjectId = mongo.Schema.Types.ObjectId;

// TODO: Install Babel transpiler in order to use imports
// import { Users } from '../models/users';
// import { Comments } from '../models/comments';
// then get rid of the following four lines
let users = require('../models/users');
let comments = require('../models/comments');
Users = users.Users;
Comments = comments.Comments;

// define ProjectPortalSchema
const ProjectPortalSchema = mongo.Schema({
    dateCreated: {
        type: Date,
        default: Date.now,
        required: true
    },
    owner: {
        type: ObjectId,
        ref: 'Users'
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
        type: ObjectId,
        ref: 'Users'
    },
    techStack: [String],
    repositoryLink: String,
    projectManger: String,
    projectDemo: String,
    comments: {
        type: [Comments]
    },
    labels: [String],
});

// convert schema to project model and export
const Project = module.exports = mongo.model('Project',ProjectPortalSchema);


// moved these functions to the controller, portal-controller.js
///////////////////////////
// database query functions
///////////////////////////

// getAllProjects() is ues to return all projects from MongoDB
// module.exports.getAllProjects = (callback) => {
//    Project.find(callback);
// };

// addProject() is used to insert new project into MongoDB
// module.exports.addProject = (newProject,callback) => {
//    newProject.save(callback);
// };

// deleteById() uses an id parameter to remove a project from MongoDB
// module.exports.deleteProjectById = (id,callback) => {
//    let query = {_id: id};
//    Project.remove(query,callback);
// };