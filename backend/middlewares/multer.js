import multer from "multer";
import path from 'path';

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the upload folder where images will be stored
    cb(null, 'public/');
  },
  filename: (req, file, cb) => {
    // Use the original file name with a timestamp to avoid naming conflicts
    const fileExtension = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${fileExtension}`);
  },
});
const upload = multer({ storage });

export default upload;