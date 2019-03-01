let express = require('express');
let Project = require('../models/projects-model');
let User = require('../models/users-model');
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
    return;
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

getProjectsByUser = (request, response) => {
  const userId = request.body.userId;

  // if not a valid user return empty json array
  if (userId.length != 24) {
    return response.json([]);
  }
  Project.find( 
            { $or: [  { 'owner': userId}, 
                      { 'projectMembers': { "$in": [userId]}},
                      { 'favorites': {"$in": [userId]}} 
                   ]
            }).exec( (error, projects) => {
        if (error) {
          response.send(error);
        } else if (projects) {
          // iterate through projects
          // examine favorites for this.userId
          // if (this.userId) 

          response.json(projects);
        } else {
          response.json({'success': false});
        }
      }
    );

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

getProjectId = (request, response)=>{
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
  let repositoryLink = request.body.repositoryLink;
  let techStack = request.body.techStack;
  let projectDemo = request.body.projectDemo;
  let labels = request.body.labels;

  // update with a query by id
  let queryById = {_id: id};
  // return the updated object
  let options = {new: true};
  // instantiate updated project object
  let updatedProject = {};
  
  // update only if fields aren't empty
  // TODO implement logic to compare if non-null field has changed or not
  if ( projectName !== null) {
    updatedProject["projectName"] = projectName;
  }
  if (projectDescription !== null) {
    updatedProject["projectDescription"] = projectDescription;
  }
  if (repositoryLink !== null) {
    updatedProject["repositoryLink"] = repositoryLink;
  }
  if (techStack !== null) {
    updatedProject["techStack"] = techStack;
  }
  if (projectDemo !== null) {
    updatedProject["projectDemo"] = projectDemo;
  }
  if (labels !== null) {
    updatedProject["labels"] = labels;
  }
  // update date modified
  if ( Object.keys(updatedProject).length > 0 ) {
    updatedProject["dateModified"] = new Date();
  }

  Project.update(queryById, updatedProject, options, (error, revisedProject) => {
    if (error) {
      response.json({success: false, message: `Failed to update the project. Error: ${error}`});
    } else if (revisedProject.n == 1) {
      response.json({success: true, message: `Project updated.`});
    } else {
      response.json(revisedProject);
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
  getProjectsByUser,
  updateProject,
};
