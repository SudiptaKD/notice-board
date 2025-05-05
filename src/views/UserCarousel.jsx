import React, { useEffect, useRef } from "react";
import UserCard from "./UserCard";
import { motion } from "framer-motion";

const UserCarousel = ({ users }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = containerRef.current;
    let scrollAmount = 1;

    const scrollInterval = setInterval(() => {
      if (scrollContainer) {
        scrollContainer.scrollTop += scrollAmount;
        if (
          scrollContainer.scrollTop + scrollContainer.clientHeight >=
          scrollContainer.scrollHeight
        ) {
          scrollContainer.scrollTop = 0;
        }
      }
    }, 30);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="overflow-y-auto h-[55vh] w-full py-4   space-y-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
    >
      {users.map((user, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <UserCard data={user} />
        </motion.div>
      ))}
    </div>
  );
};

export default UserCarousel;
