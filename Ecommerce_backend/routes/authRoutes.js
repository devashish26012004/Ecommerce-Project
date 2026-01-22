import { Router } from "express";
import { loginUser, signupUser } from "../controller/authController.js";
import { authentication } from "../middleware/authentication.js";

const authRouter = Router();

authRouter.post("/login", authentication, loginUser);

authRouter.post("/signup", signupUser);

export default authRouter;
