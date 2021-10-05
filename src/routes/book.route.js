"use strict";
const express = require("express");

const bookController = require("../controllers/book.controller");
var md_authentication = require("../middlewares/authenticated.middleware");
var api = express.Router();

api.post("/addBook",md_authentication.ensureAuth ,bookController.addBook);
api.get("/listBooks",bookController.listBook)
api.get("/listBooksRecord",bookController.listBookRecord)
api.get("/booksAvailable",bookController.booksAvailable)
api.put("/updateBook/:idBook",md_authentication.ensureAuth, bookController.updateBook)
api.get("/findBook",bookController.findBook)
api.get("/findBookId/:idBook",bookController.findBookId)
api.delete("/deleteBook/:idBook", md_authentication.ensureAuth, bookController.deleteBook)

module.exports = api;
