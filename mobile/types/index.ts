export interface User {
    _id: string;
    username:string;
    firstName: string;
    lastName: string;
    profilePicture?: string;
}

export interface Comment {
    _id: string;
    content: string;
    createdAt: string;
    user: User;
}

export interface Post {
    _id: string;
    content: string;
    image?: string;
    createdAt: string;
    user: User;
    likes: string[];
    comments: Comment[];
}

export interface Notification {
    _id: string;
    from: {
        username:string;
        firstName: string;
        lastName: string;
        profilePicture?: string;
    };
    to: string;
    type: "like" | "comment" | "follow";
    post?: {
        _id: string;
        content: string;
        image?: string;
    };
    comment?:{
        _id: string;
        content: string;
    };
    createdAt: string
}

export interface CurrentUser{
    _id: string;
    clerkId: string;
    email: string;
    firstName: string;
    lastName: string;
    username:string;
    profilePicture: string;
    bannerImage?: string;
    bio?: string;
    location: string;
    followers: string[] ;
    following: string[]; 
    createdAt: Date;
    updatedAt: Date;
}