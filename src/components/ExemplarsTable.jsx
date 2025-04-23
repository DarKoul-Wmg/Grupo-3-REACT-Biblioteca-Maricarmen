import { useState } from "react";
import Button from "./ui/button";
import Tooltip from "./ui/tooltip";

export default function ExemplarsTable({ array, user, onLoanClick }) {
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const itemsPerPage = 10; // Número de registros por página

  // Calcular el número total de páginas
  const totalPages = Math.ceil(array.length / itemsPerPage);

  // Obtener los registros de la página actual
  const currentData = array.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Cambiar de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Verificar si el usuario es "Bibliotecari" o "Administrador"
  const isBibliotecariOrAdmin =
    user?.groups?.includes("Bibliotecari") ||
    user?.groups?.includes("Administrador");

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Exemplars</h2>

      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden border border-gray-200 rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-500">
                <tr>
                  <th className="px-8 py-3 text-start text-xs font-semibold text-white uppercase">
                    Registre
                  </th>
                  <th className="px-8 py-3 text-start text-xs font-semibold text-white uppercase">
                    Exclos Préstec
                  </th>
                  <th className="px-8 py-3 text-start text-xs font-semibold text-white uppercase">
                    Baixa
                  </th>
                  <th className="px-8 py-3 text-start text-xs font-semibold text-white uppercase">
                    Centre
                  </th>
                  {isBibliotecariOrAdmin && (
                    <th className="px-8 py-3 text-start text-xs font-semibold text-white uppercase">
                      Accions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {currentData.map((item) => {
                  const isDisabled =
                    item.exclos_prestec ||
                    (user?.centre && user.centre !== item.centre.nom);

                  const tooltipMessage = item.exclos_prestec
                    ? "Aquest exemplar està exclòs de préstec."
                    : user?.centre && user.centre !== item.centre.nom
                    ? "Aquest exemplar no pertany al teu centre."
                    : "";

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-blue-100 transition-colors"
                    >
                      <td className="px-8 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {item.registre}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center">
                        <input
                          type="checkbox"
                          checked={item.exclos_prestec}
                          disabled
                          className="w-5 h-5 accent-blue-600"
                        />
                      </td>
                      <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item.baixa ? "Sí" : "No"}
                      </td>
                      <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-800 text-left">
                        {item.centre.nom}
                      </td>
                      {isBibliotecariOrAdmin && (
                        <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-800 text-left">
                          <Tooltip message={tooltipMessage}>
                            <Button
                              onClick={() => onLoanClick(item)}
                              disabled={isDisabled}
                              className={`px-4 py-2 rounded-md transition ${
                                isDisabled
                                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                  : "bg-blue-500 text-white hover:bg-blue-600"
                              }`}
                            >
                              Fer Préstec
                            </Button>
                          </Tooltip>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {array.length > itemsPerPage && (
        <div className="flex justify-center mt-4 items-center gap-1">
          {/* Ir a primera página */}
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 text-xl rounded-md border ${
              currentPage === 1
                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                : "text-blue-700 border-blue-300 hover:bg-blue-100"
            }`}
          >
            «
          </button>

          {/* Página anterior */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 text-xl rounded-md border ${
              currentPage === 1
                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                : "text-blue-700 border-blue-300 hover:bg-blue-100"
            }`}
          >
            ‹
          </button>

          {/* Páginas numeradas */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-1 text-xl rounded-md border transition-all ${
                currentPage === index + 1
                  ? "bg-blue-700 text-white border-[#8B8EF9]"
                  : "bg-blue-500 text-white border-gray-300 hover:bg-blue-300"
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Página siguiente */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 text-xl rounded-md border ${
              currentPage === totalPages
                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                : "text-blue-700 border-blue-300 hover:bg-blue-100"
            }`}
          >
            ›
          </button>

          {/* Ir a última página */}
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 text-xl rounded-md border ${
              currentPage === totalPages
                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                : "text-blue-700 border-blue-300 hover:bg-blue-100"
            }`}
          >
            »
          </button>
        </div>
      )}
    </div>
  );
}
