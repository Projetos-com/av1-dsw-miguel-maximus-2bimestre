import axios from 'axios';

// Configurar URL base da API
const API_BASE_URL = 'http://localhost:3000';

// Criar instância do axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Serviço de Tarefas
export const tarefaService = {
  // GET - Listar todas as tarefas
  listar: async () => {
    try {
      const response = await api.get('/tarefas');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar tarefas:', error);
      throw error;
    }
  },

  // GET - Buscar tarefa por ID
  buscarPorId: async (id) => {
    try {
      const response = await api.get(`/tarefas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar tarefa ${id}:`, error);
      throw error;
    }
  },

  // POST - Criar nova tarefa
  criar: async (dados) => {
    try {
      const response = await api.post('/tarefas', dados);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      throw error;
    }
  },

  // PUT - Atualizar tarefa
  atualizar: async (id, dados) => {
    try {
      const response = await api.put(`/tarefas/${id}`, dados);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar tarefa ${id}:`, error);
      throw error;
    }
  },

  // DELETE - Deletar tarefa
  deletar: async (id) => {
    try {
      const response = await api.delete(`/tarefas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao deletar tarefa ${id}:`, error);
      throw error;
    }
  },
};
