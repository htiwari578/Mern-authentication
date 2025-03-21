
import catchError from "../utils/catchError";
import { createAccount, loginUser } from "../services/authService";
import { CREATED, OK, UNAUTHORIZED } from "../constants/http";
import { clearAuthCookies, setAuthCookies } from "../utils/cookies";
import { loginSchema, registerSchema } from "./auth.Schema";
import { AccessTokenPayload, verifyToken } from "../utils/jwt";
import SessionModel from "../models/session.model";
import appAssert from "../utils/appAssert";





export const userRegister = catchError (async (req,res) => {
    //validate request
    const request = registerSchema.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
    });
    //call service
    const {user,accessToken,refreshToken} =  await createAccount(request);
    return setAuthCookies({res , accessToken , refreshToken})
    .status(CREATED).json(user)
    }
)


export const userLogin = catchError (async (req,res)=> {
    const request = loginSchema.parse({...req.body,
        userAgent: req.headers["user-agent"],
    });

    const {accessToken, refreshToken} = await loginUser(request)
    return setAuthCookies({res , accessToken , refreshToken})
    .status(OK).json({
        message: "Login successfull",
    });
});

export const userLogout = catchError(async(req,res) =>{
    const accessToken = req.cookies.accessToken as string | undefined;
    const {payload,error} =  verifyToken(accessToken || " ");

    if(payload){
        await SessionModel.findByIdAndDelete(payload.sessionId);
    }
    return clearAuthCookies(res).status(OK).json({
        message:"Logout successfully",
    });
});

export const refreshHandler = catchError(async(req,res)=>{
    const refreshToken = req.cookies.refreshToken as string | undefined;
    appAssert(refreshToken , UNAUTHORIZED ,"Missing refresh token");


})