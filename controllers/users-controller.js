const express = require('express');
const User = require('../models/users-model');
const Session = require('../models/sessions-model');

// TODO
// const apiQuery = require('api-query-params');

getAllUsers = (request, response) => {
    User.find( {}, { _id: 0, password: 0} )
        .exec((error, users) => {
      if (error) {
        response.send(error);
      } else if (users) {
        response.json(users);
      } else {
        response.json( {success: false} );
      }
    });
}

// TODO
// Get user by email, check that passwords match
// send OK or No-go response along with new token
getUserTokenByUserEmail = (request, response) => {
  const email = request.params.email;
  let query = User.find({ email: email}, { password: 0 });
  query.exec();
  query.then ( (user) => {
      let userId = user[0]._id;
      Session.find({userId: userId}, {_id: 0, userId: 0} )
      .exec(
        (error,session) => {
          if (error) {
            response.send(error);
          } else if (session) {
            response.json({session});
          } else {
            response.json( {success: false} );
          }
      } 
      );

  });
}

getUserById = (request, response) => {
    let id = request.params.id;
    User.find( { _id: id}, { _id: 0, password: 0 } )
        .exec((error,user) => {
          if (error) { 
            response.send(error);
          } else if (user) {
            response.json(user);
          } else {
            response.json( {success: false} );
          }
    });
  }

// Temporary functions for Iteration 2 presentation only
getUserByFirstName = (request, response) => {
  let firstName = request.params.firstName;
  let firstNameRegEx = new RegExp('.*' + firstName + '.*','i')
  User.find( {firstName: firstNameRegEx }, {_id:0,password:0} )
      .exec((error,user) => {
    if (error) { 
      response.send(error);
    } else if (user) {
      response.json(user);
    } else {
      response.json( {success: false} );
    }
  });
}

getUserByLastName = (request, response) => {
  let lastName = request.params.lastName;
  let lastNameRegEx = new RegExp('.*' + lastName + '.*','i')
  User.find({ lastName : lastNameRegEx }, {_id: 0, password: 0} )
      .exec((error,user) => {
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

  module.exports = { addUser, getUserById, getUserByFirstName, 
    getUserByLastName, getAllUsers, getUserTokenByUserEmail };