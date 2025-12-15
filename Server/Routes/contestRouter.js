const express = require("express");
const Router = express.Router();
const contestController = require("../Controllers/contestController");
const authController = require("../Controllers/authController");

Router.route("/").post(authController.ensureAuthenticated, contestController.Uploads, contestController.createContest)
    .get(authController.ensureAuthenticated, contestController.getAllContests);
Router.route("/:id").get(authController.ensureAuthenticated, contestController.getContest);

module.exports = Router;