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
import { getItemById } from "./services/api";
import { searchItem } from "./services/api";
import { useTransition } from "react";
import LoanHistoryTable from "./components/LoanHistoryTable";
import Modal from "./components/ui/modal";
import DetailedExemplarsTable from "./components/detailed-exemplars-table";

export default function App() {
  const { user, activeComponent, login } = useContext(AuthContext);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedExemplars, setSelectedExemplars] = useState(null);
  const [showBookDetails, setShowBookDetails] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showBooksTable, setShowBooksTable] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [activeSidebarComponent, setActiveSidebarComponent] = useState(null);
  const [showLoanModal, setShowLoanModal] = useState(false); // Estado para mostrar el modal
  const [loanBookDetails, setLoanBookDetails] = useState(null); // Detalles del libro para el préstamo

  const [isPending, startTransition] = useTransition();

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setShowBookDetails(true);
    setShowBooksTable(false);
    setShowLogin(false);
    setActiveSidebarComponent("BookDetails");
  };

  const updateSelectedBook = () => {
    if (!selectedBook || !selectedBook.id || !selectedBook.model_type) {
      console.error("El libro seleccionado no es válido:", selectedBook);
      return;
    }

    getItemById(selectedBook.id, selectedBook.model_type)
      .then((response) => {
        if (!response) {
          console.error("No se pudo obtener la información del libro.");
          return;
        }

        setSelectedExemplars(response.exemplars);
      })
      .catch((error) => {
        console.error("Error al actualizar el libro:", error.message);
      });
  };

  const handleSearch = (search) => {
    setSearchResults(search);
    setShowBooksTable(true);
    setShowBookDetails(false);
    setShowLogin(false);
    setActiveSidebarComponent(null);
  };

  const handleLoginClick = () => {
    login();
    setShowLogin(true);
    setShowBookDetails(false);
    setShowBooksTable(false);
    setActiveSidebarComponent(null);
  };

  const handleSidebarClick = (component) => {
    setActiveSidebarComponent(component);
    setShowLogin(false);
    setShowBookDetails(false);
    setShowBooksTable(false);

    if (component === "BookDetails" && selectedBook) {
      setShowBookDetails(true);
    }
  };

  const fetchPage = async (page) => {
    startTransition(async () => {
      try {
        const data = await searchItem(searchResults.searchText, page);
        setSearchResults(data);
      } catch (error) {
        console.error("No se pudo cargar la página:", error.message);
      }
    });
  };

  const handlePageChange = (page) => {
    fetchPage(page);
  };

  const handleLoanClick = (item) => {
    console.log("Loan item: ", item, "selected book:", selectedBook);

    setLoanBookDetails({ ...item, bookTitle: selectedBook.titol });
    setShowLoanModal(true);
  };

  const closeModal = () => {
    setShowLoanModal(false); // Cerrar el modal
    setLoanBookDetails(null); // Limpiar los detalles del libro
  };

  const renderBookDetails = () => {
    if (!selectedBook) return null;

    return (
      <div className="m-4 items-center flex flex-col gap-3">
        <BookItem
          marca={selectedBook.marca}
          model={selectedBook.model}
          estil={selectedBook.estil}
          discografica={selectedBook.discografica}
          productora={selectedBook.productora}
          duracio={selectedBook.duracio}
          issn={selectedBook.ISSN}
          lloc={selectedBook.lloc}
          colleccio={selectedBook.colleccio}
          volums={selectedBook.volums}
          numero={selectedBook.numero}
          llengua={selectedBook.llengua}
          imageUrl={selectedBook.thumbnail_url}
          title={selectedBook.titol || selectedBook.title}
          originalTitle={selectedBook.originalTitle}
          author={selectedBook.autor}
          isbn={selectedBook.ISBN}
          pais={selectedBook.pais}
          pagines={selectedBook.pagines}
          editorial={selectedBook.editorial}
          cdu={selectedBook.cdu}
          signatura={selectedBook.signatura}
          dataEdicio={selectedBook.dataEdicio}
          resum={selectedBook.resum}
          anotacions={selectedBook.anotacions}
          mides={selectedBook.mides}
          modelType={selectedBook.model_type || selectedBook.type}
          updateBookDetails={updateSelectedBook}
        />
        {selectedExemplars && selectedExemplars.length >= 1 && (
          <ExemplarsTable
            array={selectedExemplars}
            user={user}
            onLoanClick={handleLoanClick}
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
        case "LoanHistoryTable":
          return <LoanHistoryTable />;
        case "ExemplarsTable":
          return (
            <>
              <DetailedExemplarsTable />
            </>
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
    <div className="min-h-screen w-full bg-blue-100 dark:bg-[#141414] flex flex-col">
      <Header
        handleBookSelect={handleBookSelect}
        onSearch={handleSearch}
        onLoginClick={handleLoginClick}
        setSelectedExemplars={setSelectedExemplars}
      />
      <div className="flex flex-1 w-full min-h-screen h-full dark:bg-[#282828] bg-white">
        {user && <Sidebar user={user} onSidebarClick={handleSidebarClick} />}

        <div className="w-full flex-1 flex items-center justify-center dark:bg-[#282828] bg-blue-100">
          {showLogin ? (
            <SignIn />
          ) : !showBookDetails && !showBooksTable ? (
            <>{renderActiveComponent()}</>
          ) : showBooksTable ? (
            searchResults.results && searchResults.results.length > 0 ? (
              <BooksTable
                data={searchResults}
                onBookSelect={handleBookSelect}
                setSelectedExemplars={setSelectedExemplars}
                onPageChange={handlePageChange}
                isPending={isPending}
              />
            ) : (
              <h1 className="dark:text-white">No s'han trobat items</h1>
            )
          ) : (
            renderBookDetails()
          )}
        </div>
      </div>
      <Footer />

      {showLoanModal && (
        <Modal
          loanDetails={loanBookDetails}
          onClose={closeModal}
          updateBookDetails={updateSelectedBook}
        />
      )}
    </div>
  );
}
