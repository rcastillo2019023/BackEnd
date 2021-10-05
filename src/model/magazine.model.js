"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var magazineSchema = Schema({
  author: String,
  title: String,
  edition: Number,
  description: String,
  frequency: String,
  exemplar: Number,
  topics: [{}],
  keywords: [{}],
  copy: Number,
  available: Number,
  record: Number,
  search: Number,
});

module.exports = mongoose.model("magazines", magazineSchema);
