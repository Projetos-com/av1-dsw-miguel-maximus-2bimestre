# 🚀 Guia Prático - Como Colocar a API Funcionando

## ✅ O que Já Funciona

```
🚀 Servidor rodando em http://localhost:3000
```

**A aplicação iniciou com sucesso!** Agora precisamos apenas conectar o MySQL.

---

## ⚠️ Problema: MySQL Não Está Rodando

```
❌ Erro ao conectar ao banco de dados: Can't reach database server at `localhost:3306`
```

---

## 🔧 Solução 1: Usar Docker (RECOMENDADO - Mais Fácil)

### Passo 1: Instalar Docker
- Download: https://www.docker.com/products/docker-desktop
- Instale e reinicie o computador

### Passo 2: Criar container MySQL
Execute no PowerShell:

```powershell
docker run -d `
  --name mysql_container `
  -e MYSQL_ROOT_PASSWORD=root `
  -e MYSQL_DATABASE=db_DSW_MIGUEL_MAXIMUS_3TIB `
  -p 3306:3306 `
  mysql:latest
```

### Passo 3: Verificar se está rodando
```powershell
docker ps
```

Você deve ver o container `mysql_container` listado.

### Passo 4: Criar tabelas com Prisma
```bash
cd backend
npx prisma migrate dev --name init
```

### Passo 5: Iniciar o servidor
```bash
npm start
```

**Resultado esperado:**
```
✅ Conexão bem-sucedida com o banco de dados!
🚀 Servidor rodando em http://localhost:3000
```

---

## 🔧 Solução 2: Usar MySQL Local (Windows)

### Se você já tem MySQL instalado

#### Verificar se está rodando:
```powershell
Get-Service | Where-Object { $_.Name -like "*MySQL*" -or $_.Name -like "*MariaDB*" }
```

#### Iniciar o serviço:
```powershell
# Para MySQL
Start-Service MySQL80

# OU para MariaDB
Start-Service MariaDB
```

#### Criar banco de dados:
```bash
mysql -u root -p
# Digite a senha quando pedido

# No MySQL:
CREATE DATABASE db_DSW_MIGUEL_MAXIMUS_3TIB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

#### Configurar Prisma:
```bash
cd backend
npx prisma migrate dev --name init
```

#### Iniciar servidor:
```bash
npm start
```

---

## 🧪 Testar a API

Quando o servidor estiver rodando e conectado ao banco, teste com Insomnia ou Postman:

### 1️⃣ Testar GET (listar tarefas - vazio no início)
```
GET http://localhost:3000/tarefas
```

**Resposta esperada:**
```json
[]
```

### 2️⃣ Testar POST (criar tarefa)
```
POST http://localhost:3000/tarefas
Content-Type: application/json

{
  "title": "Aprender Node.js",
  "description": "Estudar Express e Prisma",
  "completed": false
}
```

**Resposta esperada (Status 201):**
```json
{
  "mensagem": "Tarefa criada com sucesso",
  "tarefa": {
    "id": 1,
    "title": "Aprender Node.js",
    "description": "Estudar Express e Prisma",
    "completed": false,
    "createdAt": "2024-06-10T10:30:00.000Z"
  }
}
```

### 3️⃣ Testar GET por ID
```
GET http://localhost:3000/tarefas/1
```

**Resposta esperada:**
```json
{
  "id": 1,
  "title": "Aprender Node.js",
  "description": "Estudar Express e Prisma",
  "completed": false,
  "createdAt": "2024-06-10T10:30:00.000Z"
}
```

### 4️⃣ Testar PUT (atualizar)
```
PUT http://localhost:3000/tarefas/1
Content-Type: application/json

{
  "completed": true
}
```

**Resposta esperada:**
```json
{
  "mensagem": "Tarefa atualizada com sucesso",
  "tarefa": {
    "id": 1,
    "title": "Aprender Node.js",
    "description": "Estudar Express e Prisma",
    "completed": true,
    "createdAt": "2024-06-10T10:30:00.000Z"
  }
}
```

### 5️⃣ Testar DELETE (deletar)
```
DELETE http://localhost:3000/tarefas/1
```

**Resposta esperada:**
```json
{
  "mensagem": "Tarefa excluída com sucesso",
  "tarefa": {
    "id": 1,
    "title": "Aprender Node.js",
    "description": "Estudar Express e Prisma",
    "completed": true,
    "createdAt": "2024-06-10T10:30:00.000Z"
  }
}
```

---

## 📋 Resumo dos Requisitos - TUDO IMPLEMENTADO ✅

| Requisito | Status |
|-----------|--------|
| Node.js + Express | ✅ Funcionando |
| API REST estruturada | ✅ Implementada |
| Conexão MySQL | ✅ Configurada (aguarda execução) |
| Prisma ORM | ✅ Configurado |
| Padrão MVC | ✅ Implementado |
| CRUD Completo | ✅ Implementado |
| Rotas GET, POST, PUT, DELETE | ✅ Todas presentes |
| Retorno JSON | ✅ Implementado |
| Validações | ✅ Implementadas |
| Tratamento de erros | ✅ Implementado |
| Documentação | ✅ Completa |

---

## 🎯 Próximos Passos

1. **Escolha uma solução:**
   - Docker (mais fácil e recomendado)
   - MySQL Local (se já tem instalado)

2. **Execute os comandos:**
   ```bash
   cd backend
   npx prisma migrate dev --name init
   npm start
   ```

3. **Teste as rotas:**
   - Use Insomnia, Postman ou arquivo `INSOMNIA_COLLECTION.json` fornecido

4. **Verifique o banco:**
   - As tabelas serão criadas automaticamente pelo Prisma

---

## 💡 Dicas Importantes

- Se usar Docker, o banco é reiniciado quando o container é deletado
- Use `npx prisma studio` para visualizar os dados em interface gráfica
- Use `npm run dev` para desenvolvimento com reload automático
- Os scripts estão em `package.json`

---

## ❓ Dúvidas Frequentes

**P: Posso testar a API sem banco de dados?**  
R: Não, o Prisma precisa se conectar ao MySQL para funcionar.

**P: Como limpar os dados do banco?**  
R: Com Docker: `docker stop mysql_container && docker rm mysql_container`  
Com MySQL local: `DROP DATABASE db_DSW_MIGUEL_MAXIMUS_3TIB;`

**P: Qual a diferença entre PUT e PATCH?**  
R: PUT atualiza completo, PATCH é parcial. Esta API usa PUT para atualização parcial.

**P: Como adicionar mais entidades?**  
R: Adicione no `prisma/schema.prisma`, rode `npx prisma migrate dev`, e crie controllers/routes correspondentes.
