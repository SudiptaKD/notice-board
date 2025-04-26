import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return; // If already connected, skip

  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectDB;
