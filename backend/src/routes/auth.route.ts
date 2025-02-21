import { Router } from "express";
import { userLogin, userLogout, userRegister } from "../controllers/auth.controller";



const authRoutes = Router();

authRoutes.post('/register', userRegister); 
authRoutes.post('/login', userLogin); 
authRoutes.get('/logout' , userLogout);

export default authRoutes;