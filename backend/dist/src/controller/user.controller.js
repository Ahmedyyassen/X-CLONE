import { getAuth } from "@clerk/express";
import { BAD_REQUEST, CREATED, NOT_FOUND, OK } from "../constants/http.js";
import UserModel from "../models/user.model.js";
import appAssert from "../utils/appAssert.js";
import asyncHandler from "../utils/asyncHandler.js";
import { followUserService, syncUserService } from "../services/user.service.js";
import { updateUserSchema } from "../lib/joi.js";
export const getUserProfileHandler = asyncHandler(async (req, res, next) => {
    const { username } = req.params;
    const user = await UserModel.findOne({ username });
    appAssert(user, NOT_FOUND, "User not fount");
    res.status(OK).json({ user });
});
export const updateProfile = asyncHandler(async (req, res, next) => {
    const { userId } = getAuth(req);
    const { error } = updateUserSchema(req.body);
    appAssert(!error, BAD_REQUEST, error?.details[0].message || "");
    const user = await UserModel.findOneAndUpdate({ clerkId: userId }, { ...req.body }, { new: true });
    appAssert(user, NOT_FOUND, "User not found");
    res.status(OK).json({ user });
});
export const syncUserHandler = asyncHandler(async (req, res, next) => {
    const { userId } = getAuth(req);
    const { user } = await syncUserService(String(userId));
    res.status(CREATED).json({ user, massage: "User created successfully" });
});
export const getCurrentUser = asyncHandler(async (req, res, next) => {
    const { userId } = getAuth(req);
    const user = await UserModel.findOne({ clerkId: userId });
    appAssert(user, NOT_FOUND, "User not found");
    res.status(OK).json({ user });
});
export const followUserHandler = asyncHandler(async (req, res, next) => {
    const { userId } = getAuth(req);
    const { targetUserId } = req.params;
    const { message } = await followUserService({ userId, targetUserId });
    res.status(OK).json({ message });
});
