
import catchError from "../utils/catchError";
import { createAccount, loginUser } from "../services/authService";
import { CREATED, OK } from "../constants/http";
import { setAuthCookies } from "../utils/cookies";
import { loginSchema, registerSchema } from "./auth.Schema";





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