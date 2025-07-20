import { UNAUTHORIZED } from "../constants/http.js";
export const protectRoute = async (req, res, next) => {
    if (!req.auth.isAuthenticated) {
        return res.status(UNAUTHORIZED).json({ message: "Unauthorized - must be logged in" });
    }
    return next();
};
