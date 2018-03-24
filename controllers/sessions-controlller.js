const express = require('express');
const Session = require('../models/sessions-model');

// TODO: figure out mongoose cursors interface
getSessionByUserId = (request, response) => {
     let userId = request.params.userId;
//     let cursor = Session.find({userId:userId}).cursor();
//     cursor
//         .on('data',(doc) => {

//         })
//         .on('error', () => {
//             response.send(error);
//         })
//         .on('close', () => {

//         });

    let query = Session.find({userId: userId});
    query.exec((error,sessions) => {
        if (error) {
            response.send(error);
        } else {
            response.json(sessions);
        }
    });
}

addSession = (request, response) => {
    // calculate expiration date & time
    let now = new Date(Date.now());
    let expirationDate = new Date();
    expirationDate.setDate(now.getDate() + 2);
    
    let newSession = new Session(
        { 
        userId: request.body.userId,
        sessionToken: request.body.token,
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
}

module.exports = { addSession, getSessionByUserId };