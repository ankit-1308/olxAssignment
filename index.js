const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3001

const cors = require("cors");
const morgan = require("morgan");
const express = require("express");


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




app.use(function (err, req, res, next) {
  console.error("ERROR:", err.name, ": ", err.message);
  res.status(err.status || 500);
  res.json({ error: err });
});



const startServer = async () => {
  app.listen(port, () => {
    console.log(`Server listinening on http://localhost:${port}`);
  });

 
};

startServer();