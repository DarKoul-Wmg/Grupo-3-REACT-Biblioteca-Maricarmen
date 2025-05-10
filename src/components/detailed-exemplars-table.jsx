import React, { useState, useEffect, useContext } from "react";
import Button from "./ui/button";
import { generateBarcodePdf, searchExemplars } from "../services/api";
import { AuthContext } from "../contexts/authcontext";
import { useTransition } from "react";
import Select from "./ui/select";

export default function DetailedExemplarsTable() {
  const { userToken } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, startTransition] = useTransition();
  const [selectedSearch, setSelectedSearch] = useState("text_search");
  const [minRangeSearch, setMinRangeSearch] = useState("");
  const [maxRangeSearch, setMaxRangeSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, [currentPage, searchQuery]);

  useEffect(() => {
    processsRangeChange();
  }, [minRangeSearch, maxRangeSearch]);

  useEffect(() => {
    setSearchQuery("");
  }, [selectedSearch]);

  async function fetchData() {
    if (searchQuery.length < 3) {
      setData([]);
      return;
    }

    startTransition(async () => {
      try {
        const response = await searchExemplars(
          searchQuery,
          currentPage,
          userToken
        );
        setData(response.results);
        setTotalPages(response.total_pages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    });
  }

  function handleCheckboxChange(exemplar) {
    setSelectedItems((prev) => {
      const newSelected = { ...prev };
      if (newSelected[exemplar.registre]) {
        delete newSelected[exemplar.registre];
      } else {
        newSelected[exemplar.registre] = exemplar;
      }
      return newSelected;
    });
  }

  async function handleGeneratePdf() {
    const selectedArray = Object.values(selectedItems);
    if (selectedArray.length === 0) {
      alert("Selecciona almenys un exemplar.");
      return;
    }

    try {
      const formattedArray = selectedArray.map((item) => ({
        id: item.registre,
        cdu: item.cdu,
        title: item.titol,
        center: item.centre,
      }));

      const pdfBlob = await generateBarcodePdf(formattedArray);
      const iframe = document.createElement("iframe");
      iframe.style.visibility = "hidden";
      iframe.src = pdfBlob;
      document.body.appendChild(iframe);

      iframe.onload = () => {
        setTimeout(() => {
          iframe.contentWindow.focus();
          iframe.contentWindow.print();
          document.body.removeChild(iframe);
        }, 500);
      };
    } catch (error) {
      console.error("Error al generar el PDF:", error);
      alert("Error al generar el PDF");
    }
  }

  function handleSearchChange(event) {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  }

  function handlePageChange(page) {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }

  const columns = [
    { key: "registre", label: "REG" },
    { key: "titol", label: "TÍTOL" },
    { key: "autor", label: "AUTOR" },
    { key: "cdu", label: "CDU" },
    { key: "centre", label: "CENTRE" },
  ];

  const options = [
    { value: "text_search", label: "Busca per text" },
    { value: "id_search", label: "Filtra per Rang de Registres" },
  ];

  function processsRangeChange() {
    if (maxRangeSearch && minRangeSearch) {
      const currentYear = new Date().getFullYear();
      const formattedMinRange = minRangeSearch.padStart(6, "0");
      const formattedMaxRange = maxRangeSearch.padStart(6, "0");

      const formattedRange = `EX-1900-${formattedMinRange}_to_EX-${currentYear}-${formattedMaxRange}`;
      console.log("Formatted Range:", formattedRange);
      setSearchQuery(formattedRange);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-5">
      <div className="overflow-x-auto flex w-full max-w-6xl gap-3 flex-col">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          Cerca de Exemplars
        </h1>

        <div className="p-1 min-w-full inline-block align-middle items-center justify-start">
          <div className="border border-gray-200 rounded-lg divide-y divide-gray-200 bg-white h-full flex flex-col dark:border-[#3c3c3c] dark:divide-[#3c3c3c] dark:bg-[#141414]">
            <div className="py-3 px-4 w-full flex gap-3">
              <Select
                options={options}
                defaultOption={options[0]}
                placeholder="Busca per..."
                selectClasses="border-blue-300"
                optionClasses="text-gray-700"
                dropdownClasses="w-full max-w-[180px]"
                setSelectedOption={setSelectedSearch}
              />

              {selectedSearch === "text_search" ? (
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="py-1.5 px-3 w-full border-gray-200 text-black bg-white shadow-2xs rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-[#1e1e1e] dark:border-[#3c3c3c] dark:text-white border-1"
                  placeholder="Cerca per autor/item/editorial"
                />
              ) : (
                <div className="flex gap-2 items-center dark:text-white">
                  <label htmlFor="minRangeSearch">Minim:</label>
                  <input
                    type="number"
                    max="999999"
                    value={minRangeSearch}
                    onChange={(e) => {
                      setMinRangeSearch(e.target.value);
                    }}
                    className="py-1.5 px-3 w-full border-gray-200 shadow-2xs rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-[#1e1e1e] dark:border-[#3c3c3c] dark:text-white"
                  />
                  <label htmlFor="maxRangeSearch">Maxim:</label>
                  <input
                    type="number"
                    max="999999"
                    value={maxRangeSearch}
                    onChange={(e) => {
                      setMaxRangeSearch(e.target.value);
                    }}
                    className="py-1.5 px-3 w-full border-gray-200 shadow-2xs rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-[#1e1e1e] dark:border-[#3c3c3c] dark:text-white"
                  />
                </div>
              )}
            </div>
            {!loading ? (
              <div className="overflow-hidden w-full">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-[#3c3c3c]">
                  <thead className="bg-gray-50 dark:bg-[#282828]">
                    {data.length > 0 && (
                      <tr>
                        <th className="py-3 px-4"></th>
                        {columns.map((column) => (
                          <th
                            key={column.key}
                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-white"
                          >
                            {column.label}
                          </th>
                        ))}
                      </tr>
                    )}
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-[#3c3c3c] bg-white dark:bg-[#141414]">
                    {data.map((row) => (
                      <tr
                        key={row.registre}
                        className="hover:bg-blue-100 dark:hover:bg-[#3c3c3c]"
                      >
                        <td className="py-3 px-4">
                          <input
                            type="checkbox"
                            checked={!!selectedItems[row.registre]}
                            onChange={() => handleCheckboxChange(row)}
                            className="border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        {columns.map((column) => (
                          <td
                            key={column.key}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                          >
                            {row[column.key]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <h1>Carregant...</h1>
            )}
            {Object.keys(selectedItems).length > 0 && !loading && (
              <div className="flex items-center gap-3 p-4 dark:text-white text-black">
                <span className="text-sm">
                  Items seleccionats: {Object.keys(selectedItems).length}
                </span>
                <Button variant="outline" onClick={handleGeneratePdf}>
                  Imprimeix etiquetes
                </Button>
              </div>
            )}
          </div>
          {data.length > 0 && !loading && (
            <div className="flex justify-center mt-4 items-center gap-1">
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 text-xl rounded-md hover:underline cursor-pointer ${
                  currentPage === 1
                    ? "text-gray-400 border-gray-200 !cursor-not-allowed"
                    : "text-blue-700 border-blue-300 hover:bg-blue-100"
                }`}
              >
                «
              </button>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 text-xl rounded-md hover:underline cursor-pointer ${
                  currentPage === 1
                    ? "text-gray-400 border-gray-200 !cursor-not-allowed"
                    : "text-blue-700 border-blue-300 hover:bg-blue-100"
                }`}
              >
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1)
                .filter(
                  (page) =>
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 2 && page <= currentPage + 2)
                )
                .map((page, index, array) => (
                  <React.Fragment key={page}>
                    {index > 0 && page !== array[index - 1] + 1 && (
                      <span className="mx-1">...</span>
                    )}
                    <button
                      onClick={() => handlePageChange(page)}
                      className={`mx-1 px-3 py-1 text-xl rounded-md transition-all cursor-pointer ${
                        currentPage === page
                          ? "bg-blue-700 text-white"
                          : "bg-blue-500 text-white hover:bg-blue-300"
                      }`}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 text-xl rounded-md hover:underline cursor-pointer ${
                  currentPage === totalPages
                    ? "text-gray-400 border-gray-200 !cursor-not-allowed"
                    : "text-blue-700 border-blue-300 hover:bg-blue-100"
                }`}
              >
                ›
              </button>
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 text-xl rounded-md hover:underline cursor-pointer ${
                  currentPage === totalPages
                    ? "text-gray-400 border-gray-200 !cursor-not-allowed"
                    : "text-blue-700 border-blue-300 hover:bg-blue-100"
                }`}
              >
                »
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
