import React, { useState, useEffect } from "react";
import Button from "./ui/button";
import { generateBarcodePdf } from "../services/api";

export default function DetailedExemplarsTable() {
  const [data, setData] = useState([]);
  //TEST- BORRAR MAS TARDE
  useEffect(() => {
    const exampleData = [
      {
        id: "001",
        name: "Book One",
        author: "Author A",
        cdu: "123.45",
        centre: "Centre 1",
      },
      {
        id: "002",
        name: "Book Two",
        author: "Author B",
        cdu: "678.90",
        centre: "Centre 2",
      },
      {
        id: "003",
        name: "Book Three",
        author: "Author C",
        cdu: "111.22",
        centre: "Centre 3",
      },
      {
        id: "004",
        name: "Book Four",
        author: "Author D",
        cdu: "333.44",
        centre: "Centre 4",
      },
      {
        id: "005",
        name: "Book Five",
        author: "Author E",
        cdu: "555.66",
        centre: "Centre 5",
      },
    ];
    setData(exampleData);
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    console.log("Buscando");
  }, [currentPage, searchQuery]);

  async function fetchData() {
    try {
      const response = await fetchExemplars({
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery,
      });
      setData(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function testpdf() {
    try {
      const pdfBlob = await generateBarcodePdf([
        {
          id: "EX-2025-123456",
          cdu: "123223232",
          title: "HOLAAAAA",
          center: "Ies example",
        },
        {
          id: "EX-2025-123456",
          cdu: "123223232",
          title: "Adiooss",
          center: "Ies example",
        },
        {
          id: "EX-2025-123456",
          cdu: "123223232",
          title: "Adiooss",
          center: "Ies example",
        },
        {
          id: "EX-2025-123456",
          cdu: "123223232",
          title: "HOLAAAAA",
          center: "Ies example",
        },
        {
          id: "EX-2025-123456",
          cdu: "123223232",
          title: "Adiooss",
          center: "Ies example",
        },
        {
          id: "EX-2025-123456",
          cdu: "123223232",
          title: "Adiooss",
          center: "Ies example",
        },
        {
          id: "EX-2025-123456",
          cdu: "123223232",
          title: "HOLAAAAA",
          center: "Ies example",
        },
        {
          id: "EX-2025-123456",
          cdu: "123223232",
          title: "Adiooss",
          center: "Ies example",
        },
        {
          id: "EX-2025-123456",
          cdu: "123223232",
          title: "Adiooss",
          center: "Ies example",
        },
        {
          id: "EX-2025-123456",
          cdu: "123223232",
          title: "HOLAAAAA",
          center: "Ies example",
        },
        {
          id: "EX-2025-123456",
          cdu: "123223232",
          title: "Adiooss",
          center: "Ies example",
        },
        {
          id: "EX-2025-123456",
          cdu: "123223232",
          title: "Adiooss",
          center: "Ies example",
        },
        {
          id: "EX-2025-123456",
          cdu: "123223232",
          title: "HOLAAAAA",
          center: "Ies example",
        },
        {
          id: "EX-2025-123456",
          cdu: "123223232",
          title: "Adiooss",
          center: "Ies example",
        },
        {
          id: "EX-2025-123456",
          cdu: "123223232",
          title: "Adiooss",
          center: "Ies example",
        },
        {
          id: "EX-2025-123456",
          cdu: "123223232",
          title: "Adiooss",
          center: "Ies example",
        },
        {
          id: "EX-2025-123456",
          cdu: "123223232",
          title: "Adiooss",
          center: "Ies example",
        },
        {
          id: "EX-2025-123456",
          cdu: "123223232",
          title: "HOLAAAAA",
          center: "Ies example",
        },
        {
          id: "EX-2025-123456",
          cdu: "123223232",
          title: "Adiooss",
          center: "Ies example",
        },
        {
          id: "EX-2025-123456",
          cdu: "123223232",
          title: "Adiooss",
          center: "Ies example",
        },
        {
          id: "EX-2025-123456",
          cdu: "123223232",
          title: "HOLAAAAA",
          center: "Ies example",
        },
        {
          id: "EX-2025-123456",
          cdu: "123223232",
          title: "Adiooss",
          center: "Ies example",
        },
        {
          id: "EX-2025-123456",
          cdu: "123223232",
          title: "Adiooss",
          center: "Ies example",
        },
        {
          id: "EX-2025-123456",
          cdu: "123223232",
          title: "HOLAAAAA",
          center: "Ies example",
        },
        {
          id: "EX-2025-123456",
          cdu: "123223232",
          title: "Adiooss",
          center: "Ies example",
        },
        {
          id: "EX-2025-123456",
          cdu: "123223232",
          title: "Adiooss",
          center: "Ies example",
        },
        {
          id: "EX-2025-123456",
          cdu: "123223232",
          title: "HOLAAAAA",
          center: "Ies example",
        },
        {
          id: "EX-2025-123456",
          cdu: "123223232",
          title: "Adiooss",
          center: "Ies example",
        },
        {
          id: "EX-2025-123456",
          cdu: "123223232",
          title: "Adiooss",
          center: "Ies example",
        },
        {
          id: "EX-2025-123456",
          cdu: "123223232",
          title: "HOLAAAAA",
          center: "Ies example",
        },
        {
          id: "EX-2025-123456",
          cdu: "123223232",
          title: "Adiooss",
          center: "Ies example",
        },
        {
          id: "EX-2025-123456",
          cdu: "123223232",
          title: "Adiooss",
          center: "Ies example",
        },
        {
          id: "EX-2025-123456",
          cdu: "123223232",
          title: "Adiooss",
          center: "Ies example",
        },
        {
          id: "EX-2025-123456",
          cdu: "123223232",
          title: "Adiooss",
          center: "Ies example",
        },
      ]);
      const iframe = document.createElement("iframe");
      iframe.style.visibility = "hidden"; // en vez de display:none
      iframe.src = pdfBlob;
      document.body.appendChild(iframe);

      iframe.onload = () => {
        setTimeout(() => {
          iframe.contentWindow.focus();
          iframe.contentWindow.print();
          document.body.removeChild(iframe);
        }, 500); // pequeño delay para asegurar que cargó
      };
    } catch (error) {
      console.error("Error al generar el PDF:", error);
      alert("Error al generar el PDF");
    }
  }

  function handleSearchChange(event) {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page on search
  }

  function handlePageChange(page) {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }

  const columns = [
    { key: "id", label: "REG" },
    { key: "name", label: "TÍTOL" },
    { key: "author", label: "AUTOR" },
    { key: "cdu", label: "CDU" },
    { key: "centre", label: "CENTRE" },
  ];

  return (
    <div className="flex flex-col h-full items-center">
      <div className="overflow-x-auto flex-1">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border border-gray-200 rounded-lg divide-y divide-gray-200 bg-white h-full">
            <div className="py-3 px-4">
              <div className="relative flex justify-between">
                <div className="flex w-1/2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="py-1.5 sm:py-2 px-3 block w-full border-gray-200 shadow-2xs rounded-lg sm:text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="Cerca per autor/item"
                  />
                </div>
                <div className="flex space-x-2">
                  <label htmlFor="" className="text-xs">
                    Filtrar per codis:
                  </label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={() => {}}
                    className="py-1.5 sm:py-2 px-3 block w-24 border-gray-200 shadow-2xs rounded-lg sm:text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="Min"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={() => {}}
                    className="py-1.5 sm:py-2 px-3 block w-24 border-gray-200 shadow-2xs rounded-lg sm:text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>
            <div className="overflow-hidden flex-1">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4">
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          className="border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500"
                        />
                      </div>
                    </th>
                    {columns.map((column) => (
                      <th
                        key={column.key}
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((row, index) => (
                    <tr key={index}>
                      <td className="py-3 px-4">
                        <div className="flex items-center h-5">
                          <input
                            type="checkbox"
                            className="border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500"
                          />
                        </div>
                      </td>
                      {columns.map((column) => (
                        <td
                          key={column.key}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-left"
                        >
                          {row[column.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <h1>Items Seleccionats: </h1>
            <Button variant="outline" onClick={testpdf}>
              Imprimeix etiquetes
            </Button>
          </div>
        </div>
        <div className="flex justify-center mt-4 items-center gap-1">
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
          {[...Array(totalPages)].map((_, page) => (
            <button
              key={page + 1}
              onClick={() => handlePageChange(page + 1)}
              className={`mx-1 px-3 py-1 text-xl rounded-md border ${
                currentPage === page + 1
                  ? "bg-blue-700 text-white"
                  : "bg-blue-500 text-white hover:bg-blue-300"
              }`}
            >
              {page + 1}
            </button>
          ))}
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
      </div>
    </div>
  );
}
