import { startSession } from "mongoose";
import { FORBIDDEN, NOT_FOUND } from "../constants/http.js";
import CommentModel from "../models/comment.model.js";
import NotificationModel from "../models/notification.model.js";
import PostModel from "../models/post.model.js";
import UserModel from "../models/user.model.js";
import appAssert from "../utils/appAssert.js";
export const createCommentService = async ({ userId, postId, content }) => {
    const user = await UserModel.findOne({ clerkId: userId });
    appAssert(user, NOT_FOUND, "User not found");
    const post = await PostModel.findById(postId);
    appAssert(post, NOT_FOUND, "Post not found");
    const session = await startSession();
    session.startTransaction();
    let comment;
    try {
        const commentDoc = new CommentModel({
            user: user._id,
            post: post._id,
            content,
        });
        commentDoc.$session(session);
        await commentDoc.save();
        comment = commentDoc;
        await PostModel.findByIdAndUpdate(post._id, {
            $push: { comments: comment._id }
        }, { session });
        if (post.user.toString() !== user._id.toString()) {
            const notificationDoc = new NotificationModel({
                from: user._id,
                to: post.user,
                type: "comment",
                post: post._id,
                comment: comment._id,
            });
            notificationDoc.$session(session);
            await notificationDoc.save();
        }
        await session.commitTransaction();
    }
    catch (error) {
        await session.abortTransaction();
        throw error;
    }
    finally {
        await session.endSession();
    }
    return {
        comment
    };
};
export const deleteCommentService = async ({ userId, commentId }) => {
    const user = await UserModel.findOne({ clerkId: userId });
    appAssert(user, NOT_FOUND, "User not found");
    const comment = await CommentModel.findById(commentId);
    appAssert(comment, NOT_FOUND, "Comment not found");
    appAssert(comment.user.toString() === user._id.toString(), FORBIDDEN, "You can only delete your own comment");
    const session = await startSession();
    session.startTransaction();
    try {
        await PostModel.findByIdAndUpdate(comment.post, { $pull: { comments: comment._id } }, { session });
        await comment.deleteOne({ session });
        await session.commitTransaction();
    }
    catch (error) {
        await session.abortTransaction();
        throw error;
    }
    finally {
        await session.endSession();
    }
    return {
        message: "Comment deleted successfully"
    };
};
