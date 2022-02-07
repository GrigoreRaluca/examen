import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PaginaPrincipala from './components/PaginaPrincipala';
import formularNava from './components/formularNava';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PaginaPrincipala />} />
          <Route path="/formularNava" element={<formularNava />} />
         
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
