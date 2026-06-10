# 🚀 GUIA RÁPIDO - RODAR PROJETO COMPLETO (Parte 1 + Parte 2)

## ⚡ 5 Minutos para Tudo Funcionando!

---

## 📋 Pré-requisitos

- ✅ Docker instalado (para MySQL)
- ✅ Node.js v16+
- ✅ Git

---

## 🎯 Passo 1: Setup MySQL (5 segundos)

### Terminal 1 - PowerShell

```powershell
docker run -d --name mysql_dsw -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=db_DSW_MIGUEL_MAXIMUS_3TIB -p 3306:3306 mysql:latest
```

**Resultado esperado:**
```
✅ Container iniciado
```

---

## 🎯 Passo 2: Iniciar Backend (2 minutos)

### Terminal 2

```bash
cd backend
npx prisma migrate dev --name init
npm start
```

**Resultado esperado:**
```
✅ Conexão bem-sucedida com o banco de dados!
🚀 Servidor rodando em http://localhost:3000
```

---

## 🎯 Passo 3: Iniciar Frontend (1 minuto)

### Terminal 3

```bash
cd frontend
npm run dev
```

**Resultado esperado:**
```
➜ Local: http://localhost:5173/
```

---

## ✅ Tudo Pronto!

Agora você tem:

| Componente | URL | Status |
|-----------|-----|--------|
| Backend API | http://localhost:3000 | ✅ Rodando |
| Frontend | http://localhost:5173 | ✅ Rodando |
| Database | localhost:3306 | ✅ Rodando |

---

## 🧪 Testar Agora

### 1. Abra http://localhost:5173/ no navegador

### 2. Clique em "+ Nova Tarefa"

### 3. Preencha:
```
Título: "Minha primeira tarefa"
Descrição: "Testando o projeto"
```

### 4. Clique em "Salvar Tarefa"

### 5. ✅ Sucesso! Tarefa aparece na listagem

---

## 📚 Documentação Disponível

| Arquivo | Propósito |
|---------|-----------|
| **backend/README.md** | Explicação backend |
| **backend/EXEMPLOS_REQUISICOES.md** | Exemplos de API |
| **frontend/DOCUMENTACAO.md** | Explicação frontend |
| **PARTE2_FRONTEND_CONCLUIDA.md** | Status frontend |
| **backend/INSOMNIA_COLLECTION.json** | Coleção de testes |

---

## 🚨 Erros Comuns

### "Can't connect to database"
```
Solução:
1. Verifique se Docker está rodando
2. Execute: docker ps
3. Se não vir mysql_dsw, rode o comando do Passo 1
```

### "Port 3306 already in use"
```
Solução:
docker rm -f mysql_dsw
# E execute novamente o comando do Passo 1
```

### "Frontend mostra erro ao carregar tarefas"
```
Solução:
1. Verifique se backend está rodando
2. Abra http://localhost:3000 no navegador
3. Deve retornar JSON
```

---

## 🛑 Para Parar

### Parar Backend
```
Terminal 2: Ctrl+C
```

### Parar Frontend
```
Terminal 3: Ctrl+C
```

### Parar MySQL
```
docker stop mysql_dsw
```

### Apagar MySQL (se precisar recomeçar)
```
docker rm -f mysql_dsw
```

---

## 🎯 Funcionalidades Disponíveis

- ✅ Listar tarefas
- ✅ Criar tarefa
- ✅ Editar tarefa
- ✅ Deletar tarefa
- ✅ Filtrar por status
- ✅ Marcar como concluída
- ✅ Loading e erro tratados

---

## 📊 Arquitetura

```
Frontend (React)
    ↓ Axios HTTP
Backend API (Express)
    ↓ Prisma ORM
MySQL Database
```

---

## ✨ Pronto?

Comece agora mesmo! Abra 3 terminais e execute os 3 passos acima.

---

**Tempo total:** 5 minutos  
**Requisitos:** 100% atendidos  
**Status:** ✅ PRONTO
