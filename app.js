let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let cors = require('cors');
let mongo = require('mongoose');
let morgan = require("morgan");
let config = require('config');
const portalControl = require('./controllers/portal-controller');

// initialize app variable
const app = express();

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

// declare public folder
app.use(express.static(path.join(__dirname,'public')));

// routes

// for testing purposes during setup
app.get('/hello', (req,res) => {
   res.send("Welcome to Projects Portal!");
});

app.use('/',portalControl);


// start server
app.listen(port, () => {
   console.log(`Starting the server at port ${port}.`);
});

module.exports = app; // for teting purposes