import { getAuth } from "@clerk/express";
import asyncHandler from "../utils/asyncHandler";
import NotificationModel from "../models/notification.model";
import UserModel from "../models/user.model";
import appAssert from "../utils/appAssert";
import { FORBIDDEN, NOT_FOUND, OK } from "../constants/http";



export const getNotifications = asyncHandler(
    async(req, res, next)=>{
    const { userId } = getAuth(req);
    const user = await UserModel.findOne({ clerkId: userId });
    appAssert(user, NOT_FOUND, "User not found");

    const notifications = await NotificationModel.find({ to: user._id })
    .sort({ createdAt: -1 })
    .populate("from", "username firstName lastName profilePicture")
    .populate("post", "content image")
    .populate("comment", "content");

    res.status(OK).json({ notifications })
})

export const deleteNotification = asyncHandler(
    async(req, res, next)=>{
        const { userId } = getAuth(req);
        const { notificationId } = req.params;

        const user = await UserModel.findOne({ clerkId: userId });
        appAssert(user, NOT_FOUND, "User not found");
        
        const notification = await NotificationModel.findOneAndDelete({
            _id: notificationId,
            to: user._id
        });
        
        appAssert(notification, NOT_FOUND, "Notification not found");

        res.status(OK).json({ message: "Notification has been deleted" })

})
