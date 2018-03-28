const express = require('express');
const Session = require('../models/sessions-model');
const hash = require('hash.js');
const randomWord = require('random-word');

// TODO: figure out mongoose cursors interface
getSessionByUserId = (request, response) => {
     let userId = request.body.userId;
//     let cursor = Session.find({userId:userId}).cursor();
//     cursor
//         .on('data',(doc) => {
//         })
//         .on('error', () => {
//             response.send(error);
//         })
//         .on('close', () => {
//         });

    Session.find({userId: userId},{ _id: 0})
            .exec((error,sessions) => {
        if (error) {
            response.send(error);
        } else if (sessions) {
            response.json(sessions);
        } else {
            response.json({ success: false });
        }
    });
}

createSession = (userId) => {
    // calculate expiration date & time
    let now = new Date(Date.now());
    let expirationDate = new Date();
    expirationDate.setDate(now.getDate() + 2);
    // generate a token
    const token = hash.sha256().update(randomWord()).digest('hex').toUpperCase();
    
    return new Session(
        {
        userId: userId,
        sessionToken: token,
        expirationDate: expirationDate 
        }
    );
}

module.exports = { createSession, getSessionByUserId };