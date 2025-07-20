import { Document, model, Schema, Types } from "mongoose";

export interface CommentDocument extends Document{
    _id: Types.ObjectId;
    user: Types.ObjectId;
    post: Types.ObjectId;
    content: string;
    likes: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const CommentSchema = new Schema<CommentDocument>({
    user: { type: Schema.Types.ObjectId, required: true, ref:"User" },
    post: { type: Schema.Types.ObjectId, required: true, ref:"Post" },
    content: { type: String, maxlength: 280, trim: true },
    likes: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: []
    }

},{ timestamps: true });

const CommentModel = model<CommentDocument>("Comment", CommentSchema);

export default CommentModel;