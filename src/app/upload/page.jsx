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
        router.push("/");
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage("Error uploading file.");
    }
  };

  const savedUsername = typeof window !== "undefined" ? localStorage.getItem("username") : null;
  const savedPassword = typeof window !== "undefined" ? localStorage.getItem("password") : null;

  const validUsername = "admin";
  const validPassword = "123456";
  if (savedUsername !== validUsername || savedPassword !== validPassword) {
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-white flex justify-center items-center">
    <div className=" p-6 min-w-4xl mx-auto bg-stone-100 border border-stone-300 rounded-2xl shadow-lg">
    <h1 className="text-2xl font-semibold mb-6 text-stone-700">Upload Notice</h1>
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block mb-1 text-stone-600 font-medium">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 text-black rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-stone-400"
        />
      </div>
      <div>
        <label className="block mb-1 text-stone-600 font-medium">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          //required
          className="w-full px-4 py-2 text-black rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-stone-400"
        />
      </div>
      <div>
        <label className="block mb-1 text-stone-600 font-medium">File:</label>
        <input
          type="file"
          onChange={handleFileChange}
          required
          name="file"
          className="w-full px-4  text-black py-2 rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-stone-400"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-stone-700 text-white rounded-lg hover:bg-stone-800 transition"
      >
        Upload File
      </button>
    </form>
  
    {message && <p className="mt-4 text-red-500">{message}</p>}
  </div>
  </div>
  
  );
}
