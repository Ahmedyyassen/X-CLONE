import { getUserProfileHandler, syncUserHandler, updateProfile, getCurrentUser, followUserHandler } from "../controller/user.controller.js";
import { protectRoute } from "../middleware/auth.middlerware.js";
export default (router) => {
    router.route("/users/profile/:username").get(getUserProfileHandler);
    router.route("/users/profile").put(protectRoute, updateProfile);
    router.route("/users/me").get(protectRoute, getCurrentUser);
    router.route("/users/sync").post(protectRoute, syncUserHandler);
    router.route("/users/follow/:targetUserId").post(protectRoute, followUserHandler);
};
