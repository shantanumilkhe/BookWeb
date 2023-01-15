import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Viewer from './components/Viewer'
import Fetch from './components/Fetch'
import Display from './components/Display';
require ('bootstrap');

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Viewer />} />
    <Route path="/pdf" element={<Viewer />} />
    <Route path="/display" element={<Fetch />} />
    <Route path="/chapters" element={<Display/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
