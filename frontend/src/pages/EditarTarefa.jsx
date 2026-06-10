import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TarefaForm } from '../components/TarefaForm';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { tarefaService } from '../services/tarefaService';

export function EditarTarefa() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tarefa, setTarefa] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    carregarTarefa();
  }, [id]);

  const carregarTarefa = async () => {
    setCarregando(true);
    setErro(null);
    try {
      const dados = await tarefaService.buscarPorId(id);
      setTarefa(dados);
    } catch (error) {
      setErro('Tarefa não encontrada');
      console.error(error);
    } finally {
      setCarregando(false);
    }
  };

  const handleSubmit = async (formData) => {
    setCarregando(true);
    try {
      await tarefaService.atualizar(id, formData);
      navigate('/');
    } catch (error) {
      throw error;
    } finally {
      setCarregando(false);
    }
  };

  if (carregando) return <Loading />;
  if (erro) return <Error mensagem={erro} onRetry={carregarTarefa} />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {tarefa && <TarefaForm tarefa={tarefa} onSubmit={handleSubmit} carregando={carregando} />}
    </div>
  );
}
