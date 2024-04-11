import { getUsers } from "../controllers/userController";
import express from "express";
import { updateUserProfile, getUserById } from "../controllers/userController";
import upload from "../middlewares/multer";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import { isProfileOwner } from "../middlewares/isProfileOwner";

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.patch('/:id', isLoggedIn, isProfileOwner, upload.single("profileImage"), updateUserProfile);

export default userRouter;