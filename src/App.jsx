import "./App.css";
import "./styles.css";
import SignIn from "./components/sign-in";
import Header from "./components/header";
import Footer from "./components/footer";
import Sidebar from "./components/sidebar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./contexts/authcontext";
import BookItem from "./components/BookItem";
import BooksTable from "./components/BooksTable";
import InputCsv from "./components/InputCsv";
import ExemplarsTable from "./components/ExemplarsTable";
import UserForm from "./components/user-form";
import { getBookById } from "./services/api";

export default function App() {
  const { user, activeComponent, login } = useContext(AuthContext);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedExemplars, setSelectedExemplars] = useState(null);
  const [showBookDetails, setShowBookDetails] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showBooksTable, setShowBooksTable] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [activeSidebarComponent, setActiveSidebarComponent] = useState(null);

  const handleBookSelect = (book) => {
    console.log("Selected book: ", selectedBook);
    getBookById(book.id).then((value) => {
      setSelectedExemplars(value.exemplars);
    });
    setSelectedBook(book);
    setShowBookDetails(true);
    setShowBooksTable(false);
    setShowLogin(false);
    setActiveSidebarComponent("BookDetails"); // Activar BookDetails en el Sidebar
  };

  const handleSearch = (search) => {
    setSearchResults(search.results);
    setShowBooksTable(true);
    setShowBookDetails(false);
    setShowLogin(false);
    setActiveSidebarComponent(null); // Desactivar prioridad del Sidebar
  };

  const handleLoginClick = () => {
    login();
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

    if (component === "BookDetails" && selectedBook) {
      setShowBookDetails(true);
    }
  };

  const renderBookDetails = () => {
    if (!selectedBook) return null;

    return (
      <div className="mt-4 items-center flex flex-col gap-3">
        <BookItem
          imageUrl={selectedBook.thumbnail_url}
          title={selectedBook.titol || selectedBook.title}
          originalTitle={selectedBook.originalTitle}
          author={selectedBook.autor || selectedBook.subTitle}
          isbn={selectedBook.ISBN}
          country={selectedBook.pais}
          pages={selectedBook.pagines}
          editorial={selectedBook.editorial}
          cdu={selectedBook.cdu}
          signatura={selectedBook.signatura}
          dataEdicio={selectedBook.dataEdicio}
          resum={selectedBook.description}
          anotacions={selectedBook.anotacions}
          mides={selectedBook.mides}
        />
        {selectedExemplars && (
          <ExemplarsTable
            array={selectedExemplars}
            user={user}
            onLoanClick={(item) => {
              console.log("Fer Préstec clicked for:", item);
              // Add modal for loan spec 15
            }}
          />
        )}
      </div>
    );
  };

  const renderActiveComponent = () => {
    if (activeSidebarComponent) {
      // Mostrar el componente seleccionado desde el Sidebar con prioridad
      switch (activeSidebarComponent) {
        case "UserDetails":
          return <UserForm />;
        case "FileUpload":
          return <InputCsv />;
        case "MyLoans":
          return (
            <h1 className="text-2xl font-bold text-center">
              Els meus préstecs
            </h1>
          );
        case "BookDetails":
          return renderBookDetails();
        default:
          return null;
      }
    }

    if (user?.groups != null) {
      switch (activeComponent) {
        case "UserDetails":
          return <UserForm />;
        case "FileUpload":
          return <InputCsv />;
        default:
          return <UserForm />;
      }
    }
    return null;
  };

  useEffect(() => {
    if (user?.groups && showLogin) {
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
      <div className="flex w-screen h-full items-center">
        <Sidebar user={user} onSidebarClick={handleSidebarClick} />

        <div className="w-full">
          {showLogin ? (
            <SignIn />
          ) : !showBookDetails && !showBooksTable ? (
            <>{renderActiveComponent()}</>
          ) : showBooksTable ? (
            searchResults && searchResults.length > 0 ? (
              <BooksTable
                array={searchResults}
                onBookSelect={handleBookSelect}
                setSelectedExemplars={setSelectedExemplars}
              />
            ) : (
              <h1>No s'han trobat llibres/autors</h1>
            )
          ) : (
            renderBookDetails()
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
