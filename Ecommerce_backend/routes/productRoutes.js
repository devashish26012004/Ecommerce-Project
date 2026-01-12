import { Router } from "express";
import {
  createProduct,
  getAllProducts,
} from "../controller/productController.js";

const productRouter = Router();

productRouter.get("/", getAllProducts);

productRouter.post("/", createProduct);

// productRouter.get("/:id");

// productRouter.put("/:id");

// productRouter.delete("/:id");

export default productRouter;
