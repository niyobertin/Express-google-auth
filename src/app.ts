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
    
    res.send("<div style ='text-align: center'><h1>Welcome to Our Website</h1><p>Click Below to sign in with google:</p><a href='/auth/google'>Continue with Google</a></div>");
})


const port = process.env.PORT || 8080;
app.listen(port,() =>{
    console.log(`server is running on port ${port}`)
})