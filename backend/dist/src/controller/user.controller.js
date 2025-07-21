import { clerkClient, getAuth } from "@clerk/express";
import { BAD_REQUEST, CONFLICT, CREATED, NOT_FOUND, OK } from "../constants/http.js";
import UserModel from "../models/user.model.js";
import appAssert from "../utils/appAssert.js";
import asyncHandler from "../utils/asyncHandler.js";
import { followUserService } from "../services/user.service.js";
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
    const clerkId = String(userId);
    const existedUser = await UserModel.findOne({ clerkId });
                if (existedUser) {
                    return res.status(OK).json({message:"User has already existed"})
                }
    const clerkUser = await clerkClient.users.getUser(clerkId);
    const email = clerkUser.emailAddresses?.[0]?.emailAddress || "";
    appAssert(email, CONFLICT, "User has no email address associated");
    const clerkData = {
                    clerkId,
                    email,
                    firstName: clerkUser.firstName || "",
                    lastName: clerkUser.lastName || "",
                    username: clerkUser.emailAddresses[0].emailAddress.split("@")[0],
                    profilePicture: clerkUser.imageUrl || "",
                };
    const user = await UserModel.create(clerkData);
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
