import { useState } from 'react';
import './App.css';
import BookList from './components/BookList';
import './styles.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <BookList />
    </div>
  );
}

export default App;
