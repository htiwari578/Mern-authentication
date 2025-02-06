import { z } from "zod";
import catchError from "../utils/catchError";


const registerSchema = z.object({
    email: z.string().email().min(1).max(255),
    password: z.string().min(8).max(255),
    confirmPassword: z.string().min(8).max(255),
    userAgent: z.string().optional(),
})
.refine((data) => data.password === data.confirmPassword,{
    message: "Password do not match",
    path: ["confirmPassword"],
})


export const userRegister = catchError (async (req,res) => {
    //validate request
    const request = registerSchema.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
    })

    }
)