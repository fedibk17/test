require("dotenv").config();

// console.log(process.env.NODE_ENV)

const express = require("express");

//create app with express
const app = express();

const connectDB = require("./config/db.config");
const { Mongoose, default: mongoose } = require("mongoose");
//set the port , listen for request 
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const cookieParser = require("cookie-parser");

//invoke the function to connect to the database
connectDB();

app.use(cors({
    origin: "http://localhost:5000",
    credentials: true, //to accept cookies sent with the request
}))


app.use(cookieParser());
app.use(express.json());

app.get("/", (req,res)=> {
    res.send("hello");
})

app.use("/auth", require("./routes/authRoutes"));
app.use("/user", require("./routes/userRoutes"));


mongoose.connection.once("open", ()=> {
    console.log("Connected to database")

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
});
});

mongoose.connection.on("error", (err)=>{
console.log(err)
});
