// require mongoose
let mongo = require("mongoose");

// Users schema
const UsersSchema = mongo.Schema({
  firstName: {
    type: String,
    required: true
  },
  middleName: String,
  lastName: {
    type: String,
    required: true
  },
  title: String,
  email: String,
  role: {
    type: String,
    enum: ["admin", "user", "visitor"]
  }
});

// convert schema to project model and export
const Users = module.exports = mongo.model('Users',UsersSchema);


///////////////////////////
// database query functions
///////////////////////////

// see examples in portal-model.js