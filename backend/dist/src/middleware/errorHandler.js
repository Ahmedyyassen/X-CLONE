import AppError from "../utils/AppError.js";
import { INTERNAL_SERVER_ERROR } from "../constants/http.js";
export const errorHandler = (error, req, res, next) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({ mesaage: error.message });
    }
    return res.status(INTERNAL_SERVER_ERROR).json({ mesaage: "Internal server error" });
};
