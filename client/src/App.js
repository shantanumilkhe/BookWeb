import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Viewer from './components/Viewer'
import Home from './components/Home';
import Navbar from './css/Navbar';
import Display from './components/Display'
require ('bootstrap');

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/pdf" element={<Viewer />} />
    <Route path='/book' element={<Display/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
