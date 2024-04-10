import { Router } from "express"
import { googleAuthCallback } from "../controllers/userController";
import passport from "passport";

const googleAuth = Router()

googleAuth.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] }),
  );
  
googleAuth.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    googleAuthCallback
  );

export default googleAuth;