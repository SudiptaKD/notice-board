import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import Notice from "@/models/Notice";

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "public/uploads");

export const POST = async (req) => {
  const formData = await req.formData();
  const body = Object.fromEntries(formData);
  const file = (body.file) || null;

  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR);
    }

    fs.writeFileSync(
      path.resolve(UPLOAD_DIR, (body).file.name),
      buffer
    );
  } else {
    return NextResponse.json({
      success: false,
    });
  }


  const { name, description } = body; 
  const filePath = `/uploads/${body.file.name}`;  // Path to the uploaded file
  const fileType = body.file.type;  // MIME type of the uploaded file

  try {
    // Create a new notice in MongoDB
    const notice = new Notice({
      name,
      description,
      filePath,
      fileType,
      timestamp: new Date(),
    });

    // Save to MongoDB
    await notice.save();
    return NextResponse.json({ message: "File uploaded successfully", notice });
  } catch (err) {
    console.error("Error saving to MongoDB:", err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
