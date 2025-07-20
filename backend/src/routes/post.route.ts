import { Router } from "express";
import { createPostHandler, deletePostHandler, getPostsHandler, getSinglePostHandler, getUserPostsHandler, likePostHandler } from "../controller/post.controller";
import { protectRoute } from "../middleware/auth.middlerware";
import upload from "../middleware/upload.middleware";


export default (router: Router)=>{
    router.route("/posts").get(getPostsHandler)
                        .post(protectRoute, upload.single("image"), createPostHandler);

    router.route("/posts/:postId").get(getSinglePostHandler)
                                .delete(protectRoute, deletePostHandler);

    router.route("/posts/user/:username").get(getUserPostsHandler);  

    router.route("/posts/:postId/like").post(protectRoute, likePostHandler)
    
    //?protected route

}