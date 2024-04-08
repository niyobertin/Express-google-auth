import { allUsers } from "../controllers/userController";
import express from "express";

const userRoutes = express.Router();
userRoutes.get("/",allUsers);

export default userRoutes;