"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var bookSchema = Schema({
  author: String,
  title: String,
  edition: Number,
  keywords:[{}],
  description: String,
  topics: [{}],
  copy: Number,
  available: Number,
  record: Number,
  search: Number,
});

module.exports = mongoose.model("books", bookSchema);
