const express = require('express');
const User = require('../models/users-model');
// TODO
// const apiQuery = require('api-query-params');

getAllUsers = (request, response) => {
    let query = User.find();
    query.exec((error, users) => {
      if (error) {
        response.send(error);
      } else if (users) {
        response.json(users);
      } else {
        response.json({ success: false });
      }
    });
}

// TODO
// Get user by email, check that passwords match
// send OK or No-go response along with new token
// getUserTokenByUserEmail = 


getUserById = (request, response) => {
    let id = request.params.id;
    let query = User.find({_id: id});
    query.exec((error,user) => {
      if (error) { 
        response.send(error);
      } else if (user) {
        response.json(user);
      } else {
        response.json({ success: false });
      }
    });
  }

// Temporary functions for Iteration 2 presentation only
getUserByFirstName = (request, response) => {
  let firstName = request.params.firstName;
  let firstNameRegEx = new RegExp('.*' + firstName + '.*','i')
  let query = User.find({ firstName : firstNameRegEx });
  query.exec((error,user) => {
    if (error) { 
      response.send(error);
    } else if (user) {
      response.json(user);
    } else {
      response.json({ success: false });
    }
  });
}

getUserByLastName = (request, response) => {
  let lastName = request.params.lastName;
  let lastNameRegEx = new RegExp('.*' + lastName + '.*','i')
  let query = User.find({ lastName : lastNameRegEx });
  query.exec((error,user) => {
    if (error) { 
      response.send(error);
    } else if (user) {
      response.json(user);
    } else {
      response.json({ success: false });
    }
  });
}
// end of temporary functions


// TODO: figure out how to query by parameters
// getUserByFilter = (request, response) => {
//   let filter = JSON.stringify(request.params.filter);
//   let query = User.find({filter});
//   query.exec((error,user) => {
//     if (error) { 
//       response.send(error);
//     } else {
//       response.json(user);
//     }
//   });
// }

// TODO: figure out how to instantiate Project Id and reference them as an array
addUser = (request, response) => {
    let newUser = new User({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      title: request.body.title,
      email: request.body.email,
      password: request.body.password,
      favorites: request.body.favorites,
      role: request.body.role,
    });
    newUser.save((error, user) => {
      if (error) {
        response.json({success: false, message: `Failed to create a new user. Error: ${error}`});
      } else {
        response.json({success: true, message: "User added successfully."});
      }
    });
  }

  module.exports = { addUser, getUserById, getUserByFirstName, getUserByLastName, getAllUsers };
