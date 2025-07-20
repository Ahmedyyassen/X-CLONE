import Joi from "joi";
export const updateUserSchema = (obj) => {
    const mySchema = Joi.object({
        firstName: Joi.string().trim().max(100),
        lastName: Joi.string().trim().max(100),
        bannerImage: Joi.string().trim(),
        profilePicture: Joi.string().trim(),
        bio: Joi.string().trim().max(280),
        location: Joi.string().trim()
    });
    return mySchema.validate(obj);
};
export const commentSchema = (obj) => {
    const mySchema = Joi.object({
        content: Joi.string().trim().max(280).required()
    });
    return mySchema.validate(obj);
};
