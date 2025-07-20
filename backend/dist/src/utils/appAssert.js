import assert from "assert";
import AppError from "./AppError.js";
const appAssert = (condition, httpStatusCode, message) => assert(condition, new AppError(httpStatusCode, message));
export default appAssert;
