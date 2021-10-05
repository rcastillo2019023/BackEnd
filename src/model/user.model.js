"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = Schema({
  id: String,
  name: String,
  lastName: String,
  user: String,
  email: String,
  password: String,
  role: String,
  loan:[{
    state:String,
    idBook:{type: Schema.Types.ObjectId, ref:"books"},
    idMagazine:{type: Schema.Types.ObjectId, ref:"magazines"},
    title:String,
    author:String,
    description:String,
  }],
  record:Number,
  lend:Number, 
});

module.exports = mongoose.model("users", userSchema);
