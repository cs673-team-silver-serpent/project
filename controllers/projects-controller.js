let express = require('express');
let Project = require('../models/projects-model');

getAllProjects = (request, response) => {
    // query db; if no errors, send all books
    let query = Project.find();
    query.exec((error, projects) => {
      if (error) {
        response.send(error);
      } else {
        response.json(projects);
      }
      
    });
}

getProjectById = (request, response) => {
  let id = request.params.id;
  let query = Project.find({ _id: id });
  query.exec((error,project) => {
    if (error) { 
      response.send(error);
    } else {
      response.json(project);
    }
  });
}

addProject = (request, response) => {
  // check the header for a token and check mongodb to make sure it's an active session

  //if it's an active session
  let newProject = new Project({
    projectName: request.body.projectName,
    projectDescription: request.body.projectDescription,
    projectMembers: request.body.projectMembers,
    repositoryLink: request.body.repositoryLink,
    owner: request.body.owner,
    techStack: request.body.techStack,
    projectDemo: request.body.projectDemo,
    labels: request.body.labels
  });
  newProject.save((error, project) => {
    if (error) {
      response.json({success: false, message: `Failed to create a new list. Error: ${error}`});
    } else {
      response.json({success: true, message: "Project added successfully."});
    }
  });

  // else 
  // return unauth
}

deleteProjectById = (request,response) => {
  let id = request.params.id;
  // request.headers['sessionid'] 
  let query = {_id: id};
  Project.remove(query, (error, project) => {
      if (error) {
        response.json({
          success: false,
          message: `Failed to delete the list. Error: ${error}`
        });
      } else if (project) {
         response.json({
           success: true,
           message: "Project deleted successfully."
         });
      } 
      else {
        response.json({ success: false });
      }
  });
}


module.exports = { addProject, deleteProjectById, getAllProjects, getProjectById };