import { Router } from "express";
import { protectRoute } from "../middleware/auth.middlerware";
import { deleteNotification, getNotifications } from "../controller/notification.controller";


export default (router: Router)=>{
    router.route("/notifications").get(protectRoute, getNotifications)
    router.route("/notifications/:notificationId").delete(protectRoute, deleteNotification)
}