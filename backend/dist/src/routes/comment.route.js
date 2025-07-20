import { protectRoute } from "../middleware/auth.middlerware.js";
import { createComment, deleteComment, getComments } from "../controller/comment.controller.js";
export default (router) => {
    router.route("/comments/post/:postId")
        .get(getComments)
        .post(protectRoute, createComment);
    router.route("/comments/:commentId").delete(protectRoute, deleteComment);
};
