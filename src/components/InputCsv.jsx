import { useState } from "react";
import { importCsv } from "../services/api";
import Button from "./ui/button";

import { generateBarcodePdf } from "../services/api";
export default function InputCsv() {
  const [file, setFile] = useState(null);
  const [responseData, setResponseData] = useState({
    imported: 0,
    errorCount: 0,
    warningCount: 0,
    resultsMessage: [],
    resultsStatus: [],
    message: "",
  });

  function handleFileChange(event) {
    const file = event.target.files[0];

    if (!file) {
      alert("Selecciona un arxiu");
    }

    const isCsv = file.name.endsWith(".csv") || file.type === "text/csv";

    if (!isCsv) {
      alert("Selecciona un CSV vàlid");
      event.target.value = null;
      return;
    }
    alert("Arxiu carregat correctament");
    setFile(file);
  }

  async function handleUpload() {
    if (!file) {
      alert("No has seleccionat cap arxiu");
      return;
    }
    try {
      const response = await importCsv(file);
      setResponseData({
        imported: response.imported || 0,
        errorCount: response.errorCount || 0,
        warningCount: response.warningCount || 0,
        resultsMessage: response.resultsMessage || [],
        resultsStatus: response.resultsStatus || [],
        message: response.message || "",
      });
      //The response is gonna have ok, error and warning inside, make an useState with those that has each empty by default and fill the data in here
    } catch (error) {
      console.error("Error al pujar l'arxiu:", error);
      alert("Error al pujar l'arxiu");
    }
  }

  return (
    <div className="w-full flex items-center justify-center dark:bg-[#282828] bg-blue-100">
      <div className="flex items-center justify-center flex-col gap-4">
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-2 mt-0">
          Importar Usuaris
        </h1>
        <div className="flex items-center justify-center flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-white">
            Selecciona un arxiu CSV:
          </label>
          {/* Se oculta el input por defecto y los estilos del navegador*/}
          <input
            id="fileInput"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />

          <label
            htmlFor="fileInput"
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 mb-8 rounded-md cursor-pointer w-50 text-center dark:hover:bg-[#3c3c3c] dark:text-white"
          >
            Seleccionar un arxiu
          </label>
          {file ? (
            <p className="text-sm text-green-600 dark:text-green-400">
              Arxiu seleccionat: <strong>{file.name}</strong>
            </p>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No s'ha seleccionat cap arxiu
            </p>
          )}
        </div>

        <Button
          type="button"
          onClick={handleUpload}
          disabled={!file}
          variant="outline"
          className={`${!file ? "!cursor-not-allowed" : ""}`}
        >
          Enviar arxiu
        </Button>

        {responseData.message && (
          <p className="mt-6 text-black dark:text-white">
            Importació completada. Usuaris importats:{" "}
            <span className="text-green-600 font-bold">
              {responseData.imported}
            </span>
            . Errors:{" "}
            <span className="text-red-600 font-bold">
              {responseData.errorCount}
            </span>
            . Warnings:{" "}
            <span className="text-yellow-600 font-bold">
              {responseData.warningCount}
            </span>
          </p>
        )}
        {(responseData.resultsMessage.length > 0 ||
          responseData.resultsStatus.length > 0 ||
          responseData.imported > 0) && (
          <div className="w-full max-w-2xl mt-4 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#181818] shadow">
            <div className="overflow-y-auto max-h-90">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr>
                    <th className="border-b border-gray-400 dark:border-gray-700 px-4 py-2 bg-white dark:bg-[#232a3a] text-gray-800 dark:text-white">
                      Línia
                    </th>
                    <th className="border-b border-gray-400 dark:border-gray-700 px-4 py-2 bg-white dark:bg-[#232a3a] text-gray-800 dark:text-white">
                      Missatge
                    </th>
                    <th className="border-b border-gray-400 dark:border-gray-700 px-4 py-2 bg-white dark:bg-[#232a3a] text-gray-800 dark:text-white">
                      Tipus
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {responseData.resultsMessage.map((error, index) => {
                    const lineNumber = error.match(/\d+/)?.[0] || "N/A";
                    const errorType =
                      responseData.resultsStatus[index]?.toLowerCase() ===
                      "warning"
                        ? "Avís"
                        : responseData.resultsStatus[index]?.toLowerCase() ===
                          "success"
                        ? "Èxit"
                        : "Error";
                    const textColor =
                      errorType === "Avís"
                        ? "text-yellow-600 dark:text-yellow-400"
                        : errorType === "Èxit"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400";

                    return (
                      <tr key={`error-${index}`}>
                        <td className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-800 dark:text-white">
                          {lineNumber}
                        </td>
                        <td className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-gray-800 dark:text-white">
                          {error}
                        </td>
                        <td
                          className={`border-b border-gray-300 dark:border-gray-700 px-4 py-2 font-medium ${textColor}`}
                        >
                          {errorType}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
