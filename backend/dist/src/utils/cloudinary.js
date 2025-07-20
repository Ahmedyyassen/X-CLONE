import cloudinary from "../config/cloudinary.js";
const uploadResponseFn = async (image) => {
    const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "social_media_posts",
        resource_type: "image",
        transformation: [
            { width: 800, height: 600, crop: "limit" },
            { quality: "auto" },
            { format: "auto" }
        ],
    });
    return uploadResponse.secure_url;
};
export default uploadResponseFn;
