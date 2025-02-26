import express from "express";
import cors from "cors";
import routes from "./routes/product.route.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import path from "path";

const app = express();
dotenv.config();
//coneect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// middleware
app.use(cors());
app.use(express.json());

app.use("/api", routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
