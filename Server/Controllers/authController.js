const catchAsync = require("../Utils/catchAsync");
const jwt = require("jsonwebtoken");
const appError = require("../Utils/appError");
const secret = process.env.JWT_SECRET;
const User = require("../Models/userModel");
const { createEmail } = require("../Utils/Emails/email");

exports.register = catchAsync(async (req, res, next) => {
    const { name, password, email } = req.body;

    const alreadyExist = await User.findOne({ email, accountVerified: true });
    if (alreadyExist) {
        return next(new appError(401, "User already exists"));
    }


    if (!name || !password || !email) {
        return next(new appError(401, "enter all credentials"));
    }

    if (password.length <= 7) {
        return next(new appError(401, "Password length must be atleast 8"));
    }

    const allUsers = await User.find({ email });
    if (allUsers.length >= 5) {
        const lastUser = await User.find({ email }).sort({ createdAt: 1 });
        if (lastUser[4].createdAt >= Date.now() - 10 * 60 * 1000) {
            return next(new appError(401, "So many attempts , please try after some time"));
        }
    }
    const user = await User.create({ name, password, email });


    const otp = user.generateOTP();
    await user.save();
    await createEmail(res, email, "Otp Verification", otp);

});

exports.ensureAuthenticated = catchAsync(async (req, res, next) => {
    const { jwtToken } = req.cookies;

    if (!jwtToken) {
        return next(new appError(401, "User is not logged in"));
    }
    const decoded = jwt.verify(jwtToken, secret);

    next();
});

exports.getUserBytoken = catchAsync(async (req, res, next) => {
    const { jwtToken } = req.cookies;
    
    if (!jwtToken) {
        return next(new appError(401, "User is not logged in"));
    }
    const decoded = jwt.verify(jwtToken, secret);

    const user = await User.findById(decoded._id);
    res.status(201).json({
        status: "success",
        data: user
    });
});

function sendToken(res, token) {
    res.cookie("jwtToken", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
    });
}

exports.verifyOtp = catchAsync(async (req, res, next) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return next(new appError(401, "Enter otp and email to continue"));
    }
    const checkUser = (await User.find({ email }));
    // console.log(checkUser);
    if (checkUser.length === 0) {
        return next(new appError(400, "No user requesting otp"));
    }
    const user = (await User.find({ email }).sort({ createdAt: -1 }))[0];
    // console.log(user);
    const correctCode = user.verificationCode;
    if (+otp !== +correctCode) {
        return next(new appError(401, "Otp is incorrect"));
    }
    if (user.verificationCodeExpires <= (Date.now())) {
        return next(new appError(401, "OTP expired , request another"));
    }
    const creationTime = user.createdAt;
    await User.deleteMany({ email, createdAt: { $lt: creationTime } });

    user.accountVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpires = null;
    await user.save();
    const token = jwt.sign({ _id: user._id }, secret);
    sendToken(res, token);
    res.status(201).json({
        status: "success",
        data: user
    })
});

exports.signIn = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new appError(401, "email and password are required"));
    }

    const user = await User.findOne({ email, accountVerified: true });
    if (!user) {
        return next(new appError(401, "User does not exist"));
    }
    const verifyPass = await user.verifyPassword(password);
    if (!verifyPass) {
        return next(new appError(401, "Password is incorrect"))
    }
    const token = jwt.sign({ _id: user._id }, secret);
    sendToken(res, token);
    res.status(201).json({
        status: "success",
        data: user
    });
});

exports.checkLogin = catchAsync(async (req, res, next) => {
    console.log(req.cookies);
    if (!req.cookies.jwtToken) {
        return next(new appError(401, "You are currently logged Out !"));
    }
    
    try {
        const decoded = jwt.verify(req.cookies.jwtToken, secret);
        req.user = decoded._id;
        next();
    } catch (error) {
        // Add error handling for invalid/expired tokens
        return next(new appError(401, "Invalid or expired token"));
    }
});

exports.signOut = catchAsync(async (req, res, next) => {
    res.cookie('jwtToken', '', {
        httpOnly: true,
        expires: new Date(0), // immediately expire
        path: '/' // Add this to clear cookie from all paths
    });
    
    res.status(200).json({
        status: "success",
        message: "User logged out!"
    });
});
