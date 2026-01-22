import { Router } from "express";
import {
  destroyUser,
  getAllUsers,
  getUserDetails,
  updateUser,
} from "../controller/userController.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);

userRouter
  .route("/:id")
  .get(getUserDetails)
  .put(updateUser)
  .delete(destroyUser);

export default userRouter;
