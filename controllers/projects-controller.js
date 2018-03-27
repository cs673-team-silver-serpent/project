let express = require('express');
let Project = require('../models/projects-model');

getAllProjects = (request, response) => {
    Project.find({})
           .exec((error, projects) => {
      if (error) {
        response.send(error);
      } else if (projects) {
        response.json(projects);
      } else {
        response.json({ success: false });
      }
    });
}

getProjectById = (request, response) => {
  let id = request.body.id;
  Project.find({ _id: id },{_id: 0})
         .exec((error,project) => {
    if (error) { 
      response.send(error);
    } else if (project) {
      response.json(project);
    } else {
      response.json({ success: false });
    }
  });
}

// Temporary functions for Iteration 2 Presentation
getProjectByProjectName = (request, response) => {
  let projectName = request.body.projectName;
  let projectNameRegEx = new RegExp('.*' + projectName + '.*','i');
  console.log(projectNameRegEx);
  Project.find({ projectName: projectNameRegEx },{_id: 0})
         .exec((error,project) => {
    if (error) { 
      response.send(error);
    } else if (project) {
      response.json(project);
    } else {
      response.json({ success: false });
    }
  });
}

getProjectByProjectDescription = (request, response) => {
  let projectDescription = request.body.projectDescription;
  let projectDescriptionRegEx = new RegExp('.*' + projectDescription + '.*','i');
  Project.find({ projectDescription: projectDescriptionRegEx }, {_id: 0} )
         .exec((error,project) => {
    if (error) { 
      response.send(error);
    } else if (project) {
      response.json(project);
    } else {
      response.json({ success: false });
    }
  });
}
// end temporary functions


addProject = (request, response) => {
  let dateCreated = new Date(Date.now());
  new Project(
    {
    dateCreated: dateCreated,
    projectName: request.body.projectName,
    projectDescription: request.body.projectDescription,
    projectMembers: request.body.projectMembers,
    repositoryLink: request.body.repositoryLink,
    owner: request.body.owner,
    techStack: request.body.techStack,
    projectDemo: request.body.projectDemo,
    labels: request.body.labels
    }
  ).save((error, project) => {
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
  let id = request.body.id;
  let query = {_id: id};
  Project.remove(query, (error, removedProject) => {
      if (error) {
        response.json({success: false, message: `Failed to delete the project. Error: ${error}`});
      } else if (removedProject.n == 1) {
         response.json({success: true, message: "Project deleted successfully."});
      } else { 
        response.json({ success: false }); 
      }
  });
}

module.exports = { addProject, deleteProjectById, getAllProjects, getProjectById,
  getProjectByProjectName, getProjectByProjectDescription };
