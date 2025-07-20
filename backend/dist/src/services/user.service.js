import { clerkClient } from "@clerk/express";
import { BAD_REQUEST, CONFLICT, NOT_FOUND } from "../constants/http.js";
import UserModel from "../models/user.model.js";
import appAssert from "../utils/appAssert.js";
import NotificationModel from "../models/notification.model.js";
import { startSession } from "mongoose";
export const syncUserService = async (clerkId) => {
    const existedUser = await UserModel.findOne({ clerkId });
    appAssert(!existedUser, CONFLICT, "User already exist");
    // Fetch user details from Clerk
    const clerkUser = await clerkClient.users.getUser(clerkId);
    // Check for emailAddresses and fallback if empty
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
    return {
        user,
    };
};
export const followUserService = async ({ userId, targetUserId }) => {
    const targetUser = await UserModel.findById(targetUserId);
    appAssert(targetUser, NOT_FOUND, "This Friend is not found");
    const user = await UserModel.findOne({ clerkId: userId });
    appAssert(user, NOT_FOUND, "User not found");
    appAssert(user._id.toString() !== targetUser._id.toString(), BAD_REQUEST, "You can't follow yourself");
    // i have already follow him
    const isFollow = user.following.some((id) => id.toString() === targetUser._id.toString());
    const session = await startSession();
    session.startTransaction();
    try {
        if (isFollow) {
            await UserModel.findByIdAndUpdate(user._id, {
                $pull: { following: targetUser._id },
            }, { session });
            await UserModel.findByIdAndUpdate(targetUser._id, {
                $pull: { followers: user._id },
            }, { session });
        }
        else {
            await UserModel.findByIdAndUpdate(user._id, {
                $push: { following: targetUser._id },
            }, { session });
            await UserModel.findByIdAndUpdate(targetUser._id, {
                $push: { followers: user._id },
            }, { session });
        }
        const notification = new NotificationModel({
            from: user._id,
            to: targetUser._id,
            type: "follow",
        });
        notification.$session(session);
        await notification.save();
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
        message: isFollow ? "Unfollowed successfully" : "Followed successfully",
    };
};
