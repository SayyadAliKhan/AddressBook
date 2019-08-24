const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const profile = new Schema({
  "address_book_title" : String,
  "contact_name" : String,
  "contact_no" : Number,
  "address_line_1" : String,
  "address_line_1" : String,
  "address_line_1" : String,
  "pincode" : String,
  "city" : String,
  "state" : String,
  "country" : String,
  "user_id" : Schema.Types.ObjectId
})

module.export = mongoose.model("profile", profile);
