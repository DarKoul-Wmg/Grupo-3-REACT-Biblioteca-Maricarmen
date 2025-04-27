import { getItemById } from "../services/api";

export default function BooksTable({
  data,
  onBookSelect,
  setSelectedExemplars,
  onPageChange,
  isPending,
}) {
  const { current_page, total_pages, results } = data;

  const maxPagesToShow = 5;
  let startPage = Math.max(1, current_page - Math.floor(maxPagesToShow / 2));
  let endPage = startPage + maxPagesToShow - 1;

  if (endPage > total_pages) {
    endPage = total_pages;
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-col w-full mx-auto pb-20 p-10 dark:bg-[#282828] bg-blue-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-white">
        Llistat de llibres
      </h2>

      {isPending && (
        <div className="flex justify-center items-center py-4">
          <span className="text-blue-500 text-lg dark:text-white">
            Cercant llibres...
          </span>
        </div>
      )}

      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden border border-gray-200 rounded-lg shadow dark:border-[#3c3c3c]">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-[#3c3c3c]">
              <thead className="bg-blue-500 dark:bg-[#282828]">
                <tr>
                  <th className="px-8 py-3 text-left text-xs font-semibold text-white uppercase">
                    Títol
                  </th>
                  <th className="px-8 py-3 text-left text-xs font-semibold text-white uppercase">
                    Autor
                  </th>
                  <th className="px-8 py-3 text-left text-xs font-semibold text-white uppercase">
                    Tipus
                  </th>
                  <th className="px-8 py-3 text-left text-xs font-semibold text-white uppercase">
                    Detalls
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-[#3c3c3c] dark:bg-[#141414]">
                {results.map((book) => (
                  <tr
                    key={book.id}
                    className="hover:bg-blue-100 transition-colors dark:hover:bg-[#3c3c3c]"
                  >
                    <td className="px-8 py-4 text-sm text-left font-medium text-gray-800 dark:text-white">
                      {book.titol}
                    </td>
                    <td className="px-8 py-4 text-sm text-left text-gray-800 dark:text-white">
                      {book.autor}
                    </td>
                    <td className="px-8 py-4 text-sm text-left text-gray-800 dark:text-white">
                      {book.type}
                    </td>
                    <td className="px-8 py-4 text-sm text-left text-blue-600 dark:text-blue-400">
                      <button
                        onClick={() => {
                          console.log("Ejecutando llamada");
                          getItemById(book.id, book.type).then((value) => {
                            setSelectedExemplars(value.exemplars);
                            onBookSelect(value);
                          });
                        }}
                        className="hover:underline text-blue-600 cursor-pointer dark:text-blue-400"
                      >
                        Veure Més
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {total_pages > 1 && (
        <div className="flex justify-center mt-4 items-center gap-1">
          <button
            onClick={() => onPageChange(1)}
            disabled={current_page === 1}
            className={`px-3 py-2 text-xl rounded-md hover:underline cursor-pointer ${
              current_page === 1
                ? "text-gray-400 border-gray-200 !cursor-not-allowed dark:text-gray-600 dark:border-[#3c3c3c]"
                : "text-blue-700 border-blue-300 hover:bg-blue-100 dark:text-blue-400 dark:border-[#3c3c3c] dark:hover:bg-[#3c3c3c]"
            }`}
          >
            «
          </button>
          <button
            onClick={() => onPageChange(current_page - 1)}
            disabled={current_page === 1}
            className={`px-3 py-2 text-xl rounded-md hover:underline cursor-pointer ${
              current_page === 1
                ? "text-gray-400 border-gray-200 !cursor-not-allowed dark:text-gray-600 dark:border-[#3c3c3c]"
                : "text-blue-700 border-blue-300 hover:bg-blue-100 dark:text-blue-400 dark:border-[#3c3c3c] dark:hover:bg-[#3c3c3c]"
            }`}
          >
            ‹
          </button>

          {/* CAMBIO: solo mostramos los botones de las páginas calculadas */}
          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`mx-1 px-3 py-1 text-xl rounded-md transition-all cursor-pointer ${
                current_page === page
                  ? "bg-blue-700 text-white border-[#8B8EF9] dark:bg-blue-500 dark:border-[#8B8EF9]"
                  : "bg-blue-500 text-white border-gray-300 hover:bg-blue-300 dark:bg-[#3c3c3c] dark:border-[#3c3c3c] dark:hover:bg-[#282828]"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => onPageChange(current_page + 1)}
            disabled={current_page === total_pages}
            className={`px-3 py-2 text-xl rounded-md hover:underline cursor-pointer ${
              current_page === total_pages
                ? "text-gray-400 border-gray-200 !cursor-not-allowed dark:text-gray-600 dark:border-[#3c3c3c]"
                : "text-blue-700 border-blue-300 hover:bg-blue-100 dark:text-blue-400 dark:border-[#3c3c3c] dark:hover:bg-[#3c3c3c]"
            }`}
          >
            ›
          </button>
          <button
            onClick={() => onPageChange(total_pages)}
            disabled={current_page === total_pages}
            className={`px-3 py-2 text-xl rounded-md hover:underline cursor-pointer ${
              current_page === total_pages
                ? "text-gray-400 border-gray-200 !cursor-not-allowed dark:text-gray-600 dark:border-[#3c3c3c]"
                : "text-blue-700 border-blue-300 hover:bg-blue-100 dark:text-blue-400 dark:border-[#3c3c3c] dark:hover:bg-[#3c3c3c]"
            }`}
          >
            »
          </button>
        </div>
      )}
    </div>
  );
}
