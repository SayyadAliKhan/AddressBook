const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = new Schema({
  name : "String",
  password : "String"
})

module.export = mongoose.model("users", user);
