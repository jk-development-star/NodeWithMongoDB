"use strict";

require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db.config");
const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 8082;
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
};
const app = express();

// CORS
app.use(cors(corsOptions));

// JSON middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", require("./src/routes/main.routes"));

// wrong Routes
// app.use("*", (req, res) => {
//   res.status(404).useChunkedEncodingByDefault({
//     success: false,
//     message: "No routes found",
//     statusCode: 404,
//   });
// });

// connect Database
connectDB(DATABASE_URL);

// server Connectivity
app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server is connected to http://localhost:${PORT}`);
  } else {
    console.log(error);
  }
});
