import { getAllUsers, getUserByPk } from "../service/userService";
import { Request,Response } from "express";
import { Profile } from "passport-google-oauth20";
import { createOrUpdateUser, updateUser } from "../service/userService";
import { generateUserToken } from "../helper/jwtToken";
import uploadFile from "../middlewares/cloudinary";
import Mailer from "../email/email"


export const getUsers = async(req:Request,res:Response) =>{
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


export const googleAuthCallback = async (req: Request, res: Response) => {
  try {
    const profile = req.user as Profile;
    
    const user = await createOrUpdateUser(profile);
    const token = await generateUserToken(user)
    res.status(200).json({
      message: "sucess",
      token: token
    })
  } catch (err) {
    console.error(err);
    res.status(500).send("Error authenticating with Google");
  }
};

export const getUserById = async (req:Request, res:Response) => {
  try{
      const id = Number(req.params.id)
      const user = await getUserByPk(id);
      return res.status(200).json(user);
  } catch(err: any){
      return res.status(500).json({
          message: `Error ${err.message}`
      })
  }
}

export const updateUserProfile = async (req:Request, res:Response) => {
  try{
      const {name, email} = req.body
      // @ts-ignore
      const { file } = req
      const id = Number(req.params.id)
      if(email){
          return res.status(403).json({
              message: "Updating email is not allowed"
          })
      }
      if(!name && !file){
          return res.status(400).json({
              message: "Please add a field to update"
          })
      }
      let updateInfo = {}
      if(name){
          updateInfo = {...updateInfo, name }
      }
      if(file){
          const result: any = await uploadFile(file)
          updateInfo = {...updateInfo, profileImage: result}
      }

      const updatedUser = await updateUser(id, updateInfo)

      const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #007BFF;
            color: #fff;
            padding: 5px 0;
            text-align: center;
        }
        .content {
            background-color: #fff;
            padding: 20px;
        }
        .button {
            text-align: center;
            margin-top: 20px;
        }
        .button a {
            display: inline-block;
            background-color: #007BFF;
            color: #fff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
        }
        .footer {
            background-color: #007BFF;
            color: #fff;
            padding: 10px 0;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Email Verification</h1>
        </div>
        <div class="content">
            <h2>Dear  ${updatedUser.name}  </h2>
           <p> Your Profile was updated successfully</p>
           <p>These Fields were updated <br> ${updateInfo}</p>
            
        </div>
        <div class="footer">
            &copy; ${new Date().getFullYear()} by Team 2 with 🤍
        </div>
    </div>
</body>
</html>
`;

      Mailer.sendMail(updatedUser.email,`Your Profile was Updated`, html)
        
   

      return res.status(200).json({
          message: "your account was updated successfully!"
      })
      
  } catch(err: any){
      return res.status(500).json({
          message: `Error ${err}`
      })
  }
}

