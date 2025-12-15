const app = require("./index");
const mongoose = require("mongoose");


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`app is running on port ${port}`);
})

mongoose.connect("mongodb://127.0.0.1:27017/contestApp").then(() => {
    console.log("MongoDB Connected");
});