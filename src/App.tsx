import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Book from './pages/Book';
import Layout from './components/Layout';


function App() {
  return (
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="book/:id" element={<Book />} />
        </Route>
    </Routes>
  );
}

export default App;