import Joi from "joi"


type UPDATEUSER={
    firstName: string;
    lastName: string;
    profilePicture: string;
    bannerImage: string;
    bio: string;
    location: string;
}
export const updateUserSchema = (obj:UPDATEUSER)=>{
     const mySchema = Joi.object<UPDATEUSER>({
        firstName: Joi.string().trim().max(100),
        lastName: Joi.string().trim().max(100),
        bannerImage: Joi.string().trim(),
        profilePicture: Joi.string().trim(),
        bio: Joi.string().trim().max(280),
        location: Joi.string().trim()
    })
    return mySchema.validate(obj);
}


type COMENT={
    content:string
}
export const commentSchema = (obj:COMENT)=>{
    const mySchema = Joi.object<COMENT>({
        content: Joi.string().trim().max(280).required()
    })
    return mySchema.validate(obj);
}