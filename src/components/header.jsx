import SearchBar from "./search-bar";
import Button from "./ui/button";
import Link from "./ui/link";

export default function Header({ children }) {
  return (
    <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full bg-white border-b border-gray-200">
      <nav className="flex items-center justify-between relative max-w-[85rem] w-full mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <Link href="#" className="block">
          Biblioteca Mari Carmen
        </Link>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <SearchBar />
        </div>

        <Button variant="outline">Log In</Button>
      </nav>
    </header>
  );
}
