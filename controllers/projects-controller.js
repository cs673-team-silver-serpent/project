let express = require('express');
let Project = require('../models/projects-model');
var ObjectId = require('mongodb').ObjectId;

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

// Given an User object ID it returns an array of projects associated with that user
getProjectsByOwner = ( request, response) => {
  var owner = request.body.owner;

  // Check to make sure the string is a proper object id
  if (owner.length != 24) {
    response.json([]);
    return
  }

  Project.find({owner: owner})
          .exec((error, projects) => {
      if (error) {
        response.send(error);
      } else if (projects) {
        response.json(projects);
      } else {
        response.json({success: false });
      }
  });
}

// Temporary functions for Iteration 2 Presentation
getProjectByProjectName = (request, response) => {
  let projectName = request.body.projectName;
  let projectNameRegEx = new RegExp('.*' + projectName + '.*','i');
  // console.log(projectNameRegEx);
  Project.find({ projectName: projectNameRegEx },{projectName})
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

//----------NEW------return project Ids-----------
getProjectId=(request, response)=>{
  var projectName = request.body.projectName;
  let searchName = new RegExp('.*' + projectName + '.*','i');
  Project.find({projectName: projectNameS},{_id, projectName}).exec((error,project)=>{
    if(error){
      response.send(error);
    }
    else if(project==false){
      response.json({success: false})
  }
  else {
    response.json(project);
  }
  })

}
//------------------------------

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

updateProject = (request, response) => {
  // get form data
  let id = request.body.id;
  let projectName = request.body.projectName;
  let projectDescription = request.body.projectDescription;
  let projectMembers = request.body.projectMembers;
  let repositoryLink = request.body.repositoryLink;
  let techStack = request.body.techStack;
  let projectDemo = request.body.projectDemo;
  let labels = request.body.labels;
  let updatedProjectName, updatedProjectDescription, updatedProjectMembers = null;
  let updatedRepositoryLink, updatedTechStack, updatedProjectDemo, updatedLabels = null;

  // update with a query by id
  let queryById = {_id: id};
  
  // update only if fields aren't empty
  // TODO implement logic to compare if non-null field has changed or not
  if ( projectName !== null) {
    this.updatedProjectName = updateProjectInfo(queryById, {'projectName': projectName}, 'name');
  }

  if (projectDescription !== null) {
    updateProjectInfo(queryById, {'projectDescription': projectDescription}, 'description');
  }

  if (projectMembers !== null) {
    this.updatedProjectMembers = updateProjectInfo(queryById, {'projectMembers': projectMembers}, 'members');
  }

  if (repositoryLink !== null) {
    updateProjectInfo(queryById, {'repositoryLink': repositoryLink}, 'repository url');
  }

  if (techStack !== null) {
    updateProjectInfo(queryById, {'techStack': techStack}, 'tech stack');
  }

  if (projectDemo !== null) {
    updateProjectInfo(queryById, {'projectDemo': projectDemo}, 'demo site url');
  }

  if (labels !== null) {
    updateProjectInfo(queryById, {'labels': labels}, 'labels');
  }

  let updatedProject = {
    projectName: updatedProjectName,
    projectMembers: updatedProjectMembers,
    // repositoryLink: request.body.repositoryLink,
    // techStack: request.body.techStack,
    // projectDemo: request.body.projectDemo,
    // labels: request.body.labels
  };

  let options = {new: true};

  Project.update(queryById, updatedProject, options, (error, updatedProject) => {
    if (error) {
      response.json({success: false, message: `Failed to update the project. Error: ${error}`});
    } else if (updatedProject.n == 1) {
      response.json({success: true, message: `Project updated.`});
    } else {
      response.json({success: false});
    }
  });

}

updateProjectInfo = (query, update, label) => {
  Project.update(query, update, {new: true}, (error, updatedValue) => {
    if (error) {
      console.log(`Failed to update project ${label}. Error: ${error}`);
    } else {
      return 'yadda yadda yadda';
    } 
  });
}

deleteProjectById = (request,response) => {
  let id = request.body._id;
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

module.exports = { 
  addProject, 
  deleteProjectById,
  getAllProjects,
  getProjectById,
  getProjectByProjectName,
  getProjectByProjectDescription,
  getProjectsByOwner,
  updateProject
};
