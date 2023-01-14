import logo from './logo.svg';
import './App.css';
import 'remixicon/fonts/remixicon.css'
import 'boxicons'
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import Viewer from './components/Viewer'
import Fetch from './components/Fetch'
import Display from './components/Display';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/pdf" element={<Viewer />} />
    <Route path="/display" element={<Fetch />} />
    <Route path="/chapters" element={<Display/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
