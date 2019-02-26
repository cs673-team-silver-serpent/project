const express = require('express');
const User = require('../models/users-model');
const session = require('../controllers/sessions-controlller');
const hash = require('hash.js');

// TODO
// const apiQuery = require('api-query-params');



getAllUsers = (request, response) => {
  //User.find( {}, { _id: 0, password: 0} )
  User.find( {}, { password: 0} )
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
  let firstNameRegEx = new RegExp('.*' + firstName + '.*','i');
  User.find( {firstName: firstNameRegEx }, { _id: 0, password: 0 } )
      .exec((error,user) => {
    if (error) { 
      response.send(error);
    } else if (user.length == 0) {
      response.json({success: false, message: "Failed to find user."});      
    } else {
      response.json(user);
    }
  });
}

getUserByLastName = (request, response) => {
  let lastName = request.body.lastName;
  let lastNameRegEx = new RegExp('.*' + lastName + '.*','i');
  User.find({ lastName : lastNameRegEx }, {_id: 0, password: 0} )
      .exec((error,user) => {
    if (error) { 
      response.send(error);
    } else if (user.length == 0) {
      response.json({ success: false, message: "Failed to find user." });
    } else {
      response.json(user);
    }
  });
}
// end of temporary functions

addUser = (request, response) => {
    if (!request.body.password.trim()) {
      response.json({success: false, message: `Failed to create a new user. Error: Passwords may not be empty or contain whitespace.`});
      return;
    } else if (request.body.password.length < 8) {
      response.json({success: false, message: `Failed to create a new user. Error: Passwords must be at least 8 characters long.`});
      return;
    } else if (!request.body.email.trim()) {
      response.json({success: false, message: `Failed to create a new user. Error: Emails may not be empty or contain whitespace.`});
      return;
    }
    var passwordHash = hash.sha256().update(request.body.password).digest('hex').toUpperCase(); 
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


deleteUserByName = (request,response) => {
  let email = request.body.email;
  let firstName = request.body.firstName;
  let firstNameRegEx = new RegExp('.*' + firstName + '.*','i');
  let lastName = request.body.lastName;
  let lastNameRegEx = new RegExp('.*' + lastName + '.*','i');
  let query = {firstName: firstNameRegEx, lastName: lastNameRegEx, email: email};
  User.remove(query, (error, removedUser) => {
      if (error) {
        response.json({success: false, message: `Failed to delete the user. Error: ${error}`});
      } else if (removedUser.n == 1) {
          response.json({success: true, message: "User deleted successfully."});
      } else { 
        response.json({ success: false }); 
      }
  });
}

updateUser = (request, response) => {
  // get form data
  let id = request.body.id;
  let firstName = request.body.firstName;
  let lastName = request.body.lastName;
  let email = request.body.email;
  let title = request.body.title;

  // update with a query by id
  let queryById = {_id: id};
  // return the updated object
  let options = {new: true};
  // instantiate updated user object
  let updatedUser = {};

  if (firstName !== null) {
    updatedUser['firstName'] = firstName;
  }
  if (lastName !== null) {
    updatedUser['lastName'] = lastName;
  }
  if (email !== null) {
    updatedUser['email'] = email;
  }
  if (title !== null) {
    updatedUser['title'] = title;
  }

  User.update(queryById, updatedUser, options, (error, revisedUser) => {
    if (error) {
      console.log(error);
      response.json({success: false, message: `Failed to update user. Error: ${error}`});
    } else if (revisedUser.n == 1) {
      console.log(revisedUser);
      response.json({success: true, message: `User updated.`});
    } else {
      console.log(revisedUser);
      response.json(revisedUser);
    }
  });
}

authenticateUser = (request, response) => {
  const _email = request.body.email;
  //FYI This is the HASH in action 
  const _password = hash.sha256().update(request.body.password).digest('hex').toUpperCase(); 
  let query = User.find({ email : _email },{__v: 0}).exec();
  query.then( (user) => {                                   // wait for query promise to return
    return user                                             // then return user
  })
  .then( (user)  => {                                       // handle user after it's returned
    if (user[0].password == _password) { // mongo queries return cursors; only one object in this cursor so user[0].
      let newSession = session.createSession(user[0]._id);  // create user session
      newSession.save();                                    // save  session
      response.json(newSession);
    } else {
      response.status(401).send("Wrong Password");    
    }
  })
  .catch( (error) => {
    response.send(error);
  });
}

module.exports = { addUser, updateUser, getUserById, getUserByFirstName, getUserByLastName, getAllUsers, deleteUserByName,
  authenticateUser };
