import React from "react";

export default function BookItem({
  imageUrl,
  title,
  author,
  isbn,
  country,
  pages,
  editorial,
}) {
  return (
    <div className="flex bg-white rounded-lg shadow-md overflow-hidden w-full max-w-4xl">
      {/* Imagen del libro */}
      <div className="w-1/3 bg-gray-200 flex items-center justify-center p-4">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="object-cover h-48 rounded-md"
          />
        ) : (
          <span className="text-black text-lg">Book Image</span>
        )}
      </div>

      {/* Detalles del libro */}
      <div className="w-2/3 p-6 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        <p className="text-lg text-gray-700 mt-1 font-medium">{author}</p>
        <p className="text-gray-600 mt-1 text-sm">ISBN: {isbn}</p>
        <p className="text-gray-600 mt-1 text-sm">País: {country}</p>
        <p className="text-gray-600 mt-1 text-sm">Número de páginas: {pages}</p>
        <p className="text-gray-500 mt-4 text-sm line-clamp-3">
          Editorial:{editorial}
        </p>
      </div>
    </div>
  );
}
