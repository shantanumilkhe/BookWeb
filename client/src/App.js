import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Fetch from './components/BookView/Fetch'
import Home from './components/Home';
import Navbar from './css/Navbar';
import Display from './components/BookView/Chapters'
import NewBook from './components/admin/NewBook'
import Login from './components/admin/Login'
import Dashboard from './components/admin/Dashboard';
import Book from './components/admin/Book';
import BookEdit from './components/admin/BookEdit';
import GR from './components/admin/GR';
import GREdit from './components/admin/GREdit';
import NewGR from './components/admin/NewGR';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path='/book' element={<Display/>}/>
    <Route path='/viewer/:id' element={<Fetch/>}/>
    <Route path='/admin/newbook' element={<NewBook/>}/>
    <Route path='/admin/login' element={<Login/>}/>
    <Route path='/admin/dashboard' element={<Dashboard/>}/>
    <Route path='/admin/book' element={<Book/>}/>
    <Route path='/admin/editbook/:id' element={<BookEdit/>}/>
    <Route path='/admin/editgr/:id' element={<GREdit/>}/>
    <Route path='/admin/gr' element={<GR/>}/>
    <Route path='/admin/newgr' element={<NewGR />}/>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
