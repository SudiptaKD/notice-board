"use client"
import { formatTimestamp } from '@/utils/utils';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import UserCard from './UserCard';
import { facultyMembers } from '@/data/FacultyMembers';
import UserCarousel from './UserCarousel';


const HomePageUI = () => {
  const [notices, setNotices] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState()
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchNotices = async (page) => {
    const res = await fetch(`/api/notices?page=${page}`);
    const data = await res.json();
    setNotices(data.notices);
    setSelectedNotice(data.notices?.[0])
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    fetchNotices(currentPage);
  }, [currentPage]);
  return (
    <div className="min-h-screen grid grid-rows-[15vh_1fr] grid-cols-1 bg-white">
      {/* Top Section */}
      <section className="w-full border-b-4 border-gray-700 flex-col justify-center items-center">
        <header className="h-full w-full bg-white  border-gray-700 flex  items-center justify-between px-6">
          {/* Left: University Logo */}
          <div className="flex items-center space-x-4">
            <img
              src="/gublogo.svg"
              alt="Green University Logo"
              className="h-20"
            />
          </div>
         
          {/* <div className="text-4xl font-semibold text-green-500">
              Green University
            </div> */}
          <div className=" px-6 text-4xl font-semibold text-green-900">
            Dept. of Computer Science and Engineering
          </div>
          {/* <div className='flex justify-center gap-2 min-w-[700px]'>
            <div className="flex items-center space-x-4">
              <img
                src="/gub-image-1.jpg"
                alt="Green University Logo"
                className="h-28 w-full"
              />
            </div>
            <div className="flex items-center space-x-4">
              <img
                src="/gub-image-2.jpg"
                alt="Green University Logo"
                className="h-28 w-full"
              />
            </div>
            <div className="flex items-center space-x-4">
              <img
                src="/gub-image-3.jpg"
                alt="Green University Logo"
                className="h-28 w-full"
              />
            </div>
          </div> */}

        </header>

      </section>

      {/* Bottom Section with 2/3 and 1/3 layout */}
      <section className="grid grid-cols-4 gap-4 w-full border-b-4 border-gray-700">
        {/* Left Section - 2/3 width */}
        <div className="col-span-1 grid-rows-5 gap 4 border-r-4 border-gray-700">
          <div className='row-span-2 border-b-4 border-gray-700 p-4'>
            <UserCard data={facultyMembers?.[0]} />
          </div>
          <div className='row-span-3' >
            <UserCarousel users={facultyMembers} />
          </div>

        </div>
        <div className="col-span-2 p-4 border-r-4 border-gray-700">
          <div className="w-full h-full flex justify-center items-center">
            {selectedNotice?.fileType === 'application/pdf' ? (
              <div className="w-full h-full">
                <object
                  data={selectedNotice?.filePath}
                  type="application/pdf"
                  width="100%"
                  height="100%"
                >
                  <p>Your browser does not support PDFs. <a href="path_to_your_pdf.pdf">Download the PDF</a>.</p>
                </object>


              </div>
            ) : (
              <div className="h-full flex justify-center items-center">
                <img
                  src={selectedNotice?.filePath}
                  alt={selectedNotice?.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Section - 1/3 width */}
        <div className="col-span-1 p-2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Notice List</h2>

          <div className="space-y-2  h-[70vh] overflow-y-auto">
            {notices.map((notice, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >

                <h3 className="text-lg font-medium text-gray-900">{notice.name}</h3>
                {/* <p className="text-gray-600 mt-2">{notice.description}</p> */}
                <div className='flex justify-between mt-4' >

                  <p className="text-sm text-gray-500 ">{formatTimestamp(notice.timestamp)}</p>
                  <div className='flex justify-between gap-4' >
                    <button
                      onClick={() => setSelectedNotice(notice)}
                      className="px-2 py-1 bg-gray-400 text-white rounded-md hover:bg-gray-600 transition cursor-pointer"
                    >
                      View
                    </button>
                    <Link href={notice?.filePath || ""} passHref className='block' target='_blank'>
                      <button
                        className="px-2 py-1 bg-stone-400 text-white rounded-md  hover:bg-stone-600 transition cursor-pointer"
                      >
                        Download
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {/* <div className="mt-6 flex justify-between items-center">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div> */}
        </div>
      </section >
    </div >


  )
}

export default HomePageUI