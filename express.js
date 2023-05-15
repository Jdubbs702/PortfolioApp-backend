const fs = require('fs');

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");

const HttpError = require("./models/http-error");
const projectRoute = require("./routes/project");
const emailRoute = require("./routes/email");
const usersRoutes = require('./routes/users');
const petsRoutes = require('./routes/pets');

const app = express();
const PORT = process.env.PORT || 5000;
// origins
app.use(
  cors({
    origin: ["http://127.0.0.1:3000", "http://localhost:3000", "https://portfolio-freelance-46851.web.app", "https://pet-portal-eea94.web.app"],
  })
);

app.use(bodyParser.json());
app.use(morgan("tiny"));

cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_API_CLOUD_NAME}`,
  api_key: `${process.env.CLOUDINARY_API_KEY}`,
  api_secret: `${process.env.CLOUDINARY_API_SECRET}`,
});

//portfolio routes
app.use("/project", projectRoute);
app.use("/email", emailRoute);
//pet routes
app.use('/users', usersRoutes);
app.use('/pets', petsRoutes);

//error handling
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((err, req, res, next) => {
  console.log('ERROR', err);
  if (req.file) {
      fs.unlink(req.file.path, (err) => { console.log(err); });
  }
  res.status(400).send({
      error: true,
      message: err.message || err
  });
});

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.w3cdl.mongodb.net/${process.env.DB_NAME2}?retryWrites=true&w=majority`;
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

// Wait for connection to be established
mongoose.connection.once('open', async function() {
  // Retrieve the collections in the database
  const collections = await mongoose.connection.db.listCollections().toArray();
  
  // Log the names of the collections
  collections.forEach(function(collection) {
    console.log(collection.name);
  });
});





