const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const expenseRoute = require("./routes/expenseRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes Middleware
app.use(userRoute);
app.use(expenseRoute);

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Reach_io");
});

// Error Middleware
app.use(errorHandler);
// Connect to DB and start server

const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
