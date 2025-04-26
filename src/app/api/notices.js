import Notice from "../../models/Notice";
import connectDB from "../../utils/connectDB";  // MongoDB connection utility

connectDB();

export default async function handler(req, res) {
  const { page = 1, limit = 5 } = req.query;  // Pagination params

  try {
    const notices = await Notice.find()
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ timestamp: -1 });  // Sort by timestamp descending

    const totalNotices = await Notice.countDocuments();
    const totalPages = Math.ceil(totalNotices / limit);

    res.status(200).json({ notices, totalPages });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
