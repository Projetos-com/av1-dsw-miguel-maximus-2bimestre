import { useState } from 'react';
import { Link } from 'react-router-dom';

export function TarefaCard({ tarefa, onDeletar }) {
  const [deletando, setDeletando] = useState(false);

  const handleDeletar = async () => {
    if (window.confirm('Tem certeza que deseja deletar esta tarefa?')) {
      setDeletando(true);
      try {
        await onDeletar(tarefa.id);
      } finally {
        setDeletando(false);
      }
    }
  };

  const dataFormatada = new Date(tarefa.createdAt).toLocaleDateString('pt-BR');

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${
      tarefa.completed ? 'border-green-500' : 'border-blue-500'
    } hover:shadow-lg transition`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${
            tarefa.completed ? 'line-through text-gray-500' : 'text-gray-800'
          }`}>
            {tarefa.title}
          </h3>
          {tarefa.description && (
            <p className="text-gray-600 text-sm mt-1">{tarefa.description}</p>
          )}
          <p className="text-xs text-gray-400 mt-2">{dataFormatada}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          tarefa.completed 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {tarefa.completed ? '✓ Concluída' : '○ Pendente'}
        </span>
      </div>

      <div className="flex gap-2 mt-4">
        <Link
          to={`/editar/${tarefa.id}`}
          className="flex-1 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition text-center text-sm font-medium"
        >
          ✏️ Editar
        </Link>
        <button
          onClick={handleDeletar}
          disabled={deletando}
          className="flex-1 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition text-sm font-medium disabled:opacity-50"
        >
          {deletando ? '⏳ Deletando...' : '🗑️ Deletar'}
        </button>
      </div>
    </div>
  );
}
