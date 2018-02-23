let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let cors = require('cors');
let mongo = require('mongoose');
let morgan = require("morgan");
let config = require('config');
const projects = require('./controllers/projects-controller');

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

// routes

app.get('/', (req,res) => {
   res.send("Welcome to Projects Portal!");
});

app.route('/view').get(projects.getAllProjects);

app.route("/view/:id").get(projects.getProjectById);

app.route("/add").post(projects.addProject);

app.route('/delete/:id').delete(projects.deleteProjectById);


// start server
app.listen(port, () => {
   console.log(`Starting the server at port ${port}.`);
});

module.exports = app; // for teting purposes