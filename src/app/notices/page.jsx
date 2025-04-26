"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchNotices = async (page) => {
    const res = await fetch(`/api/notices?page=${page}`);
    const data = await res.json();
    setNotices(data.notices);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    fetchNotices(currentPage);
  }, [currentPage]);

  return (
    <div className="flex p-6">
      {/* Left Column: Display Cards */}
      <div className="w-2/3 space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Notices</h2>
        {notices.map((notice, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-lg">
            {notice.fileType === "application/pdf" ? (
              <Link href={notice.filePath} passHref target="_blank">
                  <p className="text-xl">{notice.name}</p>
                  <p>{notice.description}</p>
                  <p>{notice.timestamp}</p>
                  <p className="text-blue-600">View PDF</p>
              </Link>
            ) : (
              <div>
                <img
                  src={notice.filePath}
                  alt={notice.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p>{notice.name}</p>
                <p>{notice.timestamp}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right Column: List of Notices */}
      <div className="w-1/3 pl-8">
        <h2 className="text-2xl font-semibold mb-4">Notice List</h2>
        <ul className="space-y-4">
          {notices.map((notice, index) => (
            <li key={index} className="border p-4 rounded-lg shadow-lg">
              <Link href={notice?.filePath || ""} passHref>
                  <h3 className="font-semibold">{notice.name}</h3>
                  <p>{notice.description}</p>
                  <p>{notice.timestamp}</p>
                
              </Link>
            </li>
          ))}
        </ul>

        {/* Pagination */}
        <div className="mt-4">
          {currentPage > 1 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="bg-gray-300 p-2 rounded"
            >
              Previous
            </button>
          )}
          {currentPage < totalPages && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="bg-gray-300 p-2 rounded ml-2"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
