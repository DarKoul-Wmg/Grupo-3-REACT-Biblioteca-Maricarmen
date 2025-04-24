import { useState } from "react";
import { searchUsers, insertLoan } from "../../services/api";
import Toast from "./custom-toast";

export default function Modal({ loanDetails, onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  let searchTimeout;

  const handleSearch = (query) => {
    setSearchQuery(query);
    clearTimeout(searchTimeout);
    if (query.length > 2) {
      searchTimeout = setTimeout(async () => {
        try {
          const results = await searchUsers(query);
          console.log("User results: ", results);
          setSearchResults(results);
        } catch (error) {
          console.error("Error en la búsqueda de usuarios:", error.message);
          setSearchResults([]);
        }
      }, 300); // 300ms de debounce
    } else {
      setSearchResults([]);
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setSearchResults([]);
    setSearchQuery(user.name);
  };

  const handleLoan = () => {
    console.log("Préstec realitzat:", {
      book: loanDetails,
      user: selectedUser,
      loanStart: new Date().toISOString().split("T")[0],
      loanEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    });

    insertLoan(selectedUser.id, loanDetails.id)
      .then((response) => {
        Toast.success(`Préstec realitzat correctament: ${response}`);
      })
      .catch((error) => {
        Toast.error(`ERROR: ${error}`);
      });

    onClose();
  };

  const loanStart = new Date().toISOString().split("T")[0];
  const loanEnd = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">
            Préstec de llibre
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 hover:bg-gray-100 focus:outline-none"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Centre</h4>
            <p className="text-base font-semibold text-gray-800">
              {loanDetails?.centre?.nom}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">
              <strong>Llibre a prestar: </strong>
              {loanDetails?.bookTitle || "Títol del llibre"}
            </h4>
            <p className="text-base font-semibold text-gray-800">
              {loanDetails?.nom}
            </p>
          </div>

          <div className="flex items-center justify-between gap-2 bg-gray-50 p-4 rounded-md">
            <div className="">
              <p className="text-xs text-gray-500">Inici</p>
              <p className="text-base font-medium text-gray-700">{loanStart}</p>
            </div>
            <div className="text-gray-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Fi previst de préstec</p>
              <p className="text-base font-medium text-gray-700">{loanEnd}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cerca d'usuari
            </label>
            <div className="relative">
              <input
                type="text"
                value={
                  selectedUser && selectedUser.length > 0
                    ? `${selectedUser[0].first_name} ${selectedUser[0].last_name}`
                    : searchQuery
                }
                onChange={(e) => {
                  if (!selectedUser || selectedUser.length === 0)
                    handleSearch(e.target.value);
                }}
                className="w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Buscar per nom/cognom/tfn"
                disabled={selectedUser && selectedUser.length > 0} // Deshabilitar el input si hay un usuario seleccionado
              />
              {selectedUser && selectedUser.length > 0 && (
                <button
                  onClick={() => {
                    setSelectedUser([]); // Limpiar la selección del usuario
                    setSearchQuery("");
                    setSearchResults([]);
                  }}
                  className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              )}
            </div>
            {selectedUser.length === 0 && searchResults.length > 0 && (
              <ul className="mt-2 max-h-40 overflow-y-auto border border-gray-200 rounded-md divide-y">
                {searchResults.map((user) => (
                  <li
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className="p-2 hover:bg-blue-50 cursor-pointer text-sm"
                  >
                    {user.first_name} {user.last_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex justify-end items-center gap-2 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel·lar
          </button>
          <button
            onClick={handleLoan}
            disabled={!selectedUser}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg shadow-sm transition-colors ${
              selectedUser
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Confirmar préstec
          </button>
        </div>
      </div>
    </div>
  );
}
