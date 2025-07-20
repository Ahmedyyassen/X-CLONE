import { Router } from "express";
import { getUserProfileHandler, syncUserHandler, updateProfile, getCurrentUser,followUserHandler } from "../controller/user.controller";
import { protectRoute } from "../middleware/auth.middlerware";


export default (router: Router)=>{
    router.route("/users/profile/:username").get(getUserProfileHandler);
    
    router.route("/users/profile").put(protectRoute, updateProfile);
    router.route("/users/me").get(protectRoute, getCurrentUser);
    router.route("/users/sync").post(protectRoute, syncUserHandler);
    router.route("/users/follow/:targetUserId").post(protectRoute, followUserHandler);
}