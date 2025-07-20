import assert from "assert";
import { HttpStatusCode } from "../constants/http";
import AppError from "./AppError";


type AppAssertType=(
    condition: any,
    statusCode: HttpStatusCode,
    message: string
) => asserts condition;

const appAssert:AppAssertType = (
    condition,
    httpStatusCode,
    message
)=> assert(condition, new AppError(httpStatusCode, message));

export default appAssert;