const express = require('express');
const User = require('../models/users-model');
const session = require('../controllers/sessions-controlller');
const hash = require('hash.js');

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
  let query = User.find({ email : _email },{__v: 0}).exec();
  query.then( (user) => {                                   // wait for query promise to return
    return user                                             // then return user
  })
  .then( (user)  => {                                       // handle user after it's returned
    if (user[0].password == _password) { // mongo queries return cursors; only one object in this cursor so user[0].
      let newSession = session.createSession(user[0]._id);  // create user session
      newSession.save();                                    // save  session
      let userReturned = {                                  // user object has id & password
        firstName: user[0].firstName,                       // so remove them by constructing userReturned
        lastName: user[0].lastName,                         // object, which is what is returned
        email: user[0].email,
        title: user[0].title,
        favorites: user[0].favorites,
        role: user[0].role
      };
      response.json(userReturned);  
    } else {
      response.status(401).send("Wrong Password");    
    }
  })
  .catch( (error) => {
    response.send(error);
  });
}

module.exports = { addUser, getUserById, getUserByFirstName, getUserByLastName, getAllUsers, authenticateUser };
