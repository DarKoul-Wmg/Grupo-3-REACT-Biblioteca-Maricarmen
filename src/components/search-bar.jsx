import { useState, useEffect, useRef } from "react";
import Button from "./ui/button";
import { getBooks } from "../services/api";
import { getBookById } from "../services/api";

export default function SearchBar({
  placeholder = "Search a Book",
  className = "text-black",
  onBookSelect,
  onSearch,
  setSelectedExemplars,
  ...props
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchQuery.length < 3) {
      setFilteredItems([]);
      setIsOpen(false);
      return;
    }

    let active = true;
    setIsLoading(true);

    getBooks(searchQuery).then((books) => {
      if (!active) return;

      const items = books.slice(0, 5); // Obtener los primeros 5 libros

      setFilteredItems(items);
      setIsOpen(true);
      setIsLoading(false);

      // Mantener el foco tras actualizar
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    });

    return () => {
      active = false;
    };
  }, [searchQuery]);

  useEffect(() => {
    const closeOnClickOutside = (e) => {
      if (!e.target.closest(".search-bar-container")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", closeOnClickOutside);
    return () => document.removeEventListener("mousedown", closeOnClickOutside);
  }, []);

  const handleBookClick = (book) => {
    getBookById(book.id).then((value) => setSelectedExemplars(value.exemplars));

    onBookSelect?.(book); // Pasar el objeto completo del libro seleccionado
    setIsOpen(false); // Cerrar el menú desplegable
    inputRef.current?.focus(); // Mantener el foco en el input
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch?.(filteredItems); // Pasar los resultados de búsqueda al componente padre
  };

  return (
    <form
      className={`search-bar-container flex items-center gap-3 ${className}`}
      onSubmit={handleSearch}
      {...props}
    >
      <div className="relative w-full">
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="py-2.5 sm:py-3 ps-10 pe-4 w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500"
          autoComplete="off"
          spellCheck="false"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          🔍
        </div>
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        )}
        {isOpen && filteredItems.length > 0 && (
          <div className="absolute z-50 w-full bg-white mt-1 rounded-xl shadow-xl">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleBookClick(item)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between"
              >
                <span>{item.titol}</span>
                {item.autor && (
                  <span className="text-xs text-gray-500">{item.autor}</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
      <Button
        type="submit"
        className="text-sm"
        onMouseDown={(e) => e.preventDefault()}
      >
        Search
      </Button>
    </form>
  );
}
