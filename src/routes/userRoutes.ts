import { allUsers, googleAuthCallback } from "../controllers/userController";
import express from "express";
import passport from "passport";

const userRoutes = express.Router();
userRoutes.get("/", passport.authenticate("google"), googleAuthCallback);

export default userRoutes;