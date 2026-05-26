// ========================================
// ROUTES - CAMADA DE ROTAS
// ========================================
// Esta camada é responsável por:
// - Definir as rotas da aplicação
// - Mapear URLs para os controllers correspondentes
// - Organizar as rotas por recurso/entidade

import express from "express";
import * as TarefaController from "../controllers/tarefaController.js";

// Cria um roteador do Express
const router = express.Router();

// ========================================
// DEFINIÇÃO DAS ROTAS REST - TAREFAS
// ========================================

/**
 * GET /tarefas - Lista todas as tarefas
 * @route GET /tarefas
 * @returns {Array} Array com todas as tarefas
 */
router.get("/tarefas", TarefaController.listar);

/**
 * GET /tarefas/:id - Busca uma tarefa pelo ID
 * @route GET /tarefas/:id
 * @param {number} id - ID da tarefa
 * @returns {Object} Tarefa encontrada
 */
router.get("/tarefas/:id", TarefaController.buscarPorId);

/**
 * POST /tarefas - Cria uma nova tarefa
 * @route POST /tarefas
 * @body {string} title - Título da tarefa (obrigatório)
 * @body {string} description - Descrição da tarefa (opcional)
 * @body {boolean} completed - Status de conclusão (opcional)
 * @returns {201} Tarefa criada
 */
router.post("/tarefas", TarefaController.criar);

/**
 * PUT /tarefas/:id - Atualiza uma tarefa
 * @route PUT /tarefas/:id
 * @param {number} id - ID da tarefa
 * @body {string} title - Novo título (opcional)
 * @body {string} description - Nova descrição (opcional)
 * @body {boolean} completed - Novo status (opcional)
 * @returns {Object} Tarefa atualizada
 */
router.put("/tarefas/:id", TarefaController.atualizar);

/**
 * DELETE /tarefas/:id - Deleta uma tarefa
 * @route DELETE /tarefas/:id
 * @param {number} id - ID da tarefa
 * @returns {Object} Tarefa deletada
 */
router.delete("/tarefas/:id", TarefaController.excluir);

// Exporta o roteador para ser usado no app principal
export default router;
