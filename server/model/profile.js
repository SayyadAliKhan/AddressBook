const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const profile = new Schema({
  "address_book_title" : {type : String, required : true},
  "contact_name" : {type : String, required : true},
  "contact_no" : {type : Number, required : true},
  "address_line_1" : {type : String, required : true},
  "address_line_2" : {type : String},
  "address_line_3" : {type : String},
  "pincode" : {type : String, required : true},
  "city" : {type : String, required : true},
  "state" : {type : String, required : true},
  "country" : {type : String, required : true},
  "user_id" : {type: Schema.Types.ObjectId, required : true}
})

module.exports = mongoose.model("profile", profile);
