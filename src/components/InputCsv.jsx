import { useState } from "react";
import { importCsv } from "../services/api";
import Button from "./ui/button";

export default function InputCsv() {
  const [file, setFile] = useState(null);

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
    } catch (error) {
      console.error("Error al pujar l'arxiu:", error);
      alert("Error al pujar l'arxiu");
    }
  }

  return (
    <div className="w-full flex items-center justify-center dark:bg-[#282828] bg-blue-100">
      <div className="flex items-center justify-center flex-col gap-4">
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 mb-8 rounded-md cursor-pointer w-50 text-center dark:bg-[#282828] dark:hover:bg-[#3c3c3c] dark:text-white"
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
          onClick={handleUpload}
          disabled={!file}
          variant="outline"
          className={`${!file ? "!cursor-not-allowed" : ""}`}
        >
          Enviar arxiu
        </Button>
      </div>
    </div>
  );
}
