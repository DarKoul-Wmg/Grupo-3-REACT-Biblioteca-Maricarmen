import { useState, useEffect, useRef } from "react";
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
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  // Use this to track if we should refocus after API call
  const shouldRefocus = useRef(false);

  useEffect(() => {
    let isMounted = true;

    if (searchQuery.length >= 3) {
      // Before starting the API call, mark that we should refocus after
      shouldRefocus.current = true;
      setIsLoading(true);

      const fetchBooks = async () => {
        try {
          const books = await getBooks(searchQuery);

          // Only update state if component is still mounted
          if (isMounted) {
            const formattedBooks = books.slice(0, 5).map((book) => ({
              id: book.id,
              title: book.titol,
              link: `/libro/${book.id}`,
              subTitle: book.autor,
            }));

            setSearchItems(formattedBooks);
            setFilteredItems(formattedBooks);
            setIsOpen(true);
            setIsLoading(false);

            // Force refocus after state updates complete
            setTimeout(() => {
              if (shouldRefocus.current && inputRef.current) {
                inputRef.current.focus();
              }
            }, 0);
          }
        } catch (error) {
          console.error("Error fetching books:", error);
          if (isMounted) {
            setIsLoading(false);

            // Still try to refocus on error
            setTimeout(() => {
              if (shouldRefocus.current && inputRef.current) {
                inputRef.current.focus();
              }
            }, 0);
          }
        }
      };

      fetchBooks();
    } else {
      setFilteredItems([]);
      setIsOpen(false);
    }

    return () => {
      isMounted = false;
    };
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".search-bar-container")) {
        setIsOpen(false);
        setIsFocused(false);
        shouldRefocus.current = false; // Reset refocus flag
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    setIsOpen(e.target.value.length >= 3);
  };

  const handleFocus = () => {
    setIsFocused(true);
    shouldRefocus.current = true; // Set refocus flag when input gets focus
    setIsOpen(searchQuery.length >= 3);
  };

  const handleBlur = (e) => {
    // Only handle blur if it's not moving to an element within our component
    if (!e.currentTarget.contains(e.relatedTarget)) {
      // Check if the next active element is within our component
      setTimeout(() => {
        // If we should maintain focus, refocus the input
        if (shouldRefocus.current && inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleBookClick = (bookId) => {
    if (onBookSelect) {
      onBookSelect(bookId);
    }

    // After selection, maintain focus
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`search-bar-container flex items-center gap-3 ${className}`}
      onBlur={handleBlur} // Add blur handler to the form
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
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={isOpen ? "true" : "false"}
            placeholder={placeholder}
            value={searchQuery}
            onChange={handleChange}
            onFocus={handleFocus}
            className="py-2.5 sm:py-3 ps-10 pe-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          />
        </div>

        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        )}

        {isOpen && searchQuery.length >= 3 && isFocused && (
          <div className="absolute z-50 w-full bg-white rounded-xl shadow-xl">
            <div className="max-h-125 p-2 overflow-y-auto overflow-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div key={item.id}>
                    <button
                      className="py-2 px-3 flex items-center gap-x-3 hover:bg-gray-100 rounded-lg w-full text-left"
                      onClick={() => handleBookClick(item.id)}
                      type="button"
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
      <Button
        type="submit"
        className="text-sm"
        onMouseDown={(e) => {
          // Prevent blur when clicking the button
          if (isFocused) e.preventDefault();
        }}
      >
        Search
      </Button>
    </form>
  );
}
