import Notice from "@/models/Notice";  // Mongoose model for notices
import connectDB from "@/utils/connectDB";  // MongoDB connection utility

// Connect to MongoDB
connectDB();

// Named export for GET request
export async function GET(req) {
  const { page = 1, limit = 5 } = req.nextUrl.searchParams;  // Pagination params
  
  try {
    // Ensure that `page` and `limit` are numbers
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    // Fetch notices with pagination
    const notices = await Notice.find()
      .skip((pageNumber - 1) * limitNumber) // Skip the appropriate number of notices
      .limit(limitNumber) // Limit the number of notices per page
      .sort({ timestamp: -1 }); // Sort by timestamp descending

    // Get the total count of notices for pagination
    const totalNotices = await Notice.countDocuments();
    const totalPages = Math.ceil(totalNotices / limitNumber);

    // Return the notices and pagination info
    return new Response(JSON.stringify({ notices, totalPages }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Named export for POST request
export async function POST(req) {
  try {
    const { name, description, filePath, fileType } = await req.json(); // Parse request body

    // Create a new notice instance and save it to the database
    const notice = new Notice({
      name,
      description,
      filePath,
      fileType,
      timestamp: new Date(),
    });

    await notice.save(); // Save to MongoDB

    // Return a success response
    return new Response(JSON.stringify({ message: "Notice created successfully", notice }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
