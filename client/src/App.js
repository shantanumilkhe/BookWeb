import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Fetch from './components/BookView/Fetch'
import Home from './components/Home';
import Navbar from './css/Navbar';
import Display from './components/Display'
import Uploader from './components/Uploader'
// require ('bootstrap');

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path='/book' element={<Display/>}/>
    <Route path='/viewer/:id' element={<Fetch/>}/>
    <Route path='/upload' element={<Uploader/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
