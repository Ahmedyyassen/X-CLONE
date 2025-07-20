import { getAuth } from "@clerk/express";
import { BAD_REQUEST, CREATED, OK } from "../constants/http";
import CommentModel from "../models/comment.model";
import asyncHandler from "../utils/asyncHandler";
import appAssert from "../utils/appAssert";
import { commentSchema } from "../lib/joi";
import { createCommentService, deleteCommentService } from "../services/comment.service";




export const getComments  = asyncHandler(
    async (req, res, next) => {
        const { postId } = req.params;

        const comments = await CommentModel.find({ post: postId })
        .sort({ createdAt: -1 })
        .populate("user", "username firstName lastName profilePicture");

        res.status(OK).json({ comments });
    }
)

export const createComment  = asyncHandler(
    async (req, res, next) => {
        const { userId } = getAuth(req);
        const { postId } = req.params;
        const { content } = req.body;

        const { error } = commentSchema(req.body);
        appAssert(!error, BAD_REQUEST, error?.details[0].message || "");

        const { comment } = await createCommentService({userId, postId, content})

        res.status(CREATED).json({comment})
    })

export const deleteComment  = asyncHandler(
    async (req, res, next) => {
            const { userId } = getAuth(req);
            const { commentId } = req.params;

            const { message } = await deleteCommentService({userId, commentId});

            res.status(OK).json({message})
            
    })