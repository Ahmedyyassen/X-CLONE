import { createPostHandler, deletePostHandler, getPostsHandler, getSinglePostHandler, getUserPostsHandler, likePostHandler } from "../controller/post.controller.js";
import { protectRoute } from "../middleware/auth.middlerware.js";
import upload from "../middleware/upload.middleware.js";
export default (router) => {
    router.route("/posts").get(getPostsHandler)
        .post(protectRoute, upload.single("image"), createPostHandler);
    router.route("/posts/:postId").get(getSinglePostHandler)
        .delete(protectRoute, deletePostHandler);
    router.route("/posts/user/:username").get(getUserPostsHandler);
    router.route("/posts/:postId/like").post(protectRoute, likePostHandler);
    //?protected route
};
