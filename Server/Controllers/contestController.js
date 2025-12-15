const catchAsync = require("../Utils/catchAsync");
const appError = require("../Utils/appError");
const Contest = require("../Models/contestModel");
const multer = require("multer");
const fs = require("fs/promises");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, "problems/")
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now();
        return cb(null, "problem" + uniqueName + ".json");
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/json" || file.originalname.endsWith(".json")) {
        cb(null, true);
    } else {
        cb(new multer.MulterError("Unexpected File", "Requires JSON only"));
    }
}


const upload = multer({
    storage,
    fileFilter
})


exports.Uploads = (req, res, next) => {
    const uploadSingle = upload.single("file");
    uploadSingle(req, res, function (err) {
        if (err) return next(err);
        if (!req.file) return next(new appError(401, "File not set"));
        next();
    });
};

exports.createContest = catchAsync(async (req, res, next) => {
    const { name, description } = req.body;
    if (!req.file) {
        return next(new appError(401, "File is required"));
    }

    const filePath = (req.file.path);
    const data = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(data);

    if (!Array.isArray(parsed)) {
        return next(new appError(400, "Parsed file must be an array"));
    }

    const problems = parsed;


    (req.body);
    if (!name || !description) {
        return next(new appError(401, "name and description are required for creating contest"));
    }

    const contest = await Contest.create({
        name,
        description,
        problems
    });

    res.status(201).json({
        status: "success",
        data: contest
    });
});

exports.getContest = catchAsync(async (req, res, next) => {
    const contest = await Contest.findById(req.params.id);
    if (!contest) {
        return next(new appError(401, "Contest not Found"));
    }
    res.status(201).json({
        status: "success",
        data: contest
    });
});

exports.getAllContests = catchAsync(async (req, res, next) => {
    const contests = await Contest.find();
    if (contests.length === 0) {
        return next(new appError(401, "Currently there are no contests"));
    }
    res.status(201).json({
        status: "success",
        data: contests
    });
});