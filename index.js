require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const auth = require("./routes/auth");
const productModel = require("./models/product.model");
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

// create products
app.post("/api/products", async (req, res) => {
  try {
    const product = productModel.create(req.body);
    res.status(200).json(product);
  } catch (error) {}
});

// get products
app.get("/api/products", async (req, res) => {
  try {
    const product = await productModel.find({});
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// get one products
app.get("/api/product/:id", async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// update product
app.put("/api/product/:id", async (req, res) => {
  try {
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    if (!product) return res.status(404).json({ message: "product not found" });

    const updatedProduct = await productModel.findById(req.params.id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete product
app.delete("/api/product/:id", async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);

    if (!product) return res.status(404).json({ message: "product not found" });

    res.status(200).json({ message: "product deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

mongoose.connect(`${BASE_MONGO_URI}${process.env.MONGO_URI}`).then(() => {
  console.log("CONNECTED");
  app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
  });
});

app.use("/auth", auth);
