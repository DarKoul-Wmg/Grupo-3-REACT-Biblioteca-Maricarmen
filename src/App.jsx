import "./App.css";
import "./styles.css";
import SignIn from "./components/sign-in";
import Header from "./components/header";
import Footer from "./components/footer";
import Sidebar from "./components/sidebar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./contexts/authcontext";
import UserDetails from "./components/user-details";
import BookItem from "./components/BookItem";
import BooksTable from "./components/BooksTable";
import InputCsv from "./components/InputCsv";
import ExemplarsTable from "./components/ExemplarsTable";

export default function App() {
  const { user, activeComponent } = useContext(AuthContext);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedExemplars, setSelectedExemplars] = useState(null);
  const [showBookDetails, setShowBookDetails] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showBooksTable, setShowBooksTable] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [activeSidebarComponent, setActiveSidebarComponent] = useState(null); // Nuevo estado

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setShowBookDetails(true);
    setShowBooksTable(false);
    setShowLogin(false);
    setActiveSidebarComponent(null); // Desactivar prioridad del Sidebar
  };

  const handleSearch = (results) => {
    setSearchResults(results);
    setShowBooksTable(true);
    setShowBookDetails(false);
    setShowLogin(false);
    setActiveSidebarComponent(null); // Desactivar prioridad del Sidebar
  };

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowBookDetails(false);
    setShowBooksTable(false);
    setActiveSidebarComponent(null); // Desactivar prioridad del Sidebar
  };

  const handleSidebarClick = (component) => {
    setActiveSidebarComponent(component); // Activar prioridad del Sidebar
    setShowLogin(false);
    setShowBookDetails(false);
    setShowBooksTable(false);
  };

  const renderActiveComponent = () => {
    if (activeSidebarComponent) {
      // Mostrar el componente seleccionado desde el Sidebar con prioridad
      switch (activeSidebarComponent) {
        case "UserDetails":
          return <UserDetails />;
        case "FileUpload":
          return <InputCsv />;
        default:
          return null;
      }
    }

    if (user?.groups != null) {
      switch (activeComponent) {
        case "UserDetails":
          return <UserDetails />;
        case "FileUpload":
          return <InputCsv />;
        default:
          return <UserDetails />;
      }
    }
    return null;
  };

  useEffect(() => {
    if (user?.groups?.includes("Bibliotecari", "Administrador") && showLogin) {
      setShowLogin(false);
    }
  }, [user, showLogin]);

  return (
    <div className="h-screen w-screen bg-blue-100 flex flex-col">
      <Header
        handleBookSelect={handleBookSelect}
        onSearch={handleSearch}
        onLoginClick={handleLoginClick}
        setSelectedExemplars={setSelectedExemplars}
      />
      <div className="flex flex-1 overflow-hidden">
        {user?.groups?.includes("Bibliotecari", "Administrador") && (
          <Sidebar onSidebarClick={handleSidebarClick} />
        )}

        <div className="flex flex-col justify-center items-center overflow-auto flex-1">
          {showLogin ? (
            <SignIn />
          ) : !showBookDetails && !showBooksTable ? (
            <>{renderActiveComponent()}</>
          ) : showBooksTable ? (
            <BooksTable array={searchResults} onBookSelect={handleBookSelect} />
          ) : (
            <div className="mt-4">
              <BookItem
                imageUrl={selectedBook.thumbnail_url}
                title={selectedBook.titol || selectedBook.title}
                author={selectedBook.autor || selectedBook.subTitle}
                editorial={selectedBook.editorial}
                isbn={selectedBook.ISBN}
                country={selectedBook.pais}
                pages={selectedBook.pagines}
              />
              {user?.groups?.includes("Bibliotecari", "Administrador")
                ? selectedExemplars && (
                    <ExemplarsTable array={selectedExemplars} />
                  )
                : null}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
