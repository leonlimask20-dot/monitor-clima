import { interpretarCodigoClima } from '../services/climaApi'

/**
 * Componente CartaoClima — exibe os dados climáticos em um card Bootstrap.
 *
 * --- O QUE É UM COMPONENTE REACT? ---
 * É uma função que recebe "props" (propriedades) e retorna JSX (HTML dentro do JS).
 * Cada componente é responsável por uma parte da interface.
 *
 * Props são como parâmetros de função — o componente pai passa os dados,
 * o filho só exibe. Isso mantém a separação entre lógica e apresentação.
 *
 * --- O QUE É JSX? ---
 * É uma sintaxe que parece HTML mas é JavaScript por baixo.
 * `<div className="card">` vira `React.createElement('div', {className: 'card'})`
 * Usamos className ao invés de class porque class é palavra reservada no JS.
 */
export function CartaoClima({ dados, localidade }) {
  const { descricao, icone, cor } = interpretarCodigoClima(dados.codigoClima)

  return (
    <div className="card shadow-sm border-0 h-100">
      <div className={`card-header bg-${cor} bg-opacity-10 border-0 py-3`}>
        <div className="d-flex align-items-center gap-2">
          <i className={`${icone} fs-3 text-${cor}`}></i>
          <div>
            <h5 className="mb-0 fw-bold">
              {localidade.nome}
              {localidade.estado && (
                <span className="fw-normal text-muted fs-6"> — {localidade.estado}</span>
              )}
            </h5>
            <small className="text-muted">{localidade.pais}</small>
          </div>
        </div>
      </div>

      <div className="card-body">
        {/* Temperatura principal em destaque */}
        <div className="text-center py-3">
          <span className="display-3 fw-bold">{dados.temperatura}°</span>
          <span className="fs-4 text-muted">C</span>
          <p className={`text-${cor} fw-semibold mt-1`}>{descricao}</p>
        </div>

        {/* Grade com detalhes do clima usando Bootstrap Grid */}
        <div className="row g-3 mt-1">
          <div className="col-4 text-center">
            <div className="p-2 bg-light rounded">
              <i className="bi bi-thermometer-half text-danger d-block fs-5"></i>
              <small className="text-muted d-block">Sensação</small>
              <span className="fw-semibold">{dados.sensacaoTermica}°C</span>
            </div>
          </div>
          <div className="col-4 text-center">
            <div className="p-2 bg-light rounded">
              <i className="bi bi-droplet text-primary d-block fs-5"></i>
              <small className="text-muted d-block">Umidade</small>
              <span className="fw-semibold">{dados.umidade}%</span>
            </div>
          </div>
          <div className="col-4 text-center">
            <div className="p-2 bg-light rounded">
              <i className="bi bi-wind text-success d-block fs-5"></i>
              <small className="text-muted d-block">Vento</small>
              <span className="fw-semibold">{dados.vento} km/h</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card-footer text-muted text-end small border-0">
        <i className="bi bi-clock me-1"></i>
        Atualizado agora
      </div>
    </div>
  )
}
