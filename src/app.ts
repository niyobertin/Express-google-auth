import  Express  from "express";
import session from 'express-session'
import dotenv from "dotenv";
import cors from 'cors'
import passport from 'passport'
import router from "./routes/index";
import { Request, Response } from "express";
import Mailer from './email/email';
import googleAuth from "./routes/authRouter";

dotenv.config();
const app = Express();

require('./config/google-auth')
require('./models/user')

app.use(
    session({
      secret: `${process.env.SESSION_SECRET}`,
      resave: false,
      saveUninitialized: true,
    })
  );

app.use(passport.initialize())
app.use(passport.session())
app.use(Express.json());
app.use(cors());

app.use('/api/v1/', router);
app.use('/', googleAuth)

app.get('/', async (req: Request, res: Response) => {
    
    res.send('Welcome to the email service')
})

app.get('/testMail', async (reg: Request, res: Response) => {
    try{
        await Mailer.sendMail('team2.expressauth@gmail.com','Test to node mailer service','Testing the email service')
        console.log('Email sent')
        
        res.send(`Email sent from ${process.env.USER} successfully `)
    } catch (error){
        console.error(`Error sending email: ${error}`);
    }
})

const port = process.env.PORT || 8080;
app.listen(port,() =>{
    console.log(`server is running on port ${port}`)
})