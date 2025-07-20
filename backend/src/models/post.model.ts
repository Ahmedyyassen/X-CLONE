import { Document, model, Schema, Types } from "mongoose";


export interface PostDocument extends Document{
    _id: Types.ObjectId;
    user: Types.ObjectId;
    content: string;
    image?: string;
    likes: Types.ObjectId[] ;
    comments: Types.ObjectId[] ;
    createdAt: Date;
    updatedAt: Date;
}

const PostSchema = new Schema<PostDocument>({
    user: { type: Schema.Types.ObjectId, required: true, ref:"User" },
    content: { type: String, maxlength: 280, trim: true },
    image: { type: String, default: "" },
    likes: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: []
    },
    comments: {
    type: [Schema.Types.ObjectId],
    ref: "Comment",
    default: []
    }

},{ timestamps: true });

const PostModel = model<PostDocument>("Post", PostSchema);

export default PostModel;