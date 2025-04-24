import SearchBar from "./search-bar";
import Button from "./ui/button";
import Link from "./ui/link";
import { useContext } from "react";
import { AuthContext } from "../contexts/authcontext";
import DarkModeSwitch from "./ui/dark-mode-switch";

export default function Header({
  handleBookSelect,
  onSearch,
  onLoginClick,
  setSelectedExemplars,
  ...props
}) {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full bg-white dark:bg-[#141414] border-b border-gray-200 dark:border-[#3c3c50]">
      <nav className="flex items-center justify-between relative w-full py-5 px-4">
        <Link href="/" className="block">
          Biblioteca Mari Carmen Brito
        </Link>
        <SearchBar
          onBookSelect={handleBookSelect}
          onSearch={onSearch}
          setSelectedExemplars={setSelectedExemplars}
        />

        <div className="min-w-[100px] flex justify-end">
          <DarkModeSwitch />

          {user?.groups == null ? (
            <Button variant="outline" onClick={onLoginClick}>
              Iniciar Sessió
            </Button>
          ) : (
            <Button variant="outline" onClick={logout}>
              Tancar Sessió
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
