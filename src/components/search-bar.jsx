import { useState, useEffect, useRef, useTransition } from "react";
import Button from "./ui/button";
import { getBooks, getBookById, searchBook } from "../services/api";

export default function SearchBar({
  placeholder = "Busca un llibre / autor",
  className = "text-black",
  onBookSelect,
  onSearch,
  setSelectedExemplars,
  ...props
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useTransition(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (searchQuery.length < 3) {
        setFilteredItems([]);
        setIsOpen(false);
        return;
      }

      let active = true;

      searchBook(searchQuery).then((books) => {
        if (!active) return;

        const items = books.results.length > 0 ? books.results.slice(0, 5) : []; // Obtener los primeros 5 libros o vacío si no hay resultados

        setFilteredItems(items);
        setIsOpen(true);
      });

      return () => {
        active = false;
      };
    }, 300);

    return () => clearTimeout(debounceTimeout);
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
    getBookById(book.id).then((value) => {
      setSelectedExemplars(value.exemplars);

      onBookSelect?.(value);
      setIsOpen(false);
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    setIsLoading(() => {
      if (searchQuery != "") {
        searchBook(searchQuery).then((books) => {
          if (books) {
            onSearch?.(books);
          } else {
            console.error("No books found");
          }
        });
      } else {
        getBooks().then((books) => {
          if (books) {
            onSearch?.(books);
          } else {
            console.error("No books found");
          }
        });
      }
    });
  };

  return (
    <form
      className={`w-[50%] search-bar-container flex items-center gap-3 pr-[3%] ${className}`}
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
        {isOpen && (
          <div className="absolute z-50 w-full bg-white mt-1 rounded-xl shadow-xl">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleBookClick(item)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center cursor-pointer"
                >
                  <span>
                    {item.titol
                      .split(new RegExp(`(${searchQuery})`, "gi"))
                      .map((part, index) =>
                        part.toLowerCase() === searchQuery.toLowerCase() ? (
                          <b key={index}>{part}</b>
                        ) : (
                          part
                        )
                      )}
                  </span>
                  {item.autor && (
                    <span className="text-xs text-gray-500">
                      {item.autor
                        .split(new RegExp(`(${searchQuery})`, "gi"))
                        .map((part, index) =>
                          part.toLowerCase() === searchQuery.toLowerCase() ? (
                            <b key={index}>{part}</b>
                          ) : (
                            part
                          )
                        )}
                    </span>
                  )}
                </button>
              ))
            ) : (
              <div className="w-full text-left px-4 py-2 text-gray-500">
                No s'han trobat llibres / autors
              </div>
            )}
          </div>
        )}
      </div>
      <Button
        type="submit"
        className="text-sm"
        onMouseDown={(e) => e.preventDefault()}
        loading={isLoading}
      >
        Busca
      </Button>
    </form>
  );
}
