import path from "path";
import multer  from "multer";

const upload = multer({
    dest: "uploads/",
    limits : {fileSize:50*1024*1024},
    storage: multer.diskStorage({
        destination: "uploads/",
        filename: (_req,file,cb) => {
            cb(null,file.originalname)
        }
        }),
        fileFilter: (_req,file,cb) => {
            let ext = path.extname(file.originalname);
            if(ext !== ".jpg" && ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg" && ext !== ".mp4" && ext !== ".webp"){
                cb(res.status(400).json({
                    success:false,
                    message:"Unsupported format of file"
                }))
                return ;
            }
            cb(null,true)
        }
})

export default upload;