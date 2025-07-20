import { getAuth } from "@clerk/express";
import { BAD_REQUEST, CREATED, NOT_FOUND, OK } from "../constants/http.js";
import PostModel from "../models/post.model.js";
import UserModel from "../models/user.model.js";
import appAssert from "../utils/appAssert.js";
import asyncHandler from "../utils/asyncHandler.js";
import base64Image from "../utils/base64Image.js";
import uploadResponseFn from "../utils/cloudinary.js";
import { deletePostService, likePostService } from "../services/post.service.js";
export const getPostsHandler = asyncHandler(async (req, res, next) => {
    const posts = await PostModel.find()
        .sort({ createdAt: -1 })
        .populate("user", "username firstName lastName profilePicture")
        .populate({
        path: "comments",
        populate: {
            path: "user",
            select: "username firstName lastName profilePicture"
        }
    });
    res.status(OK).json({ posts });
});
export const getSinglePostHandler = asyncHandler(async (req, res, next) => {
    const { postId } = req.params;
    const post = await PostModel.findById(postId)
        .populate("user", "username firstName lastName profilePicture")
        .populate({
        path: "comments",
        populate: {
            path: "user",
            select: "username firstName lastName profilePicture"
        }
    });
    appAssert(post, NOT_FOUND, "Post not found");
    res.status(OK).json({ post });
});
export const getUserPostsHandler = asyncHandler(async (req, res, next) => {
    const { username } = req.params;
    const user = await UserModel.findOne({ username });
    appAssert(user, NOT_FOUND, "User not found");
    const posts = await PostModel.find({ user: user._id })
        .sort({ createdAt: -1 })
        .populate("user", "username firstName lastName profilePicture")
        .populate({
        path: "comments",
        populate: {
            path: "user",
            select: "username firstName lastName profilePicture"
        }
    });
    res.status(OK).json({ posts });
});
export const createPostHandler = asyncHandler(async (req, res, next) => {
    const { userId } = getAuth(req);
    const { content } = req.body;
    const imageFile = req.file;
    appAssert(content || imageFile, BAD_REQUEST, "Post must contain either text or image");
    const user = await UserModel.findOne({ clerkId: userId });
    appAssert(user, NOT_FOUND, "User not found");
    let imageUrl = "";
    if (imageFile) {
        try {
            const image = base64Image(imageFile);
            imageUrl = await uploadResponseFn(image);
        }
        catch (error) {
            console.log("Cloudinary upload error: ", error);
            return res.status(BAD_REQUEST).json({ error: "Failed to upload image" });
        }
    }
    const post = await PostModel.create({
        user: user._id,
        content: content || "",
        image: imageUrl,
    });
    res.status(CREATED).json({ post });
});
export const likePostHandler = asyncHandler(async (req, res, next) => {
    const { userId } = getAuth(req);
    const { postId } = req.params;
    const { isLike } = await likePostService({ userId, postId });
    res.status(OK).json({ message: isLike ? "Post unliked successfully" : "Post liked successfully" });
});
export const deletePostHandler = asyncHandler(async (req, res, next) => {
    const { userId } = getAuth(req);
    const { postId } = req.params;
    const { message } = await deletePostService({ userId, postId });
    res.status(OK).json({ message });
});
