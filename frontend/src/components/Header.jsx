import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold hover:text-blue-100">
            📝 Gerenciador de Tarefas
          </Link>
          <nav className="flex gap-4">
            <Link 
              to="/" 
              className="px-4 py-2 rounded hover:bg-blue-500 transition"
            >
              Tarefas
            </Link>
            <Link 
              to="/criar" 
              className="px-4 py-2 rounded hover:bg-blue-500 transition bg-blue-500"
            >
              + Nova Tarefa
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
