// Background task para manter o bot rodando 24/7
addEventListener('botUpdate', (resolve, reject) => {
  console.log('[Background] Bot executando em segundo plano:', new Date().toISOString());
  
  // Simula processamento de apostas em background
  try {
    // Aqui seria a lógica real de conexão com a API da casa de apostas
    const timestamp = Date.now();
    console.log('[Background] Verificando oportunidades de apostas...');
    
    // Mantém o bot ativo mesmo com dispositivo bloqueado
    resolve();
  } catch (error) {
    console.error('[Background] Erro:', error);
    reject(error);
  }
});
