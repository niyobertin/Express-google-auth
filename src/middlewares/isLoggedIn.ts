import jwt from "jsonwebtoken";
import { UserAttributes } from "../models/user";
import { getUserByPk } from "../service/userService";
import { NextFunction, Request, Response } from "express";

export const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined = undefined;
    try{
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            return res.status(401).json({
                status: "Unauthorized",
                message: "You are not logged in. Please login to continue.",
            });
        }
        const secret: string | undefined = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT secret is not defined.");
        }
        const decoded: any = jwt.verify(token, secret);
        const loggedUser: UserAttributes | any = await getUserByPk(decoded.userId);
        if (!loggedUser) {
            return res.status(401).json({
                status: "Unauthorized",
                message: "User not found, login again to continue",
            });
        }
        req.user = loggedUser;
        next();
    } catch (error: any) {
        return res.status(401).json({
            status: "Error",
            error: error.message + ". You're not logged in!",
        });
    }
} 