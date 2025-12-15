const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieparser = require("cookie-parser");
app.use(cookieparser());
dotenv.config({ path: "./config.env" });
app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
}));
app.use(express.urlencoded({ extended: true }));


const userRouter = require("./Routes/userRouter");
const contestRoutes = require("./Routes/contestRouter");
const perfomanceRoutes = require("./Routes/perfomanceRouter");

app.use(express.json());
app.use(morgan("dev"));


app.use("/api/v1/users", userRouter);
app.use("/api/v1/contest", contestRoutes)
app.use("/api/v1/perfomance", perfomanceRoutes);


app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "Internal Server Error";

    console.error(err.message);
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message || "Something Went Wrong"
    })
})


module.exports = app;