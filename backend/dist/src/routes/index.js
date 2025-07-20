import { Router } from "express";
import userRoute from "./user.route.js";
import postRoute from "./post.route.js";
import notificationRoute from "./notification.route.js";
import commentRoute from "./comment.route.js";
const router = Router();
export default () => {
    userRoute(router);
    postRoute(router);
    notificationRoute(router);
    commentRoute(router);
    return router;
};
