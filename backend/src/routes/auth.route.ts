import { Router } from "express";
import { refreshHandler, userLogin, userLogout, userRegister } from "../controllers/auth.controller";



const authRoutes = Router();

authRoutes.post('/register', userRegister); 
authRoutes.post('/login', userLogin); 
authRoutes.get('/refresh' , refreshHandler);
authRoutes.get('/logout' , userLogout);

export default authRoutes;