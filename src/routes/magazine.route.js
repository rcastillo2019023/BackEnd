"use strict";
const express = require("express");

const magazineController = require("../controllers/magazine.controller");
var md_authentication = require("../middlewares/authenticated.middleware");
var api = express.Router();

api.post("/addMagazine",md_authentication.ensureAuth ,magazineController.addMagazine);
api.get("/listMagazines",magazineController.listMagazine)
api.put("/updateMagazine/:idMagazine",md_authentication.ensureAuth, magazineController.updateMagazine)
api.get("/findMagazine",magazineController.findMagazine)
api.get("/findMagazineId/:idMagazine",magazineController.findMagazineId)
api.delete("/deleteMagazine/:idMagazine", md_authentication.ensureAuth, magazineController.deleteMagazine)
api.get("/listMagazinesRecord",magazineController.listMagazineRecord)

module.exports = api;
