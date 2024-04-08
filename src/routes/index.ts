import userRoutes from "./userRoutes";
import  Express  from "express";
const router = Express.Router();
router.use('/users',userRoutes);
export default router;
