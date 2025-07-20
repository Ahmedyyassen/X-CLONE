import { Document, model, Schema, Types } from "mongoose";


export interface NotificationDocument extends Document{
    _id: Types.ObjectId;
    from: Types.ObjectId;
    to: Types.ObjectId;
    type: "follow" | "like" | "comment" ;
    post?: Types.ObjectId | null;
    comment?: Types.ObjectId | null;
    createdAt: Date;
    updatedAt: Date;
}

const NotificationSchema = new Schema<NotificationDocument>({
    from: { type: Schema.Types.ObjectId, required: true, ref:"User" },
    to: { type: Schema.Types.ObjectId, required: true, ref:"User" },
    type:  { type: String, required: true, enum:["follow", "like", "comment"] },
    post: { type: Schema.Types.ObjectId, default: null, ref:"Post" },
    comment: { type: Schema.Types.ObjectId, default: null, ref:"Comment" },


},{ timestamps: true });

const NotificationModel = model<NotificationDocument>("Notification", NotificationSchema);

export default NotificationModel;