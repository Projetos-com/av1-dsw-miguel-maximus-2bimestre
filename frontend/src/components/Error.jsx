export function Error({ mensagem, onRetry }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-red-600 text-2xl">⚠️</span>
          <div>
            <h3 className="text-red-700 font-bold">Erro</h3>
            <p className="text-red-600">{mensagem || 'Ocorreu um erro ao carregar os dados'}</p>
          </div>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Tentar Novamente
          </button>
        )}
      </div>
    </div>
  );
}
