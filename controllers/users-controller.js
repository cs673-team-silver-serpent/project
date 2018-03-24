const express = require('express');
const User = require('../models/users-model');
// TODO
// const apiQuery = require('api-query-params');

getAllUsers = (request, response) => {
    let query = User.find();
    query.exec((error, users) => {
      if (error) {
        response.send(error);
      } else {
        response.json(users);
      }
    });
}

getUserById = (request, response) => {
    let id = request.params.id;
    let query = User.find({_id: id});
    query.exec((error,user) => {
      if (error) { 
        response.send(error);
      } else {
        response.json(user);
      }
    });
  }

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

  module.exports = { addUser, getUserById, getAllUsers };