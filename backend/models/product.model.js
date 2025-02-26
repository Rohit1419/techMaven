import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: [String],
    required: true,
  },
  rating: {
    type: Number,
    required: false,
  },
  reviews: {
    type: [String],
    required: false,
  },
  specifications: {
    type: String,
    required: true,
  },

  productReview: {
    type: String,
    required: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
