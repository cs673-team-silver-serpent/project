const express = require('express');
const Session = require('../models/sessions-model');
const Users = require('../models/users-model');
const hash = require('hash.js');
const randomWord = require('random-word');

// TODO: figure out mongoose cursors interface
getSessionByUserId = (request, response) => {
     let userId = request.body.userId;

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

// Given a SessionToken in the URL Param return the User
getUserBySession = (request, response) => {
    // Find User ID by the SessionToken
    let sessionToken = request.body.sessionToken;
    var userId;
    Session.find({sessionToken: sessionToken})
            .exec((error, answer) => {
            if (error) {
                response.send(error);
            } else if (answer) {
                console.log("Anser from Session find: ", answer);
                if (answer.length == 0) {
                    response.json({ success: false});
                } else {
                    userId = answer[0].userId;
                    console.log("UserID: ", userId);
                    Users.find({_id: userId})
                        .exec((error, user) => {
                            if (error) {
                                response.send(error);
                            } else if (user) {
                                console.log("User: ", user)
                                delete(user[0].password);
                                response.json(user[0]);
                            } else {
                                response.json({ success: false});
                            }
                    });
                }
            } else {
                response.json({ success: false});
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

module.exports = { createSession, getSessionByUserId, getUserBySession };