import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import CreateWarehouse from './components/CreateWarehouse';
import Menu from './components/Menu';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateWarehouse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
