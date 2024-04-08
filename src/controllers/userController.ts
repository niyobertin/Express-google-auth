import { getAllUsers } from "../service/userService";
import { Request,Response } from "express";

export const allUsers = async(req:Request,res:Response) =>{
 try {
    const users = await getAllUsers();
    res.status(200).json({
        status:200,
        data:users
    })
 } catch (error:any) {
    res.status(500).json({
        status:500,
        message:`Error ${error.mesage}`
    })
 }
}

