import logo from './logo.svg';
import './App.css';
import 'remixicon/fonts/remixicon.css'
import 'boxicons'
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import Viewer from './components/Viewer'

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/pdf" element={<Viewer />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
