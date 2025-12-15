const perfomanceController = require("../Controllers/perfomanceController");
const express = require("express");
const Router = express.Router();
Router.route("/").post(perfomanceController.addData).get(perfomanceController.viewAll);
Router.route("/:id").get(perfomanceController.getPerfomance);


module.exports = Router;