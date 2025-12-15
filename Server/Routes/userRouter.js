const express = require("express");
const Router = express.Router();
const authController = require("../Controllers/authController");
const userController = require("../Controllers/userController");

Router.route("/register").post(authController.register);
Router.route("/verifyOtp").post(authController.verifyOtp);
Router.route("/signIn").post(authController.signIn);
Router.route("/logOut").post(authController.checkLogin, authController.signOut);
Router.route("/").get(authController.getUserBytoken);
Router.route("/create").post(userController.createUser);

module.exports = Router;