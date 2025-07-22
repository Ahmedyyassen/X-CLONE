import axios,{ AxiosInstance } from "axios";
import { useAuth } from "@clerk/clerk-expo";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

const createApiClient = (getToken: ()=> Promise<string|null> ): AxiosInstance=>{
    const api = axios.create({baseURL: API_BASE_URL});

    api.interceptors.request.use(async (config) =>{
        try {
            const token = await getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config;
        } catch (error) {
            console.error("Failed to get authentication token:", error);
            return config;
        }
    }, (error)=>{
        return Promise.reject(error);
    })
    return api;
}

export const useApiClient = ():AxiosInstance => {
    const { getToken } = useAuth();
    return createApiClient(getToken);
}

export const userApi= {
    syncUser: (api: AxiosInstance) => api.post("/users/sync"),
    getCurrentUser: (api: AxiosInstance) => api.get("/users/me"),
    updateProfile: (api: AxiosInstance, data: any) => api.put("/users/profile", data),
    followUser: (api:AxiosInstance, targetUserId:string)=> api.post(`/users/follow/${targetUserId}`),
    getUserProfile: (api:AxiosInstance, username:string)=> api.get(`/users/profile/${username}`)
}

export const postApi= {
    createPost: (api: AxiosInstance, data: { content:string, image?: string }) =>
    api.post("/posts", data),
    likePost: (api: AxiosInstance, postId: string) => api.post(`/posts/${postId}/like`),
    deletePost: (api: AxiosInstance, postId: string) => api.delete(`/posts/${postId}`),
    getUserPosts: (api: AxiosInstance, username: string,page=1, limit=10) =>
        api.get(`/posts/user/${username}`, { params : { page, limit }}),
    getPosts: (api: AxiosInstance, page=1, limit=10) => api.get("/posts", {
        params: { page, limit }
    }),
}

export const commentApi = {
    createComment: (api: AxiosInstance, postId: string, content: string)=>
        api.post(`/comments/post/${postId}`, { content }),
    deleteComment: (api: AxiosInstance, commentId: string )=>
        api.delete(`/comments/${commentId}`)
}

export const notificationApi = {
    getNotifications: (api: AxiosInstance)=> api.get("/notifications"),
    deleteNotification: (api: AxiosInstance, notificationId: string )=>
        api.delete(`/notifications/${notificationId}`)
}
