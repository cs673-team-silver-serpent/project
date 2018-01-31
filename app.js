const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongo = require('mongoose');
const dbConfig = require('./config/database');
const portalControl = require('./controllers/portal-controller');

// initialize app variable
const app = express();

// declare port
const port = 3000;

// connect to database
mongo.connect(dbConfig.database);

// middleware
app.use(cors());

// middleware for bodypasrsing using json and urlencoding
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// declare public folder
app.use(express.static(path.join(__dirname,'public')));

// routes

// for testing purposes during setup
app.get('/hello', (req,res) => {
   res.send("Hello, world!");
});

app.use('/',portalControl);
// KEEP the following: postman instructions depend upon it
// TODO change postman instructions
// app.use('/portal',portalControl);


// start server
app.listen(port, () => {
   console.log(`Starting the server at port ${port}.`);
});
