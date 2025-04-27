import React from "react";
import Badge from "./ui/badge";

export default function UserProfile({
  firstName,
  school,
  lastName,
  image,
  role,
}) {
  console.log("ROLE", role);
  return (
    <div className=" w-1/3 flex flex-col items-center gap-4 mb-6 p-2">
      <div className="w-40 h-40 rounded-full bg-gray-100 flex flex-col items-center justify-center overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <svg
            className="w-20 h-20 text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
          </svg>
        )}
      </div>
      <div className="flex flex-col items-start w-full">
        <div className=" mx-auto flex items-center gap-3 w-full">
          <p className="text-3xl truncate max-w-65 dark:text-white text-black  ">
            {firstName} {lastName}
          </p>
          <Badge type="role" value={role[0]} />
        </div>
        <h2 className="text-sm text-gray-500">{school}</h2>
      </div>
    </div>
  );
}
