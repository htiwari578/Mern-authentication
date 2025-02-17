import jwt from "jsonwebtoken";
import VerificationCodeType from "../constants/verificationCodeType";
import SessionModel from "../models/session.model";
import User from "../models/user.model";
import VerificationCodeModel from "../models/verificationCode";
import { oneYearFromNow } from "../utils/date";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
import appAssert from "../utils/appAssert";
import { CONFLICT, UNAUTHORIZED } from "../constants/http";


export type CreateAccountParams = {
    email: string;
    password: string;
    userAgent?: string;
}
export const createAccount = async (data: CreateAccountParams)=> {
    //verify existing user dosn't exist
    const existingUser = await User.exists({
        email: data.email,
    });
    appAssert(
        !existingUser, CONFLICT , "Email already in use"
    );

    // if(existingUser){
    //     throw new Error("User already exists");
    // }

    //create user 
    const user = await User.create({
        email: data.email,
        password: data.password,
    });

    //create verification code
    const verificationCode = await VerificationCodeModel.create({
        userId: user._id,
        type: VerificationCodeType.EmailVerification,
        expiresAt: oneYearFromNow()
    })


    //create session

    const session = await SessionModel.create({
        userId: user._id,
        userAgent: data.userAgent,
    });

    //sign access token & refresh token

    const refreshToken = jwt.sign(
        {sessionId: session._id},
        JWT_REFRESH_SECRET,
        {
            audience: ["user"],
            expiresIn: "30d"
        }
    );

    const accessToken = jwt.sign(
        {
            userId: user._id,
            sessionId: session._id},
        JWT_SECRET,
        {
            audience: ["user"],
            expiresIn: "15m"
        }
    );

    //return user & tokens
    return {
        user: user.omitPassword(),
        accessToken,
        refreshToken,
    };
};


 type loginParams = {
    email: string;
    password: string;
    userAgent?: string;
}
export const loginUser = async ({email,password,userAgent}:loginParams  ) => {
    //get user email
    const user = await User.findOne({email});
    appAssert(user, UNAUTHORIZED, "Invalid email or password");

    //validate password from the user
    const isValid = await  user.comparePassword(password);
    appAssert(isValid , UNAUTHORIZED, "Invalid email or Password");

    const userId = user._id;

    //create session
    const session = await SessionModel.create({
        userId,
        userAgent,
    });

    const sessionInfo = {
        sessionId: session._id,

    }
    
    const refreshToken = jwt.sign(
        sessionInfo,
        JWT_REFRESH_SECRET,
        {
            audience: ["user"],
            expiresIn: "30d"
        }
    );

    const accessToken = jwt.sign(
        {
            ...sessionInfo,
            sessionId: session._id},
        JWT_SECRET,
        {
            audience: ["user"],
            expiresIn: "15m"
        }
    );
    //return user & tokens
    return {
        user: user.omitPassword(),
        accessToken,
        refreshToken,
    }



}