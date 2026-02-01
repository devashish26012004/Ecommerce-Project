import { Router } from "express";
import { loginUser, registerUser } from "../controller/authController.js";
import { authentication } from "../middleware/authentication.js";

const authRouter = Router();

authRouter.post("/login", loginUser);

authRouter.post("/register", registerUser);

export default authRouter;
