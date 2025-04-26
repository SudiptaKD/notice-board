"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("description", description);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("File uploaded successfully!");
        router.push("/notices");
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage("Error uploading file.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Upload Notice</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block">File:</label>
          <input
            type="file"
            onChange={handleFileChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Upload File
        </button>
      </form>

      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}
