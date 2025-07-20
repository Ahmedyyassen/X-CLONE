import "dotenv/config";
const getEnv = (key, defaultValue) => {
    const value = process.env[key] || defaultValue;
    if (value === undefined) {
        throw new Error("Missing enviroment variable");
    }
    return value;
};
export const PORT = getEnv("PORT", "8080");
export const NODE_ENV = getEnv("NODE_ENV");
export const MONGO_URI = getEnv("MONGO_URI");
export const ARCJET_KEY = getEnv("ARCJET_KEY");
export const CLERK_PUBLISHABLE_KEY = getEnv("CLERK_PUBLISHABLE_KEY");
export const CLERK_SECRET_KEY = getEnv("CLERK_SECRET_KEY");
export const CLOUDINARY_CLOUD_NAME = getEnv("CLOUDINARY_CLOUD_NAME");
export const CLOUDINARY_API_KEY = getEnv("CLOUDINARY_API_KEY");
export const CLOUDINARY_API_SECRET = getEnv("CLOUDINARY_API_SECRET");
