import { Router } from "express";
import { userLogin, userRegister } from "../controllers/auth.controller";



const authRoutes = Router();

authRoutes.post('/register', userRegister); 
authRoutes.post('/login', userLogin); 

export default authRoutes;