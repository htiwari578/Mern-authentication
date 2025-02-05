import mongoose from 'mongoose'
import { NONGO_URI } from '../constants/env';

const connectDb = async ()=>{
    try {
        await mongoose.connect(NONGO_URI);
        console.log("Database connected")
    } catch (error) {
        console.log("Database not connected")
    }
}
export default connectDb;