const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

//env config
dotenv.config({
    path: "./config/config.env",
  
  });

// Routes import
const userRoute=require('./routes/userRoute');
const blogRoute=require('./routes/blogRoute');

//mongodb connection
connectDB();

//rest objecct
const app = express();




//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


// Routes
app.use('/api/v1/users',userRoute);
app.use('/api/v1/blog',blogRoute);


//static files
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});


// Port
const PORT = process.env.PORT || 4000;
//listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode port no ${PORT}`
  );
});
