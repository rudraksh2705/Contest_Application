const catchAsync = require("../Utils/catchAsync");
const Users = require("../Models/userModel");
const appError = require("../Utils/appError");


exports.getUsers = catchAsync(async (req, res, next) => {
    const users = await Users.find();
    res.status(201).json({
        status: "success",
        data: users
    })
});

exports.getUser = catchAsync(async (req, res, next) => {
    const user = await Users.findById(req.params.id);
    if (!user) {
        return next(new appError(401, "User not Found"));
    }
    res.status(201).json({
        status: "success",
        data: user
    });
});

exports.createUser = catchAsync(async (req, res, next) => {
    const user = await Users.create(req.body);
    if (!user) {
        return next(new appError(401, "User can't created"));
    }
    res.status(201).json({
        status: "success",
        data: user
    });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
    const user = await Users.findById(req.params.id);
    user.active = false;
    await user.save();
    if (!user) {
        return next(new appError(401, "user can't be deleted"));
    }

    res.status(200).json({
        status: "success",
        data: user
    })
});
