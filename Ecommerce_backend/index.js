import dotenv from "dotenv";
dotenv.config({ override: true });

import express from "express";
import connectDB from "./db/dbConnection.js";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productRoutes.js";

const app = express();
const PORT = 8080;

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Ecommerce Backend is running");
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
