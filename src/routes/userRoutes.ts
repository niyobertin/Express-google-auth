import { getUsers } from "../controllers/userController";
import express from "express";
import { updateUserProfile, getUserById } from "../controllers/userController";
import upload from "../middlewares/multer";

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.patch('/:id', upload.single("profileImage"), updateUserProfile);

export default userRouter;