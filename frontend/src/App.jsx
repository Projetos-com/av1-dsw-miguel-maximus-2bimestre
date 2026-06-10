import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { ListarTarefas } from './pages/ListarTarefas';
import { CriarTarefa } from './pages/CriarTarefa';
import { EditarTarefa } from './pages/EditarTarefa';
import './App.css';

function App() {

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Routes>
          <Route path="/" element={<ListarTarefas />} />
          <Route path="/criar" element={<CriarTarefa />} />
          <Route path="/editar/:id" element={<EditarTarefa />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
