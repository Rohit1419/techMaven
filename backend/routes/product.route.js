import { Router } from "express";
import {
  getAllProducts,
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImages,
  getCategoryProducts,
} from "../controllers/product.controller.js";

import upload from "../config/cloudinary.js";

const router = Router();

router.post("/upload", upload.array("images", 20), uploadImages);

router.get("/products", getAllProducts);

router.get("/products/:id", getProductByID);

router.post("/products", createProduct);

router.put("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);

router.get("/products/category/:category", getCategoryProducts);

export default router;
