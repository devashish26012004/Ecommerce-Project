import { Router } from "express";
import {
  destroyUser,
  getAllUsers,
  getUserDetails,
  updateUser,
} from "../controller/userController.js";

import { authentication, authorization } from "../middleware/authentication.js";

const userRouter = Router();

userRouter.get("/", authentication, authorization, getAllUsers);

userRouter
  .route("/:id")
  .get(getUserDetails)
  .put(updateUser)
  .delete(destroyUser);

export default userRouter;
