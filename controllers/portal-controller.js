const express = require('express');
const router = express.Router();
const project = require('../models/portal-model');

// GET HTTP method to /
router.get('/',(request,response) => {
   // response.send("GET");
   project.getAllProjects( (error,projects) => {
      if (error) {
        response.json({success:false,message:`Failed to load all projects. Error: ${error}`});
     } else {
        response.write(JSON.stringify({success:true, projects:projects},null,2));
        response.end();
     }
   });
});

// POST HTTP method to /
router.post('/',(request,response,next) => {
   // response.send("POST");
   let newProject = new project({
      projectName: request.body.projectName,
      projectDescription: request.body.projectDescription,
      repositoryLink: request.body.repositoryLink

   });
   project.addProject(newProject, (error,project) => {
      if (error) {
         response.json({success:false,message:`Failed to create a new list. Error: ${error}`});
      } else {
         response.json({success:true, message: "Project added successfully."});
      }
   });
});

// DELETE HTTP method to /
router.delete('/:id',(request,response,next) => {
  // res.send("DELETE");
  let id = request.params.id;
  // call the deleteProjectById function
  project.deleteProjectById(id, (error,project) => {
     if (error) {
        response.json({success:false,message: `Failed to delete the list. Error: ${error}`});
     } else if (project) {
        response.json({success:true,message: "Project deleted successfully."});
     } else {
        response.json({success:false});
     }
  });
});

module.exports = router;
