import { Router } from "express";
import { userRegister } from "../controllers/auth.controller";



const authRoutes = Router();

authRoutes.post('/register', userRegister); 

export default authRoutes;