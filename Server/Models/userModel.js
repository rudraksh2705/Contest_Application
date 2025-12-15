const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        // unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        // maxLength: 16,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "Participant"],
        default: "Participant"
    },
    accountVerified: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: Number,
    },
    verificationCodeExpires: {
        type: Date
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};


userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.generateOTP = function () {
    const otp = generateCode();
    this.verificationCode = +otp;
    this.verificationCodeExpires = new Date(Date.now() + 5 * 60 * 1000);
    return otp;
}

userSchema.methods.verifyPassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password);
}



const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;