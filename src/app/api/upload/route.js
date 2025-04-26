import { createRouter } from "next-connect";  // Import createRouter instead of nextConnect
import multer from "multer";
import Notice from "@/models/Notice";

const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const router = createRouter();  // Use createRouter instead of nextConnect

// Handle POST requests for file upload
router.use(upload.single("file"));

router.post(async (req, res) => {
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

export { router as POST };  // Export the router's POST handler
