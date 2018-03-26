const express = require('express');
const User = require('../models/users-model');
const Session = require('../models/sessions-model');
const hash = require('hash.js');
const randonWord = require('random-word');

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

getUserById = (request, response) => {
    let id = request.body.id;
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
  let firstName = request.body.firstName;
  let firstNameRegEx = new RegExp('.*' + firstName + '.*','i')
  User.find( {firstName: firstNameRegEx }, { _id: 0, password: 0 } )
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
  let lastName = request.body.lastName;
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

addUser = (request, response) => {
    const passwordHash = hash.sha256().update(request.body.password).digest('hex').toUpperCase(); 
    let newUser = new User({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      title: request.body.title,
      email: request.body.email,
      password: passwordHash,
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

authenticateUser = (request, response) => {
  const _email = request.body.email;
  const _password = hash.sha256().update(request.body.password).digest('hex').toUpperCase();  //FYI This is the HASH in action 
  let query = User.find({ email : _email });
  query.exec((error,user) => {
    if (error) { 
      response.send(error);
    } else if (user) {
      user = user[0];  // mongo seems to return a list of objects even if there is only one object
      if (user.password === _password) {
        response.json(user);
      }
      else {
        response.send(401, "Wrong Password");
      }
    } else {
      response.json({ success: false });
    }
  });
  query.then ( (user) => {
    const userId = user[0]._id;
    const token = hash.sha256().update(randonWord()).digest('hex').toUpperCase();
    let newSession = new Session(
      {
      userId: userId,
      sessionToken: token,
      expirationDate: expirationDate 
      }
    );
    newSession.save((error,session) => {
        if (error) {
            response.json({success: false, message: `Failed to create new session. Error: ${error}`});
        } else {
            response.json({success: true, message: 'Session created successfully.'});
        }
    });
  });
}



  module.exports = { addUser, getUserById, getUserByFirstName, getUserByLastName, getAllUsers, authenticateUser };
