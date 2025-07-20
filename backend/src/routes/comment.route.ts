import { Router } from "express";
import { protectRoute } from "../middleware/auth.middlerware";
import { createComment, deleteComment, getComments } from "../controller/comment.controller";


export default (router: Router)=>{
    router.route("/comments/post/:postId")
                .get(getComments)
                .post(protectRoute, createComment);

    router.route("/comments/:commentId").delete(protectRoute, deleteComment)
}