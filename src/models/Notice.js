import mongoose from "mongoose";

const NoticeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    filePath: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    fileType: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Notice || mongoose.model("Notice", NoticeSchema);
