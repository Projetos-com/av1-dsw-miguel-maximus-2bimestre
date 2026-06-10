import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TarefaForm } from '../components/TarefaForm';
import { tarefaService } from '../services/tarefaService';

export function CriarTarefa() {
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (formData) => {
    setCarregando(true);
    try {
      await tarefaService.criar(formData);
      navigate('/');
    } catch (error) {
      throw error;
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <TarefaForm onSubmit={handleSubmit} carregando={carregando} />
    </div>
  );
}
