import "./App.css";
import "./styles.css";
import SignIn from "./components/sign-in";
import Header from "./components/header";
import Footer from "./components/footer";
function App() {
  return (
    <div className="h-screen w-screen bg-blue-100 justify-start items-start">
      <Header>
        <h1>Hola</h1>
      </Header>
      <SignIn />
      <Footer />
    </div>

    // <div className="App">
    //   <BookList />
    // </div>
  );
}

export default App;
