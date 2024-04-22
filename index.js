const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3001

const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const routes = require("./routers");
const app = express();

app.use(
  cors({
    origin: JSON.parse(process.env.ALLOWED_ORIGINS),
    optionsSuccessStatus: 200,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    if (mongoose.connection.readyState === 1) {
      next();
    } else {
      res.status(500);
      res.json({ error: "Internal Server Error - Database Disconnected" });
    }
  });

app.use("/api/auth", routes.auth);
app.use("/api/inventories", passport.authenticate("jwt", {session:false}), routes.inventory);


app.use(function (err, req, res, next) {
  console.error("ERROR:", err.name, ": ", err.message);
  res.status(err.status || 500);
  res.json({ error: err });
});

const { connectToDB } = require("./database");

const startServer = async () => {
  app.listen(port, () => {
    console.log(`Server listinening on http://localhost:${port}`);
  });

  try {
    await connectToDB();
    console.log("Database Connected.");
  } catch (err) {
    console.log(">ERROR :", err.name);
    console.log(">Error Message :", err.message);
    console.log(">Error Code :", err.code ? err.code : 0);
    console.log(">Error CodeName :", err.codeName ? err.codeName : "null");
  }

 
};
// checking for PR merge 
startServer();