import React from "react";
import Badge from "./ui/badge";

export default function UserProfile({
  firstName,
  school,
  lastName,
  image,
  role,
}) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-40 h-40 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
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
      <div className="flex flex-col items-start">
        <div className="flex items-center">
          <h1 className="text-3xl truncate max-w-65">
            {firstName} {lastName}
          </h1>
          {role.map((singleRole, index) => (
            <Badge key={index} className="custom-class">
              {singleRole}
            </Badge>
          ))}
        </div>
        <h2 className="text-sm text-gray-500">{school}</h2>
      </div>
    </div>
  );
}
