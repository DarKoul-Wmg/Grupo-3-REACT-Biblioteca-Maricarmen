import React from "react";
import Badge from "./ui/badge";

export default function BookItem({
  imageUrl = "",
  title = "Títol desconegut",
  author = "Autor desconegut",
  resum = "Resum no disponible",
  modelType,
  // Campos específicos para cada tipo
  isbn = "ISBN no disponible",
  editorial = "Editorial no disponible",
  colleccio = "Col·lecció no disponible",
  lloc = "Lloc no disponible",
  pais = "País no disponible",
  llengua = "Llengua no disponible",
  numero = "Número no disponible",
  volums = "Volums no disponibles",
  pagines = "Pàgines no disponibles",
  infoUrl = "",
  previewUrl = "",
  thumbnailUrl = "Miniatura no disponible",
  issn = "ISSN no disponible",
  discografica = "Discogràfica no disponible",
  estil = "Estil no disponible",
  duracio = "Duració no disponible",
  productora = "Productora no disponible",
  marca = "Marca no disponible",
  model = "Model no disponible",
}) {
  console.log("TIPO A MOSTRAR: ", modelType);
  return (
    <div className="flex bg-white rounded-lg shadow-md overflow-hidden w-full max-w-4xl justify-evenly">
      {/* Imatge del contingut */}
      <div className="w-1/3 bg-gray-200 flex items-center justify-center p-4">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="object-cover h-48 rounded-md"
          />
        ) : (
          <span className="text-black text-lg">Imatge no disponible</span>
        )}
      </div>

      {/* Detalls del contingut */}
      <div className="p-6 flex flex-col justify-start gap-2 text-start ">
        <div className="flex gap-3 items-center">
          <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
          <Badge type="type" value={modelType}></Badge>
        </div>
        {author && (
          <p className="text-lg text-gray-700 font-medium">
            <strong>Autor:</strong> {author}
          </p>
        )}
        {resum && (
          <p className="text-sm">
            <strong>Resum:</strong> {resum}
          </p>
        )}

        {/* Mostrar campos específicos según el tipo */}
        {modelType === "Llibre" && (
          <>
            {isbn && (
              <p className="text-sm">
                <strong>ISBN:</strong> {isbn}
              </p>
            )}
            {editorial && (
              <p className="text-sm">
                <strong>Editorial:</strong> {editorial}
              </p>
            )}
            {colleccio && (
              <p className="text-sm">
                <strong>Col·lecció:</strong> {colleccio}
              </p>
            )}
            {lloc && (
              <p className="text-sm">
                <strong>Lloc:</strong> {lloc}
              </p>
            )}
            {pais && (
              <p className="text-sm">
                <strong>País:</strong> {pais}
              </p>
            )}
            {llengua && (
              <p className="text-sm">
                <strong>Llengua:</strong> {llengua}
              </p>
            )}
            {numero && (
              <p className="text-sm">
                <strong>Número:</strong> {numero}
              </p>
            )}
            {volums && (
              <p className="text-sm">
                <strong>Volums:</strong> {volums}
              </p>
            )}
            {pagines && (
              <p className="text-sm">
                <strong>Pàgines:</strong> {pagines}
              </p>
            )}
            {infoUrl && (
              <p className="text-sm">
                <strong>Info URL:</strong>{" "}
                <a href={infoUrl} className="text-blue-500 hover:underline">
                  {infoUrl}
                </a>
              </p>
            )}
            {previewUrl && (
              <p className="text-sm">
                <strong>Preview URL:</strong>{" "}
                <a href={previewUrl} className="text-blue-500 hover:underline">
                  {previewUrl}
                </a>
              </p>
            )}
          </>
        )}

        {modelType === "Revista" && (
          <>
            {issn && (
              <p className="text-sm">
                <strong>ISSN:</strong> {issn}
              </p>
            )}
            {editorial && (
              <p className="text-sm">
                <strong>Editorial:</strong> {editorial}
              </p>
            )}
            {lloc && (
              <p className="text-sm">
                <strong>Lloc:</strong> {lloc}
              </p>
            )}
            {pais && (
              <p className="text-sm">
                <strong>País:</strong> {pais}
              </p>
            )}
            {llengua && (
              <p className="text-sm">
                <strong>Llengua:</strong> {llengua}
              </p>
            )}
            {numero && (
              <p className="text-sm">
                <strong>Número:</strong> {numero}
              </p>
            )}
            {volums && (
              <p className="text-sm">
                <strong>Volums:</strong> {volums}
              </p>
            )}
            {pagines && (
              <p className="text-sm">
                <strong>Pàgines:</strong> {pagines}
              </p>
            )}
          </>
        )}

        {modelType === "CD" && (
          <>
            {discografica && (
              <p className="text-sm">
                <strong>Discogràfica:</strong> {discografica}
              </p>
            )}
            {estil && (
              <p className="text-sm">
                <strong>Estil:</strong> {estil}
              </p>
            )}
            {duracio && (
              <p className="text-sm">
                <strong>Duració:</strong> {duracio}
              </p>
            )}
          </>
        )}

        {(modelType === "DVD" || modelType === "BR") && (
          <>
            {productora && (
              <p className="text-sm">
                <strong>Productora:</strong> {productora}
              </p>
            )}
            {duracio && (
              <p className="text-sm">
                <strong>Duració:</strong> {duracio}
              </p>
            )}
          </>
        )}

        {modelType === "Dispositiu" && (
          <>
            {marca && (
              <p className="text-sm">
                <strong>Marca:</strong> {marca}
              </p>
            )}
            {model && (
              <p className="text-sm">
                <strong>Model:</strong> {model}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
