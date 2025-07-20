import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";
import { ARCJET_KEY } from "../constants/env.js";
// initialize Arcjet with security rules
export const aj = arcjet({
    key: ARCJET_KEY,
    characteristics: ["ip.src"],
    rules: [
        // shield protects your app common attacks e.g SQL injection, XSS, CSRF attacks
        shield({ mode: "LIVE" }),
        // bot detecion - block all bots except search engines
        detectBot({
            mode: "LIVE",
            allow: [
                "CATEGORY:SEARCH_ENGINE"
                // allow legitimate srearch engine bots
            ],
        }),
        //rate limiting with token bucket algorithm
        tokenBucket({
            mode: "LIVE",
            refillRate: 20, // tokens added per interval
            interval: 10, // interval in seconds (10 seconds)
            capacity: 30, // maximum tokens in bucket
        }),
    ]
});
