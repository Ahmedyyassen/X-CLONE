import { Document, model, Schema, Types } from "mongoose";


export interface UserDocument extends Document{
    _id: Types.ObjectId;
    clerkId: string;
    email: string;
    firstName: string;
    lastName: string;
    username:string;
    profilePicture: string;
    bannerImage: string;
    bio: string;
    location: string;
    followers: Types.ObjectId[] ;
    following: Types.ObjectId[]; 
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>({
    clerkId:{ type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    profilePicture: { type: String, default: "" },
    bannerImage: { type: String, default: "" },
    bio: { type: String, default: "", maxlength: 160 },
    location: { type: String, default: "" },
    followers: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: []
    },
    following: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: []
    }

},{ timestamps: true });

const UserModel = model<UserDocument>("User", UserSchema);

export default UserModel;