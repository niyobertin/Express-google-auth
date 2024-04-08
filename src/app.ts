import  Express  from "express";
import dotenv from "dotenv";
import router from "./routes/index";
dotenv.config();
const app = Express();
app.use(Express.json());
app.use('/api/v1/',router);

const port = process.env.PORT || 8080;
app.listen(port,() =>{
    console.log(`server is running on port ${port}`)
})