const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongo = require('mongoose');
const morgan = require("morgan");
const config = require('config');
const projects = require('./controllers/projects-controller');
const users = require('./controllers/users-controller');
const sessions = require('./controllers/sessions-controlller');

var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('./certificates/private.key', 'utf8');
var certificate = fs.readFileSync('./certificates/cacert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};

// initialize app variable
let app = express();

// declare port
const port = 3000;

// connect to database
mongo.connect(config.dbHost);
// error logging
let db = mongo.connection;
db.on('error', console.error.bind(console,'connection error:'));

// don't show log when in test mode
if(config.util.getEnv('NODE_ENV') !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); //'combined' mode creates Apache-style logs
}

// middleware
app.use(cors());

// middleware for bodypasrsing using json and urlencoding
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.text());

// declare public folder
//app.use(express.static(path.join(__dirname,'public')));
app.use(express.static('static'));

app.get('/', (req,res) => {
   res.send("Welcome to Projects Portal!");
});

//////////////////
// Project Routes
/////////////////
// add routes
app.route("/project").post(projects.addProject);
// search routes
app.route('/projects').post(projects.getAllProjects);
app.route('/project/projectName').post(projects.getProjectByProjectName);
app.route('/project/projectDescription').post(projects.getProjectByProjectDescription);
app.route("/project/id").post(projects.getProjectById);
// delete routes 
app.route('/project/delete').post(projects.deleteProjectById);

///////////////
// User Routes
///////////////
// add routes
app.route("/user").post(users.addUser);
// view routes
app.route("/users").post(users.getAllUsers);
app.route("/user/id").post(users.getUserById);
app.route("/user/firstName").post(users.getUserByFirstName);
app.route("/user/lastName").post(users.getUserByLastName);
app.route("/user/auth").post(users.authenticateUser);
// delete routes
app.route("/user/delete/").post(users.deleteUserByName);


/////////////////
// Session Routes
/////////////////
// user-facing routes
app.route('/session/userId').post(sessions.getSessionByUserId);
app.route('/session/getUserBySession').post(sessions.getUserBySession);

var httpsServer = https.createServer(credentials, app);

// start server
httpsServer.listen(port, () => {
   console.log(`Starting the server at port ${port}.`);
});

module.exports = app; // for teting purposes
