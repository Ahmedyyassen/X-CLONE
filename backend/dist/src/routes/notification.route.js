import { protectRoute } from "../middleware/auth.middlerware.js";
import { deleteNotification, getNotifications } from "../controller/notification.controller.js";
export default (router) => {
    router.route("/notifications").get(protectRoute, getNotifications);
    router.route("/notifications/:notificationId").delete(protectRoute, deleteNotification);
};
