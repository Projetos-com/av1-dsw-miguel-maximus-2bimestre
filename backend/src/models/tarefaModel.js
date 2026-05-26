// ========================================
// MODEL - CAMADA DE DADOS
// ========================================
// Esta camada é responsável por:
// - Implementar a lógica de negócio
// - Realizar operações CRUD (Create, Read, Update, Delete)
// - Conectar com o banco de dados via Prisma

import prisma from "../config/prisma.js";

/**
 * Listar todas as tarefas
 * @returns {Promise<Array>} Array de tarefas
 */
export async function listar() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return tasks;
  } catch (error) {
    console.error("❌ Erro ao listar tarefas:", error.message);
    throw error;
  }
}

/**
 * Buscar uma tarefa por ID
 * @param {number} id - ID da tarefa
 * @returns {Promise<Object|null>} Tarefa encontrada ou null
 */
export async function buscarPorId(id) {
  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) },
    });
    return task || null;
  } catch (error) {
    // P2025 é o erro de record not found do Prisma
    if (error.code === "P2025") {
      console.warn(`⚠️ Tarefa com ID ${id} não encontrada`);
      return null;
    }
    console.error("❌ Erro ao buscar tarefa:", error.message);
    throw error;
  }
}

/**
 * Criar uma nova tarefa
 * @param {Object} dados - Dados da tarefa (title, description, completed)
 * @returns {Promise<Object>} Tarefa criada
 */
export async function criar(dados) {
  try {
    // Validações básicas
    if (!dados.title || typeof dados.title !== "string") {
      throw new Error("title é obrigatório e deve ser uma string");
    }

    const task = await prisma.task.create({
      data: {
        title: dados.title.trim(),
        description: dados.description ? dados.description.trim() : null,
        completed: dados.completed === true,
      },
    });

    console.log(`✅ Tarefa criada com ID ${task.id}`);
    return task;
  } catch (error) {
    console.error("❌ Erro ao criar tarefa:", error.message);
    throw error;
  }
}

/**
 * Atualizar uma tarefa
 * @param {number} id - ID da tarefa
 * @param {Object} dados - Dados a atualizar (aceita campos opcionais)
 * @returns {Promise<Object|null>} Tarefa atualizada ou null se não encontrada
 */
export async function atualizar(id, dados) {
  try {
    // Validações
    if (!id || isNaN(id)) {
      throw new Error("ID inválido");
    }

    // Preparar dados para atualização (apenas campos fornecidos)
    const dataAtualizar = {};

    if (dados.title !== undefined) {
      if (typeof dados.title !== "string") {
        throw new Error("title deve ser uma string");
      }
      dataAtualizar.title = dados.title.trim();
    }

    if (dados.description !== undefined) {
      dataAtualizar.description = dados.description ? dados.description.trim() : null;
    }

    if (dados.completed !== undefined) {
      dataAtualizar.completed = dados.completed === true;
    }

    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: dataAtualizar,
    });

    console.log(`✅ Tarefa ${id} atualizada`);
    return task;
  } catch (error) {
    if (error.code === "P2025") {
      console.warn(`⚠️ Tarefa com ID ${id} não encontrada para atualização`);
      return null;
    }
    console.error("❌ Erro ao atualizar tarefa:", error.message);
    throw error;
  }
}

/**
 * Excluir uma tarefa
 * @param {number} id - ID da tarefa
 * @returns {Promise<Object|null>} Tarefa deletada ou null se não encontrada
 */
export async function excluir(id) {
  try {
    // Validações
    if (!id || isNaN(id)) {
      throw new Error("ID inválido");
    }

    const task = await prisma.task.delete({
      where: { id: parseInt(id) },
    });

    console.log(`✅ Tarefa ${id} deletada`);
    return task;
  } catch (error) {
    if (error.code === "P2025") {
      console.warn(`⚠️ Tarefa com ID ${id} não encontrada para deleção`);
      return null;
    }
    console.error("❌ Erro ao deletar tarefa:", error.message);
    throw error;
  }
}
