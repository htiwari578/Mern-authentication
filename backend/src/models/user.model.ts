import mongoose from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";


export interface UserDocument extends mongoose.Document {
    email: string;
    password: string;
    verified:boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(val:string): Promise<boolean>;
    omitPassword(): Pick<UserDocument, "_id" | "email" | "verified" | "createdAt" | "updatedAt" | "__v">;
}

const userSchema = new mongoose.Schema<UserDocument>({
    email: {
        type: String,
        unique:true,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    verified: {
        type:Boolean,
        required:true,
        default:false
    }
},{timestamps:true})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password =await hashValue(this.password);

});

userSchema.methods.comparePassword = async function(val: string){
    return compareValue(val ,this.password)
}

const User = mongoose.model<UserDocument>('User', userSchema);
export default User;
