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


exports.getPerfomance = catchAsync(async (req, res, next) => {
    const perfomance = await Perfomance.find({ user: req.params.id }).populate('user', 'name email').populate('contest', 'name');
    if (perfomance.length === 0) {
        return next(new appError(401, "No data here"));
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