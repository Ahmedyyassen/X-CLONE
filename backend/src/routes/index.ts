import { Router } from "express";
import userRoute from "./user.route";
import postRoute from "./post.route";
import notificationRoute from "./notification.route";
import commentRoute from "./comment.route";

const router = Router();

export default ()=>{
    userRoute(router);
    postRoute(router);
    notificationRoute(router);
    commentRoute(router);
    return router;
}