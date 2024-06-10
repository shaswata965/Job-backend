const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const jobRoutes = require("./routes/job-routes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Access, Authorization"
  );
  res.setHeader("Acess-Control-Allow-Methods", "GET, POST, PUT, DELETE");

  next();
});

app.use("/jobs", jobRoutes);

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.code || 500).json(error.message || "Unknown Error Occured");
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qqhb3.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("Connected to Database");
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
