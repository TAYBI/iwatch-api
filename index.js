require("dotenv").config({ silent: true });
const express = require("express");
const cors = require("cors");

const auth = require("./routes/auth");
const PORT = 8080;

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

app.use("/auth", auth);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
