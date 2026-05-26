# 📋 EXEMPLOS DE REQUISIÇÕES - CRUD DE TAREFAS

## 🚀 Base URL
```
http://localhost:3000
```

---

## 1️⃣ LISTAR TODAS AS TAREFAS

### Request
```http
GET /tarefas HTTP/1.1
Host: localhost:3000
```

### cURL
```bash
curl -X GET http://localhost:3000/tarefas
```

### Response (200 OK)
```json
[
  {
    "id": 1,
    "title": "Estudar JavaScript",
    "description": "Revisar conceitos de async/await",
    "completed": false,
    "createdAt": "2026-05-26T11:00:00.000Z"
  },
  {
    "id": 2,
    "title": "Implementar API",
    "description": null,
    "completed": true,
    "createdAt": "2026-05-26T10:30:00.000Z"
  }
]
```

---

## 2️⃣ BUSCAR TAREFA POR ID

### Request
```http
GET /tarefas/1 HTTP/1.1
Host: localhost:3000
```

### cURL
```bash
curl -X GET http://localhost:3000/tarefas/1
```

### Response (200 OK)
```json
{
  "id": 1,
  "title": "Estudar JavaScript",
  "description": "Revisar conceitos de async/await",
  "completed": false,
  "createdAt": "2026-05-26T11:00:00.000Z"
}
```

### Response (404 Not Found) - Se ID não existir
```json
{
  "erro": "Tarefa não encontrada"
}
```

---

## 3️⃣ CRIAR NOVA TAREFA

### Request
```http
POST /tarefas HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "title": "Aprender Prisma",
  "description": "Entender migrations e relações",
  "completed": false
}
```

### cURL
```bash
curl -X POST http://localhost:3000/tarefas \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Aprender Prisma",
    "description": "Entender migrations e relações",
    "completed": false
  }'
```

### Exemplos Adicionais

#### Apenas com título obrigatório:
```json
{
  "title": "Tarefa simples"
}
```

#### Com todos os campos:
```json
{
  "title": "Tarefa completa",
  "description": "Esta tarefa tem descrição",
  "completed": true
}
```

### Response (201 Created)
```json
{
  "mensagem": "Tarefa criada com sucesso",
  "tarefa": {
    "id": 3,
    "title": "Aprender Prisma",
    "description": "Entender migrations e relações",
    "completed": false,
    "createdAt": "2026-05-26T12:00:00.000Z"
  }
}
```

### Response (400 Bad Request) - Validação falhou
```json
{
  "erro": "Validação falhou",
  "mensagem": "title é obrigatório e deve ser uma string não vazia"
}
```

---

## 4️⃣ ATUALIZAR TAREFA

### Request - Atualizar apenas título
```http
PUT /tarefas/1 HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "title": "Novo título da tarefa"
}
```

### cURL
```bash
curl -X PUT http://localhost:3000/tarefas/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Novo título da tarefa"
  }'
```

### Exemplos Adicionais

#### Atualizar descrição:
```json
{
  "description": "Nova descrição"
}
```

#### Marcar como concluída:
```json
{
  "completed": true
}
```

#### Atualizar múltiplos campos:
```json
{
  "title": "Novo título",
  "description": "Nova descrição",
  "completed": true
}
```

#### Limpar descrição:
```json
{
  "description": ""
}
```

### Response (200 OK)
```json
{
  "mensagem": "Tarefa atualizada com sucesso",
  "tarefa": {
    "id": 1,
    "title": "Novo título da tarefa",
    "description": "Revisar conceitos de async/await",
    "completed": false,
    "createdAt": "2026-05-26T11:00:00.000Z"
  }
}
```

### Response (404 Not Found) - ID não existe
```json
{
  "erro": "Tarefa não encontrada"
}
```

### Response (400 Bad Request) - Validação falhou
```json
{
  "erro": "Validação falhou",
  "mensagem": "completed deve ser boolean"
}
```

---

## 5️⃣ EXCLUIR TAREFA

### Request
```http
DELETE /tarefas/1 HTTP/1.1
Host: localhost:3000
```

### cURL
```bash
curl -X DELETE http://localhost:3000/tarefas/1
```

### Response (200 OK)
```json
{
  "mensagem": "Tarefa excluída com sucesso",
  "tarefa": {
    "id": 1,
    "title": "Estudar JavaScript",
    "description": "Revisar conceitos de async/await",
    "completed": false,
    "createdAt": "2026-05-26T11:00:00.000Z"
  }
}
```

### Response (404 Not Found) - ID não existe
```json
{
  "erro": "Tarefa não encontrada"
}
```

---

## 📝 NOTAS IMPORTANTES

### Campos obrigatórios por operação:
- **POST (Criar)**: `title` é obrigatório
- **PUT (Atualizar)**: Forneça pelo menos um campo (`title`, `description`, ou `completed`)
- **DELETE**: Apenas o `id` é necessário

### Validações:
- `title`: String não vazia, obrigatório ao criar
- `description`: String opcional, pode ser null
- `completed`: Boolean opcional, padrão é `false`
- `id`: Número inteiro válido

### Códigos HTTP esperados:
- **200**: Sucesso na operação
- **201**: Recurso criado com sucesso
- **400**: Erro de validação
- **404**: Recurso não encontrado
- **500**: Erro no servidor

### Tratamento de erros:
Todas as respostas de erro incluem:
```json
{
  "erro": "Descrição do erro",
  "mensagem": "Detalhes adicionais (quando aplicável)"
}
```

---

## 🧪 TESTE RÁPIDO (ordem recomendada)

1. **Listar tarefas** (GET /tarefas)
2. **Criar tarefa** (POST /tarefas)
3. **Buscar tarefa criada** (GET /tarefas/[id])
4. **Atualizar tarefa** (PUT /tarefas/[id])
5. **Listar novamente** para ver mudanças (GET /tarefas)
6. **Excluir tarefa** (DELETE /tarefas/[id])
7. **Buscar tarefa deletada** para confirmar 404 (GET /tarefas/[id])
