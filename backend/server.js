import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.js";

dotenv.config();

const app = express();

app.use(express.json()); //allows us to accept dat and req.body

app.post("/api/products", async (req, res) => {
  const product = req.body; //user sends data
  console.log("product", product);
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in creating product", error.message);
    console.status(500).json({ success: false, message: "Server Error" });
  }
});

app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000 hello world");
});
//MtZjhllBlB7sQBto
