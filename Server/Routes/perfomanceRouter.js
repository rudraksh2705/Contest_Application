const perfomanceController = require("../Controllers/perfomanceController");
const express = require("express");
const Router = express.Router();
Router.route("/").post(perfomanceController.addData).get(perfomanceController.viewAll);
Router.route("/user/:id").get(perfomanceController.getPerfomanceUser);
Router.route("/contest/:id").get(perfomanceController.getPerfomanceContest);
Router.route("/attempt/:id").post(perfomanceController.canAttempt);


module.exports = Router;