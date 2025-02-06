import "dotenv/config";
import express from 'express'
import cors from 'cors'
import connectDb from './config/db';
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route";
import errorHandler from "./middleware/errorHandler";




const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
    cors({
        origin: APP_ORIGIN,
        credentials:true,
    })
)
app.use(cookieParser());

app.use('/auth', authRoutes)


app.use(errorHandler);


app.listen(PORT , async()=> {
    console.log(`Server running on port ${PORT} in ${NODE_ENV}`);
    await connectDb();
})