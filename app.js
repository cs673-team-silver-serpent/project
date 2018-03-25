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
app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req,res) => {
   res.send("Welcome to Projects Portal!");
});

//////////////////
// Project Routes
/////////////////
// TODO: refactor routes
app.route('/view').get(projects.getAllProjects);
app.route('/project/name/:projectName').get(projects.getProjectByProjectName);
app.route('/project/description/:projectDescription').get(projects.getProjectByProjectDescription);

// TODO: refactor route
app.route("/view/:id").get(projects.getProjectById);

// TODO: refactor route
app.route("/add").post(projects.addProject);

// TODO: refactor route
app.route('/delete/:id').delete(projects.deleteProjectById);

///////////////
// User Routes
///////////////
app.route("/user").post(users.addUser);
app.route("/users").get(users.getAllUsers);
app.route("/user/id/:id").get(users.getUserById);
app.route("/user/firstName/:firstName").get(users.getUserByFirstName);
app.route("/user/lastName/:lastName").get(users.getUserByLastName);
app.route("/user/token/:email").get(users.getUserTokenByUserEmail);

/////////////////
// Session Routes
/////////////////
app.route('/session/userId/:userId').get(sessions.getSessionByUserId);
app.route('/session').post(sessions.addSession);


// start server
app.listen(port, () => {
   console.log(`Starting the server at port ${port}.`);
});

module.exports = app; // for teting purposes