require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

const HttpError = require("./models/http-error");
const projectRoute = require("./routes/project");
const emailRoute = require("./routes/email");

const app = express();
const PORT = process.env.PORT || 5000;
// origins
app.use(
  cors({
    origin: ["http://127.0.0.1:3000", "https://portfolio-freelance-46851.web.app"],
  })
);

app.use(bodyParser.json());
app.use(morgan("tiny"));

cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_API_CLOUD_NAME}`,
  api_key: `${process.env.CLOUDINARY_API_KEY}`,
  api_secret: `${process.env.CLOUDINARY_API_SECRET}`,
});

//routes
app.use("/project", projectRoute);
app.use("/email", emailRoute);

//error handling
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.w3cdl.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(url)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server listening on port: ${PORT}`);
    });
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });
