import { aj } from "../config/arcjet.js";
import { FORBIDDEN, TOO_MANY_REQUESTS } from "../constants/http.js";
export const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, {
            requested: 1, // each request consume 1 token
        });
        // handle denied requests
        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(TOO_MANY_REQUESTS).json({
                    error: "Too Many Requests",
                    message: "Rate limit exceeded. please try again later."
                });
            }
            else if (decision.reason.isBot()) {
                return res.status(FORBIDDEN).json({
                    error: "Bot access denied",
                    message: "Automated requests are not allowed."
                });
            }
            else {
                return res.status(FORBIDDEN).json({
                    error: "Forbidden",
                    message: "Access denied by security policy."
                });
            }
        }
        // check for spoofed bots
        if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
            return res.status(FORBIDDEN).json({
                error: "Spoofed bot detected",
                message: "Malicious bot activity detected."
            });
        }
        next();
    }
    catch (error) {
        console.log("Arcjet middleware error:", error);
        // allow request to continue if Arcjet fails
        next();
    }
};
