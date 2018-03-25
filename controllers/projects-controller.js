let express = require('express');
let Project = require('../models/projects-model');

getAllProjects = (request, response) => {
    let query = Project.find();
    query.exec((error, projects) => {
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
  let id = request.params.id;
  let query = Project.find({ _id: id });
  query.exec((error,project) => {
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
  let projectName = request.params.projectName;
  let projectNameRegEx = new RegExp('.*' + projectName + '.*','i');
  console.log(projectNameRegEx);
  let query = Project.find({ projectName: projectNameRegEx });
  query.exec((error,project) => {
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
  let projectDescription = request.params.projectDescription;
  let projectDescriptionRegEx = new RegExp('.*' + projectDescription + '.*','i');
  let query = Project.find({ projectDescription: projectDescriptionRegEx } );
  query.exec((error,project) => {
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
  let newProject = new Project(
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
  );

  newProject.save((error, project) => {
    if (error) {
      response.json({success: false, message: `Failed to create a new list. Error: ${error}`});
    } else {
      response.json({success: true, message: "Project added successfully."});
    }
  });
}

deleteProjectById = (request,response) => {
  let id = request.params.id;
  let query = {_id: id};
  Project.remove(query, (error, project) => {
      if (error) {
        response.json(
          {
          success: false,
          message: `Failed to delete the list. Error: ${error}`
          }
        );
      } else if (project) {
         response.json(
           {
           success: true,
           message: "Project deleted successfully."
          }
        );
      } 
      else {
        response.json({ success: false });
      }
  });
}

module.exports = { addProject, deleteProjectById, getAllProjects, getProjectById,
  getProjectByProjectName, getProjectByProjectDescription };
