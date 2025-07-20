import { ErrorRequestHandler } from "express";
import AppError from "../utils/AppError";
import { INTERNAL_SERVER_ERROR } from "../constants/http";


export const errorHandler: ErrorRequestHandler = (error, req, res, next)=>{

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({mesaage: error.message});
    }
    return res.status(INTERNAL_SERVER_ERROR).json({mesaage: "Internal server error"});

}