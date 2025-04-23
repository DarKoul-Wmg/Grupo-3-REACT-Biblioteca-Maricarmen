import React from "react";

export default function BookItem({
  imageUrl = "",
  title = "Títol desconegut",
  originalTitle = "",
  author = "Autor desconegut",
  isbn = "ISBN no disponible",
  country = "País no disponible",
  pages = "Pàgines no disponibles",
  editorial = "Editorial no disponible",
  cdu = "CDU no disponible",
  signatura = "Signatura no disponible",
  dataEdicio = "Data d’edició no disponible",
  resum = "Resum no disponible",
  anotacions = "Anotacions no disponibles",
  mides = "Mides no disponibles",
  tags = [],
}) {
  return (
    <div className="flex bg-white rounded-lg shadow-md overflow-hidden w-full max-w-4xl">
      {/* Imatge del llibre */}
      <div className="w-1/3 bg-gray-200 flex items-center justify-center p-4">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="object-cover h-48 rounded-md"
          />
        ) : (
          <span className="text-black text-lg">Imatge del llibre</span>
        )}
      </div>

      {/* Detalls del llibre */}
      <div className="w-2/3 p-6 flex flex-col justify-start gap-2">
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        {originalTitle && (
          <p className="text-gray-700 text-sm italic">
            <strong>Títol original:</strong> {originalTitle}
          </p>
        )}
        {author && (
          <p className="text-lg text-gray-700 font-medium">{author}</p>
        )}
        {isbn && (
          <p className="text-sm">
            <strong>ISBN:</strong> {isbn}
          </p>
        )}
        {country && (
          <p className="text-sm">
            <strong>País:</strong> {country}
          </p>
        )}
        {pages && (
          <p className="text-sm">
            <strong>Nombre de pàgines:</strong> {pages}
          </p>
        )}
        {editorial && (
          <p className="text-sm">
            <strong>Editorial:</strong> {editorial}
          </p>
        )}
        {cdu && (
          <p className="text-sm">
            <strong>CDU:</strong> {cdu}
          </p>
        )}
        {signatura && (
          <p className="text-sm">
            <strong>Signatura:</strong> {signatura}
          </p>
        )}
        {dataEdicio && (
          <p className="text-sm">
            <strong>Data d’edició:</strong> {dataEdicio}
          </p>
        )}
        {mides && (
          <p className="text-sm">
            <strong>Mides:</strong> {mides}
          </p>
        )}
        {resum && (
          <p className="text-sm">
            <strong>Resum:</strong> {resum}
          </p>
        )}
        {anotacions && (
          <p className="text-sm">
            <strong>Anotacions:</strong> {anotacions}
          </p>
        )}
        {tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
