"use strict";
const express = require("express");

const userController = require("../controllers/user.controller");
var md_authentication = require("../middlewares/authenticated.middleware");
var api = express.Router();

api.post("/registerUser", userController.registerUser);
api.post("/registerLibrarian", userController.registerLibrarian);
api.post(
  "/registerAdmin",
  md_authentication.ensureAuth,
  userController.addAdmin
);
api.post("/login", userController.login);

api.get("/profile", md_authentication.ensureAuth, userController.listProfile);
api.get("/listLibrarians", md_authentication.ensureAuth, userController.listLibrarians);
api.get("/listAdmins", md_authentication.ensureAuth, userController.listAdmins);
api.get("/list", md_authentication.ensureAuth, userController.listLibrarians);
api.get("/findUserId/:idUser", userController.findUserId);
api.get("/listUsers",md_authentication.ensureAuth, userController.listUsers);

api.get("/listUsersRecord",md_authentication.ensureAuth, userController.listUsers);

api.put(
  "/updateProfile",
  md_authentication.ensureAuth,
  userController.updateProfile
);
api.put(
  "/updateUsers/:idUser",
  md_authentication.ensureAuth,
  userController.updateUsers
);

api.delete(
  "/deleteProfile",
  md_authentication.ensureAuth,
  userController.deleteProfile
);
api.delete(
  "/deleteUsers/:idUser",
  md_authentication.ensureAuth,
  userController.deleteUsers
);

api.get("/lendBook/:idBook",md_authentication.ensureAuth,userController.lendBook);

api.get("/return/:idLend/:idBook",md_authentication.ensureAuth,userController.returnBook);

api.get("/lendMagazine/:idMagazine",md_authentication.ensureAuth,userController.lendMagazine);

api.get("/returnMagazine/:idLend/:idMagazine",md_authentication.ensureAuth,userController.returnMagazine);

module.exports = api;
