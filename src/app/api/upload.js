import nextConnect from "next-connect";
import multer from "multer";
import mongoose from "mongoose";
import Notice from "../../models/Notice";  // Mongoose model for notices

const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const handler = nextConnect();

handler.use(upload.single("file"));

handler.post(async (req, res) => {
  const { name, description } = req.body;
  const filePath = `/uploads/${req.file.filename}`;
  const fileType = req.file.mimetype;

  try {
    // Create new notice and save to MongoDB
    const notice = new Notice({
      name,
      description,
      filePath,
      fileType,
      timestamp: new Date(),
    });

    await notice.save();
    res.status(200).json({ message: "File uploaded successfully", notice });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default handler;
