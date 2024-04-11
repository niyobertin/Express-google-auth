import User from "../models/user";
import { Request, Response, NextFunction } from "express";

export const isProfileOwner = async (req: Request, res: Response, next: NextFunction) => {
    const loggedUser: any = req.user
    const { id } = req.params
    try{
        const user: any = await User.findByPk(Number(id));
        if(loggedUser.id === user.id){
            return next()
        } else {
            return res.status(401).json({
                message: "You are not allowed to perform this action!",
              });
        }
    } catch(err: any){
        return res.status(500).json({
            message: err.message
        })
    }
} 