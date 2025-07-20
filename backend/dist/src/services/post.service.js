import { startSession } from "mongoose";
import { BAD_REQUEST, NOT_FOUND } from "../constants/http.js";
import PostModel from "../models/post.model.js";
import UserModel from "../models/user.model.js";
import appAssert from "../utils/appAssert.js";
import NotificationModel from "../models/notification.model.js";
import CommentModel from "../models/comment.model.js";
import cloudinary from "../config/cloudinary.js";
export const likePostService = async ({ userId, postId }) => {
    const user = await UserModel.findOne({ clerkId: userId });
    appAssert(user, NOT_FOUND, "User not found");
    const post = await PostModel.findById(postId);
    appAssert(post, NOT_FOUND, "Post not found");
    const isLike = post.likes.some((id) => id.equals(user._id));
    const session = await startSession();
    session.startTransaction();
    try {
        if (isLike) {
            await PostModel.findByIdAndUpdate(postId, { $pull: { likes: user._id } }, { session });
        }
        else {
            await PostModel.findByIdAndUpdate(postId, { $push: { likes: user._id } }, { session });
        }
        if (post.user.toString() !== user._id.toString()) {
            await NotificationModel.create([
                {
                    from: user._id,
                    to: post.user,
                    type: "like",
                    post: postId,
                },
            ], { session });
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
        isLike,
    };
};
export const deletePostService = async ({ userId, postId }) => {
    const user = await UserModel.findOne({ clerkId: userId });
    appAssert(user, NOT_FOUND, "User not found");
    const post = await PostModel.findById(postId);
    appAssert(post, NOT_FOUND, "Post not found");
    appAssert(user._id.toString() === post.user.toString(), BAD_REQUEST, "Only the owner of the post can delete it");
    const session = await startSession();
    session.startTransaction();
    try {
        await CommentModel.deleteMany({ post: postId }, { session });
        if (post.image) {
            await cloudinary.uploader.destroy(post.image);
        }
        await PostModel.findByIdAndDelete(postId, { session });
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
        message: "Post deleted successfully"
    };
};
