import "dotenv/config";
import express from 'express'
import connectDb from './config/db';



const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT , async()=> {
    console.log(`Server running on port ${PORT}`);
    await connectDb();
})