import { Router } from "express";
import {
  destroyUser,
  getAllUsers,
  getUserDetails,
  updateUser,
} from "../controller/userController.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);

// userRouter.post("/"); // later

userRouter.get("/:id", getUserDetails);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", destroyUser);

export default userRouter;
