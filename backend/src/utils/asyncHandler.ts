import { NextFunction, Request, Response } from "express"

type AsyncHandler=(
    req: Request,
    res: Response,
    next: NextFunction
)=> Promise<any>

const asyncHandler = (controller: AsyncHandler): AsyncHandler=>{
    return async(req, res, next)=>{
        await controller(req, res, next).catch((e)=> next(e))
    }
}

export default asyncHandler;