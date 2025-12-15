const Perfomance = require("../Models/perfomanceModel");
const appError = require("../Utils/appError");
const catchAsync = require("../Utils/catchAsync");

exports.viewAll = catchAsync(async (req, res, next) => {
    const perfomances = await Perfomance.find()
        .populate('user', 'name email').populate('contest', 'name');
    if (perfomances.length === 0) {
        return next(new appError(401, "No data available"));
    }

    res.status(200).json({
        status: "success",
        data: perfomances
    });
});


exports.getPerfomanceUser = catchAsync(async (req, res, next) => {
    console.log(req.params.id);
    const perfomance = await Perfomance.find({ user: req.params.id }).populate('user', 'name email').populate('contest', 'name');
    if (!perfomance) {
        return next(new appError(401, "No perfomance"));
    }
    res.status(201).json({
        status: "success",
        data: perfomance
    });
});

exports.addData = catchAsync(async (req, res, next) => {
    const { user, contest, score, total } = req.body;
    console.log(req.body);
    // if (!user || !contest || !score || !total) {
    //     return next(new appError(401, "Please fill all fields"));
    // }
    const data = await Perfomance.create({ user, contest, score, total });
    res.status(201).json({
        status: "success",
        data
    });
});

exports.getPerfomanceContest = catchAsync(async (req, res, next) => {
    const perfomance = await Perfomance.find({ contest: req.params.id }).populate('user', 'name email').populate('contest', 'name');
    if (perfomance.length === 0) {
        return next(new appError(401, "No participation right now"));
    }
    res.status(201).json({
        status: "success",
        data: perfomance
    });
});

exports.canAttempt = catchAsync(async (req, res, next) => {
    const user = req.body.user;
    const contest = req.params.id;
    const attempted = await Perfomance.findOne({ user, contest });
    if (attempted) {
        return next(new appError(401, "You have attempted this contest"));
    }
    res.status(201).json({
        status: "success",
        message: "You can attempt"
    });
});