const nodemailer = require("nodemailer");
const emailTemplate = require("./emailTemplate");


exports.createEmail = async (res, userMail, subject, otp) => {
    const transporter = nodemailer.createTransport({
        port: process.env.SMTP_PORT,
        host: process.env.SMTP_HOST,
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        },
        secure: true
    });

    const template = emailTemplate(otp);

    transporter.sendMail({
        from: process.env.SMTP_USER,
        to: userMail,
        subject,
        html: template
    });

    return res.status(201).json({
        status: "success",
        message: "OTP sent successfully"
    });
}

