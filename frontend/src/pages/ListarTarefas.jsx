import { useState, useEffect } from 'react';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { TarefaCard } from '../components/TarefaCard';
import { tarefaService } from '../services/tarefaService';

export function ListarTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [filtro, setFiltro] = useState('todas'); // todas, pendentes, concluidas

  useEffect(() => {
    carregarTarefas();
  }, []);

  const carregarTarefas = async () => {
    setCarregando(true);
    setErro(null);
    try {
      const dados = await tarefaService.listar();
      setTarefas(dados);
    } catch (error) {
      setErro('Erro ao carregar tarefas. Verifique se o servidor está rodando.');
      console.error(error);
    } finally {
      setCarregando(false);
    }
  };

  const handleDeletar = async (id) => {
    try {
      await tarefaService.deletar(id);
      setTarefas(tarefas.filter(t => t.id !== id));
    } catch (error) {
      setErro('Erro ao deletar tarefa');
      console.error(error);
    }
  };

  const tarefasFiltradas = tarefas.filter(t => {
    if (filtro === 'pendentes') return !t.completed;
    if (filtro === 'concluidas') return t.completed;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📋 Minhas Tarefas</h1>

      {erro && <Error mensagem={erro} onRetry={carregarTarefas} />}

      {carregando ? (
        <Loading />
      ) : (
        <>
          {/* Filtros */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setFiltro('todas')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filtro === 'todas'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Todas ({tarefas.length})
            </button>
            <button
              onClick={() => setFiltro('pendentes')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filtro === 'pendentes'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Pendentes ({tarefas.filter(t => !t.completed).length})
            </button>
            <button
              onClick={() => setFiltro('concluidas')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filtro === 'concluidas'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Concluídas ({tarefas.filter(t => t.completed).length})
            </button>
          </div>

          {/* Lista de Tarefas */}
          {tarefasFiltradas.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {tarefas.length === 0
                  ? 'Nenhuma tarefa ainda. Crie uma para começar!'
                  : 'Nenhuma tarefa neste filtro'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tarefasFiltradas.map(tarefa => (
                <TarefaCard
                  key={tarefa.id}
                  tarefa={tarefa}
                  onDeletar={handleDeletar}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
