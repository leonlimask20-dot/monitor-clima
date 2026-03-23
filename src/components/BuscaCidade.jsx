import { useState } from 'react'

/**
 * Componente de busca de cidade.
 *
 * useState aqui armazena o texto digitado no campo.
 * Cada letra digitada atualiza o estado, que atualiza o valor do input.
 * Isso é chamado de "controlled component" — o React controla o valor do campo.
 */
export function BuscaCidade({ onBuscar, carregando }) {
  // useState retorna [valorAtual, funçãoParaAtualizar]
  const [cidade, setCidade] = useState('')

  function handleSubmit(evento) {
    // Previne o comportamento padrão do form (recarregar a página)
    evento.preventDefault()
    if (cidade.trim()) {
      onBuscar(cidade)
    }
  }

  const cidadesRapidas = [
    'Manaus', 'São Paulo', 'Rio de Janeiro',
    'Brasília', 'Salvador', 'Fortaleza'
  ]

  return (
    <div>
      <form onSubmit={handleSubmit} className="d-flex gap-2 mb-3">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Digite o nome de uma cidade..."
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          disabled={carregando}
        />
        <button
          type="submit"
          className="btn btn-primary btn-lg px-4"
          disabled={carregando || !cidade.trim()}
        >
          {carregando
            ? <span className="spinner-border spinner-border-sm" role="status" />
            : <i className="bi bi-search"></i>
          }
        </button>
      </form>

      {/* Botões de acesso rápido para cidades populares */}
      <div className="d-flex flex-wrap gap-2">
        {cidadesRapidas.map(c => (
          <button
            key={c}
            className="btn btn-outline-secondary btn-sm"
            onClick={() => { setCidade(c); onBuscar(c) }}
            disabled={carregando}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}
