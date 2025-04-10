import { useState } from "react";
import { importCsv } from "../services/api";

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
    <div className="w-full flex items-center justify-center">
      <div className="flex items-center justify-center flex-col gap-4">
        <div className="flex items-center justify-center flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 mb-8 rounded-md cursor-pointer w-50 text-center"
          >
            Seleccionar un arxiu
          </label>
          {file ? (
            <p className="text-sm text-green-600 ">
              Arxiu seleccionat: <strong>{file.name}</strong>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              No s'ha seleccionat cap arxiu
            </p>
          )}
        </div>

        <button
          onClick={handleUpload}
          disabled={!file}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md w-fit 
                        ${!file ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Enviar arxiu
        </button>
      </div>
    </div>
  );
}

// response = {
//     "ok": "Se han importado 9 entradas correctamente",
//     "error": "Han fallado 3 regsitros, revisa las lineas 2, 7 y 9",
//     "warning": "Las entradas 1, 3 y 5 ya existen en la base de datos",
// };
