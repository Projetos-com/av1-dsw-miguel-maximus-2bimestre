# ⚡ QUICK START - Comande e Cole

## 🚀 3 Passos para Rodar

---

### PASSO 1️⃣: Criar MySQL com Docker

**Copie e cole no PowerShell:**

```powershell
docker run -d --name mysql_dsw -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=db_DSW_MIGUEL_MAXIMUS_3TIB -p 3306:3306 mysql:latest
```

**Aguarde 3-5 segundos para o container iniciar.**

---

### PASSO 2️⃣: Criar Tabelas

**Copie e cole no Terminal:**

```bash
cd backend
npx prisma migrate dev --name init
```

**Escolha um nome para a migration (ex: "init" ou apenas ENTER)**

---

### PASSO 3️⃣: Iniciar Servidor

**Copie e cole no Terminal:**

```bash
npm start
```

**Resultado esperado:**
```
✅ Conexão bem-sucedida com o banco de dados!
🚀 Servidor rodando em http://localhost:3000
```

---

## ✅ Está Funcionando?

**Abra o Insomnia/Postman e teste:**

### Teste 1: GET (Listar)
```
GET http://localhost:3000/tarefas
```
Resultado: `[]` (array vazio)

### Teste 2: POST (Criar)
```
POST http://localhost:3000/tarefas
Content-Type: application/json

{
  "title": "Minha primeira tarefa",
  "description": "Testando a API",
  "completed": false
}
```
Resultado: Status 201 ✅

### Teste 3: GET por ID
```
GET http://localhost:3000/tarefas/1
```
Resultado: A tarefa criada ✅

---

## ❌ Erros Comuns

### Erro: "Can't reach database server"
- Verifique se rodou o comando Docker do Passo 1
- Verifique se Docker está instalado
- Aguarde 5 segundos para o container iniciar

### Erro: "Syntax error in schema"
- Não mexer no arquivo `prisma/schema.prisma`
- Tudo já está configurado

### Erro: "Port 3306 already in use"
- Docker container já existe
- Execute: `docker rm -f mysql_dsw` (deleta o anterior)
- Rode novamente o comando do Passo 1

---

## 🧪 Coleção Completa (Mais Fácil)

**Importe em Insomnia/Postman:**
```
backend/INSOMNIA_COLLECTION.json
```

Todos os endpoints já vêm configurados!

---

## 📚 Precisa de Mais Info?

- **Como rodar?** → GUIA_PRATICO.md
- **Exemplos de requisições?** → backend/EXEMPLOS_REQUISICOES.md
- **Análise completa?** → ANALISE_REQUISITOS.md
- **Padrão MVC?** → backend/ARQUITETURA.md

---

## 🎯 Resumo

```
3 passos = API funcionando ✅
5 minutos = Backend pronto ⏱️
100% dos requisitos = Completo ✨
```

**Boa sorte! 🚀**
