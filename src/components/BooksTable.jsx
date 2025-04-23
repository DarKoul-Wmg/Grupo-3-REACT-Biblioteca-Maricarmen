import { useState } from "react";

export default function BooksTable({ array, onBookSelect }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(array.length / itemsPerPage);

  const currentData = array.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Llistat de llibres
      </h2>

      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden border border-gray-200 rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-500">
                <tr>
                  <th className="px-8 py-3 text-left text-xs font-semibold text-white uppercase">
                    Títol
                  </th>
                  <th className="px-8 py-3 text-left text-xs font-semibold text-white uppercase">
                    Autor
                  </th>
                  <th className="px-8 py-3 text-left text-xs font-semibold text-white uppercase">
                    Enllaç
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {currentData.map((book) => (
                  <tr
                    key={book.id}
                    className="hover:bg-blue-100 transition-colors"
                  >
                    <td className="px-8 py-4 whitespace-nowrap text-sm text-left font-medium text-gray-800">
                      {book.titol}
                    </td>
                    <td className="px-8 py-4 whitespace-nowrap text-sm text-left text-gray-800">
                      {book.autor}
                    </td>
                    <td className="px-8 py-4 whitespace-nowrap text-sm text-left text-blue-600">
                      <button
                        onClick={() => onBookSelect(book)}
                        className="hover:underline text-blue-600"
                      >
                        Veure llibre
                      </button>
                    </td>
                  </tr>
                ))}
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
