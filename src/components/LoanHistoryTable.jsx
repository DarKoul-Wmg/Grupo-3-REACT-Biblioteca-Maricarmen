import React, { useEffect, useState, useContext } from "react";
import { getLoanHistory } from "../services/api";
import { AuthContext } from "../contexts/authcontext";
import { timeAgo } from "../services/utils";

export default function LoanHistoryTable() {
  const { userToken: token } = useContext(AuthContext);
  const [loanHistory, setLoanHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchLoanHistory() {
      try {
        const data = await getLoanHistory(token);
        setLoanHistory(data);
      } catch (error) {
        console.error("Error al obtener el historial de préstamos:", error);
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      fetchLoanHistory();
    }
  }, [token]);

  if (!token)
    return (
      <div>
        Inicia sessió un altre cop per veure el teu historial de préstecs.
      </div>
    );
  if (loading)
    return (
      <div className="dark:text-white">Carregant historial de préstecs...</div>
    );
  if (!loanHistory.length)
    return (
      <div className="dark:text-white text-black">
        No hi ha historial de préstecs.
      </div>
    );

  // PAGINADOR
  const totalPages = Math.ceil(loanHistory.length / itemsPerPage);

  // --- PAGINADOR DINÁMICO ---
  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = startPage + maxPagesToShow - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const paginatedData = [...loanHistory]
    .sort((a, b) => {
      const now = new Date();
      const getEstat = (prestec) => {
        const dataPrestec = new Date(prestec.data_prestec);
        const dataRetorn = new Date(prestec.data_retorn);
        if (now >= dataPrestec && now <= dataRetorn) return "En curs";
        return "Retornat";
      };

      const estatA = getEstat(a);
      const estatB = getEstat(b);

      // "En curs" primero
      if (estatA === "En curs" && estatB !== "En curs") return -1;
      if (estatA !== "En curs" && estatB === "En curs") return 1;

      // Si ambos son "En curs", ordenar por data_retorn ascendente
      if (estatA === "En curs" && estatB === "En curs") {
        return new Date(a.data_retorn) - new Date(b.data_retorn);
      }

      // Si ambos son "Retornat", ordenar por data_retorn descendente
      if (estatA === "Retornat" && estatB === "Retornat") {
        return new Date(b.data_retorn) - new Date(a.data_retorn);
      }

      return 0;
    })
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex flex-col w-full mx-auto pb-20 p-10 dark:bg-[#282828] bg-blue-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-white">
        Historial de préstecs
      </h2>
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden border border-gray-200 rounded-lg shadow dark:border-[#3c3c3c]">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-[#3c3c3c]">
              <thead className="bg-blue-500 dark:bg-[#282828]">
                <tr>
                  <th className="px-8 py-3 text-left text-xs font-semibold text-white uppercase">
                    Exemplar
                  </th>
                  <th className=" pr-6 py-3 text-right text-xs font-semibold text-white uppercase">
                    Estat
                  </th>
                  <th className="px-8 py-3 text-left text-xs font-semibold text-white uppercase">
                    Data préstec
                  </th>
                  <th className="px-8 py-3 text-left text-xs font-semibold text-white uppercase">
                    Data retorn
                  </th>
                  <th className="px-8 py-3 text-left text-xs font-semibold text-white uppercase">
                    Anotacions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-[#3c3c3c] dark:bg-[#141414]">
                {paginatedData.map((prestec) => {
                  // Determina el estado
                  let estat = "En préstec";
                  if (prestec.data_retorn !== null) {
                    const now = new Date();
                    const dataPrestec = new Date(prestec.data_prestec);
                    const dataRetorn = new Date(prestec.data_retorn);
                    if (now >= dataPrestec && now <= dataRetorn)
                      estat = "En curs";
                    else if (now > dataRetorn) estat = "Retornat";
                    else estat = "-";
                  }

                  // Aplica clase verde si está en curso (manteniendo darkmode)
                  const rowClass =
                    estat === "En curs"
                      ? "hover:bg-blue-100 bg-green-100 transition-colors dark:bg-green-900 dark:hover:bg-green-800"
                      : "hover:bg-blue-100 transition-colors dark:hover:bg-[#3c3c3c]";

                  return (
                    <tr key={prestec.id} className={rowClass}>
                      <td className="px-8 py-4 whitespace-pre-line text-sm text-left text-gray-800 break-all dark:text-white">
                        {(() => {
                          const match =
                            prestec.exemplar.match(/^(.*?-\s*)(.*)$/);
                          if (match) {
                            return (
                              <>
                                {match[1]}
                                <strong>{match[2]}</strong>
                              </>
                            );
                          }
                          return prestec.exemplar;
                        })()}
                      </td>
                      <td className=" py-4 whitespace-pre-line text-sm text-left text-gray-800 break-all dark:text-white">
                        {estat}
                      </td>
                      <td className="px-8 py-4 whitespace-nowrap text-sm text-left text-gray-800 dark:text-white">
                        <span>
                          {prestec.data_prestec}{" "}
                          <span className="text-xs italic text-gray-500">
                            ({timeAgo(prestec.data_prestec)})
                          </span>
                        </span>
                      </td>
                      <td className="px-8 py-4 whitespace-nowrap text-sm text-left text-gray-800 dark:text-white">
                        <span>
                          {prestec.data_retorn}{" "}
                          <span className="text-xs italic text-gray-500">
                            ({timeAgo(prestec.data_retorn)})
                          </span>
                        </span>
                      </td>
                      <td className="px-8 py-4 whitespace-pre-line text-sm text-left text-gray-800 break-all dark:text-white">
                        {prestec.anotacions}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-4 items-center gap-1">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 text-xl rounded-md hover:underline cursor-pointer ${
              currentPage === 1
                ? "text-gray-400 border-gray-200 !cursor-not-allowed dark:text-gray-600 dark:border-[#3c3c3c]"
                : "text-blue-700 border-blue-300 hover:bg-blue-100 dark:text-blue-400 dark:border-[#3c3c3c] dark:hover:bg-[#3c3c3c]"
            }`}
          >
            «
          </button>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 text-xl rounded-md hover:underline cursor-pointer ${
              currentPage === 1
                ? "text-gray-400 border-gray-200 !cursor-not-allowed dark:text-gray-600 dark:border-[#3c3c3c]"
                : "text-blue-700 border-blue-300 hover:bg-blue-100 dark:text-blue-400 dark:border-[#3c3c3c] dark:hover:bg-[#3c3c3c]"
            }`}
          >
            ‹
          </button>
          {/* CAMBIO: solo mostramos los botones de las páginas calculadas */}
          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`mx-1 px-3 py-1 text-xl rounded-md transition-all cursor-pointer ${
                currentPage === page
                  ? "bg-blue-700 text-white border-[#8B8EF9] dark:bg-blue-500 dark:border-[#8B8EF9]"
                  : "bg-blue-500 text-white border-gray-300 hover:bg-blue-300 dark:bg-[#3c3c3c] dark:border-[#3c3c3c] dark:hover:bg-[#282828]"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 text-xl rounded-md hover:underline cursor-pointer ${
              currentPage === totalPages
                ? "text-gray-400 border-gray-200 !cursor-not-allowed dark:text-gray-600 dark:border-[#3c3c3c]"
                : "text-blue-700 border-blue-300 hover:bg-blue-100 dark:text-blue-400 dark:border-[#3c3c3c] dark:hover:bg-[#3c3c3c]"
            }`}
          >
            ›
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 text-xl rounded-md hover:underline cursor-pointer ${
              currentPage === totalPages
                ? "text-gray-400 border-gray-200 !cursor-not-allowed dark:text-gray-600 dark:border-[#3c3c3c]"
                : "text-blue-700 border-blue-300 hover:bg-blue-100 dark:text-blue-400 dark:border-[#3c3c3c] dark:hover:bg-[#3c3c3c]"
            }`}
          >
            »
          </button>
        </div>
      )}
    </div>
  );
}
