import { ErrorRequestHandler, Response } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http";
import { z } from "zod";


const handleZodError = (res:Response , error: z.ZodError) => {
  const errors = error.issues.map((err)=> ({
    path: err.path.join("."),
    message: err.message
  }))
  res.status(BAD_REQUEST).json({
    message:error.message,
    errors,
  })
}


// Error handler middleware
const errorHandler: ErrorRequestHandler = (error ,req, res, next )=> { 
  console.log(`Error occurred at PATH: ${req.path}`);
  console.log("Error details:", error);

  if(error instanceof z.ZodError){
    return handleZodError(res , error);
  }

  res.status(INTERNAL_SERVER_ERROR).send("Internal server error");
};

export default errorHandler;