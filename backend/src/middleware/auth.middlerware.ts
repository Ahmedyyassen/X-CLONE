import { NextFunction, Request, Response } from "express";
import { UNAUTHORIZED } from "../constants/http";

export const protectRoute = async(req:Request, res:Response, next:NextFunction)=>{
    if (!req.auth.isAuthenticated) {
        return res.status(UNAUTHORIZED).json({ message: "Unauthorized - must be logged in"})
    }
    return next();
}