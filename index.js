require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const auth = require("./routes/auth");
const PORT = 8080;
const encodedPassword = encodeURIComponent(process.env.MONGO_PWD);
const BASE_MONGO_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${encodedPassword}`;

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

mongoose.connect(`${BASE_MONGO_URI}${process.env.MONGO_URI}`).then(() => {
  console.log("CONNECTED");
  app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
  });
});

app.use("/auth", auth);
