import { useState, useEffect } from "react";
import Button from "./ui/button";
import { getBooks } from "../services/api";

export default function SearchBar({
  placeholder = "Search a Book",
  className = "text-black",
  onBookSelect,
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchItems, setSearchItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (searchQuery.length >= 3) {
      const fetchBooks = async () => {
        try {
          const books = await getBooks(searchQuery);
          console.log("Backend response:", books);

          const formattedBooks = books.slice(0, 5).map((book) => ({
            id: book.id,
            title: book.titol,
            link: `/libro/${book.id}`,
            subTitle: book.autor,
          }));
          console.log("FORMATTED BOOKS", formattedBooks);

          setSearchItems(formattedBooks);
          setFilteredItems(formattedBooks);
          setIsOpen(true);
        } catch (error) {
          console.error("Error fetching books:", error);
        }
      };

      fetchBooks();
    } else {
      setIsOpen(false);
    }
  }, [searchQuery]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.length < 3) {
      console.log("Search query too short, redirecting to results page...");
    }
  };

  const handleBookClick = (bookId) => {
    console.log("Book clicked with ID:", bookId);

    console.log("Props in SearchBar:", { onBookSelect });

    if (onBookSelect) {
      console.log("onBookSelect is defined, calling it with bookId:", bookId);
      onBookSelect(bookId);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center gap-3 ${className}`}
      {...props}
    >
      <div className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
            <svg
              className="shrink-0 size-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <input
            type="text"
            role="combobox"
            aria-expanded={isOpen ? "true" : "false"}
            placeholder={placeholder}
            value={searchQuery}
            onChange={handleChange}
            className="py-2.5 sm:py-3 ps-10 pe-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          />
        </div>

        {isOpen && searchQuery.length >= 3 && (
          <div className="absolute z-50 w-full bg-white rounded-xl shadow-xl">
            <div className="max-h-125 p-2 overflow-y-auto overflow-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div key={item.id}>
                    <button
                      className="py-2 px-3 flex items-center gap-x-3 hover:bg-gray-100 rounded-lg w-full text-left"
                      onClick={() => handleBookClick(item.id)}
                    >
                      <span className="text-sm text-gray-800">
                        {item.title}
                      </span>
                      {item.subTitle && (
                        <span className="ms-auto text-xs text-gray-400">
                          {item.subTitle}
                        </span>
                      )}
                    </button>
                  </div>
                ))
              ) : (
                <div className="py-2 px-3 text-gray-500">No results found</div>
              )}
            </div>
          </div>
        )}
      </div>
      <Button type="submit" className="text-sm">
        Search
      </Button>
    </form>
  );
}
