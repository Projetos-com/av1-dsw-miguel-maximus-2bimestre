// ========================================
// CONTROLLER - CAMADA DE CONTROLE
// ========================================
// Esta camada é responsável por:
// - Receber as requisições HTTP
// - Validar os dados recebidos
// - Chamar os métodos do Model
// - Retornar as respostas adequadas

import * as TarefaModel from "../models/tarefaModel.js";

/**
 * Listar todas as tarefas
 * @route GET /tarefas
 * @returns {Array} Array de tarefas
 */
export async function listar(req, res) {
  try {
    const tarefas = await TarefaModel.listar();
    res.json(tarefas);
  } catch (error) {
    console.error("❌ Erro no controller listar:", error.message);
    res.status(500).json({
      erro: "Erro ao listar tarefas",
      mensagem: error.message,
    });
  }
}

/**
 * Buscar tarefa por ID
 * @route GET /tarefas/:id
 * @param {number} id - ID da tarefa
 * @returns {Object|404} Tarefa encontrada ou erro 404
 */
export async function buscarPorId(req, res) {
  try {
    const { id } = req.params;

    // Validar ID
    if (!id || isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const tarefa = await TarefaModel.buscarPorId(id);

    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    res.json(tarefa);
  } catch (error) {
    console.error("❌ Erro no controller buscarPorId:", error.message);
    res.status(500).json({
      erro: "Erro ao buscar tarefa",
      mensagem: error.message,
    });
  }
}

/**
 * Criar nova tarefa
 * @route POST /tarefas
 * @body {string} title - Título da tarefa (obrigatório)
 * @body {string} description - Descrição da tarefa (opcional)
 * @body {boolean} completed - Status de conclusão (opcional, padrão: false)
 * @returns {201} Tarefa criada
 */
export async function criar(req, res) {
  try {
    const { title, description, completed } = req.body;

    // Validações
    if (!title || typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({
        erro: "Validação falhou",
        mensagem: "title é obrigatório e deve ser uma string não vazia",
      });
    }

    if (description !== undefined && typeof description !== "string") {
      return res.status(400).json({
        erro: "Validação falhou",
        mensagem: "description deve ser uma string",
      });
    }

    if (completed !== undefined && typeof completed !== "boolean") {
      return res.status(400).json({
        erro: "Validação falhou",
        mensagem: "completed deve ser boolean",
      });
    }

    const tarefa = await TarefaModel.criar({
      title: title.trim(),
      description,
      completed,
    });

    res.status(201).json({
      mensagem: "Tarefa criada com sucesso",
      tarefa,
    });
  } catch (error) {
    console.error("❌ Erro no controller criar:", error.message);
    res.status(400).json({
      erro: "Erro ao criar tarefa",
      mensagem: error.message,
    });
  }
}

/**
 * Atualizar tarefa existente (atualização parcial)
 * @route PUT /tarefas/:id
 * @param {number} id - ID da tarefa
 * @body {string} title - Novo título (opcional)
 * @body {string} description - Nova descrição (opcional)
 * @body {boolean} completed - Novo status (opcional)
 * @returns {Object|404} Tarefa atualizada ou erro 404
 */
export async function atualizar(req, res) {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    // Validar ID
    if (!id || isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    // Validar dados fornecidos
    if (title !== undefined && (typeof title !== "string" || title.trim() === "")) {
      return res.status(400).json({
        erro: "Validação falhou",
        mensagem: "title deve ser uma string não vazia",
      });
    }

    if (description !== undefined && typeof description !== "string") {
      return res.status(400).json({
        erro: "Validação falhou",
        mensagem: "description deve ser uma string",
      });
    }

    if (completed !== undefined && typeof completed !== "boolean") {
      return res.status(400).json({
        erro: "Validação falhou",
        mensagem: "completed deve ser boolean",
      });
    }

    // Verificar se há ao menos um campo para atualizar
    if (
      title === undefined &&
      description === undefined &&
      completed === undefined
    ) {
      return res.status(400).json({
        erro: "Validação falhou",
        mensagem: "Forneça ao menos um campo para atualizar",
      });
    }

    const tarefa = await TarefaModel.atualizar(id, {
      title,
      description,
      completed,
    });

    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    res.json({
      mensagem: "Tarefa atualizada com sucesso",
      tarefa,
    });
  } catch (error) {
    console.error("❌ Erro no controller atualizar:", error.message);
    res.status(400).json({
      erro: "Erro ao atualizar tarefa",
      mensagem: error.message,
    });
  }
}

/**
 * Excluir tarefa
 * @route DELETE /tarefas/:id
 * @param {number} id - ID da tarefa
 * @returns {Object|404} Tarefa deletada ou erro 404
 */
export async function excluir(req, res) {
  try {
    const { id } = req.params;

    // Validar ID
    if (!id || isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const tarefa = await TarefaModel.excluir(id);

    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    res.json({
      mensagem: "Tarefa excluída com sucesso",
      tarefa,
    });
  } catch (error) {
    console.error("❌ Erro no controller excluir:", error.message);
    res.status(500).json({
      erro: "Erro ao excluir tarefa",
      mensagem: error.message,
    });
  }
}
