import "./App.css";
import "./styles.css";
import SignIn from "./components/sign-in";
import Header from "./components/header";
import Footer from "./components/footer";
import Sidebar from "./components/sidebar";
import { useContext, useState } from "react";
import { AuthContext } from "./contexts/authcontext";
import UserDetails from "./components/user-details";
import SearchBar from "./components/search-bar";
import BookItem from "./components/BookItem";
import { getBookById } from "./services/api";

export default function App() {
  const { user, activeComponent } = useContext(AuthContext);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showBookDetails, setShowBookDetails] = useState(false);

  const handleBookSelect = async (bookId) => {
    console.log("Handling book selection for ID:", bookId);
    try {
      const book = await getBookById(bookId);
      console.log("Book details fetched:", book);
      setSelectedBook(book);
      setShowBookDetails(true);
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };

  const renderActiveComponent = () => {
    if (user?.groups != null) {
      switch (activeComponent) {
        case "UserDetails":
          return <UserDetails />;
        case "AnotherComponent":
          return <p>Holaaa</p>;
        default:
          return div;
      }
    }
  };

  return (
    <div className="h-screen w-screen bg-blue-100 flex flex-col">
      <Header handleBookSelect={handleBookSelect} />
      <div className="flex flex-1 overflow-hidden">
        {user?.groups.includes("Bibliotecari") && <Sidebar />}
        <div className="flex flex-col justify-center items-center overflow-auto flex-1">
          {user?.groups == null && !showBookDetails && <SignIn />}

          <>
            {!showBookDetails ? (
              <>{renderActiveComponent()}</>
            ) : (
              <div className="mt-4">
                <BookItem
                  imageUrl={selectedBook.thumbnail_url}
                  title={selectedBook.titol}
                  author={selectedBook.autor}
                  editorial={selectedBook.editorial}
                  isbn={selectedBook.isbn}
                  country={selectedBook.pais}
                  pages={selectedBook.pagines}
                />
              </div>
            )}
          </>
        </div>
      </div>
      <Footer />
    </div>
  );
}
