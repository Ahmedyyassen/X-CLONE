import { Request } from "express";
import multer,{FileFilterCallback} from "multer";

type MulterType=(
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
)=> void

const storage = multer.memoryStorage();

const fileFilter: MulterType = (req, file, cb)=>{
    if (file?.mimetype?.startsWith("image/")) {
        cb(null, true)
    }else{
        cb(new Error("Only image files are allowed")); //✅ Reject with error only
    }
}

const upload = multer({
    storage,
    fileFilter:fileFilter,
    limits: { fileSize: 5* 1024* 1024 } // 5MB limit
});

export default upload;