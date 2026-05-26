import prisma from "./prisma.js";

/**
 * Testa a conexão com o banco de dados
 */
async function testConnection() {
  try {
    console.log("🔄 Testando conexão com o banco de dados...");
    
    await prisma.$connect();
    console.log("✅ Conexão estabelecida com sucesso!");
    
    // Testa se consegue fazer uma query simples
    const result = await prisma.task.findMany({
      take: 1,
    });
    
    console.log("✅ Query realizada com sucesso!");
    console.log(`📊 Total de tarefas no banco: ${result.length}`);
    
    await prisma.$disconnect();
    console.log("✅ Desconectado do banco de dados");
    
    return true;
  } catch (error) {
    console.error("❌ Erro ao conectar com o banco de dados:");
    console.error("Mensagem:", error.message);
    console.error("Código:", error.code);
    console.error("Verifique as variáveis de ambiente (DATABASE_URL)");
    return false;
  }
}

// Executar teste
testConnection().then((success) => {
  process.exit(success ? 0 : 1);
});
