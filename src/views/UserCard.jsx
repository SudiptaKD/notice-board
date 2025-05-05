import Link from "next/link";
import React from "react";

const UserCard = ({ data }) => {
    const { name, designation, image, link } = data;

    return (
        <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block max-w-xs mx-auto bg-white rounded-2xl shadow-lg shadow-stone-600 overflow-hidden hover:shadow-2xl transition-shadow duration-300"
        >
            <div className="flex flex-col items-center p-4">
                <img
                    src={image}
                    alt={name}
                    className="w-24 h-24 rounded-full object-cover mb-3 border-2 border-green-600"
                />
                <div className="text-center">
                    <h2 className="text-lg font-semibold text-gray-800">
                        {name}
                    </h2>
                    <p className="text-sm text-gray-500">{designation}</p>
                </div>
            </div>
        </Link>
    );
};

export default UserCard;