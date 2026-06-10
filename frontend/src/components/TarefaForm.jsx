import { useState } from 'react';

export function TarefaForm({ tarefa, onSubmit, carregando }) {
  const [formData, setFormData] = useState({
    title: tarefa?.title || '',
    description: tarefa?.description || '',
    completed: tarefa?.completed || false,
  });

  const [erros, setErros] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Limpar erro quando usuário começa a digitar
    if (erros[name]) {
      setErros(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validações
    const novosErros = {};
    if (!formData.title.trim()) {
      novosErros.title = 'Título é obrigatório';
    }
    if (formData.title.trim().length < 3) {
      novosErros.title = 'Título deve ter pelo menos 3 caracteres';
    }

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }

    try {
      await onSubmit(formData);
      setErros({});
    } catch (error) {
      setErros({
        submit: error.response?.data?.mensagem || 'Erro ao salvar tarefa',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {tarefa ? '✏️ Editar Tarefa' : '➕ Nova Tarefa'}
      </h2>

      {erros.submit && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {erros.submit}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Título *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Digite o título da tarefa"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            erros.title ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {erros.title && <p className="text-red-500 text-sm mt-1">{erros.title}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Descrição
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Digite a descrição (opcional)"
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="completed"
            checked={formData.completed}
            onChange={handleChange}
            className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
          />
          <span className="text-gray-700 font-medium">Marcar como concluída</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={carregando}
        className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {carregando ? '⏳ Salvando...' : '💾 Salvar Tarefa'}
      </button>
    </form>
  );
}
