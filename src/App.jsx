import { useClima } from './hooks/useClima'
import { BuscaCidade } from './components/BuscaCidade'
import { CartaoClima } from './components/CartaoClima'

/**
 * Componente raiz da aplicação.
 *
 * useClima é um hook customizado que encapsula toda a lógica de busca.
 * O App só cuida de orquestrar os componentes e passar os dados para eles.
 *
 * Fluxo de dados no React (unidirecional — de cima para baixo):
 *   App (estado) → BuscaCidade (recebe onBuscar) → dispara buscar()
 *   App (estado atualizado) → CartaoClima (recebe dados) → exibe
 */
export default function App() {
  const { dados, localidade, carregando, erro, buscar } = useClima()

  return (
    <div className="min-vh-100 bg-light">
      {/* Cabeçalho */}
      <nav className="navbar navbar-dark bg-primary shadow-sm">
        <div className="container">
          <span className="navbar-brand fw-bold fs-4">
            <i className="bi bi-cloud-sun me-2"></i>
            Monitor de Clima
          </span>
          <span className="text-white-50 small">Brasil</span>
        </div>
      </nav>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">

            {/* Título */}
            <div className="text-center mb-4">
              <h1 className="fw-bold text-primary">Consulte o clima</h1>
              <p className="text-muted">
                Busque qualquer cidade do Brasil e veja as condições climáticas em tempo real
              </p>
            </div>

            {/* Formulário de busca */}
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body p-4">
                <BuscaCidade onBuscar={buscar} carregando={carregando} />
              </div>
            </div>

            {/* Estado de erro */}
            {erro && (
              <div className="alert alert-danger d-flex align-items-center gap-2" role="alert">
                <i className="bi bi-exclamation-triangle-fill fs-5"></i>
                <span>{erro}</span>
              </div>
            )}

            {/* Estado de carregamento */}
            {carregando && (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                  <span className="visually-hidden">Carregando...</span>
                </div>
                <p className="text-muted mt-3">Buscando dados climáticos...</p>
              </div>
            )}

            {/* Card com resultado */}
            {dados && localidade && !carregando && (
              <CartaoClima dados={dados} localidade={localidade} />
            )}

            {/* Estado inicial — sem busca ainda */}
            {!dados && !carregando && !erro && (
              <div className="text-center py-4 text-muted">
                <i className="bi bi-geo-alt fs-1 d-block mb-3 opacity-25"></i>
                <p>Digite o nome de uma cidade para começar</p>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Rodapé */}
      <footer className="text-center text-muted py-4 border-top small">
        <p className="mb-0">
          Dados fornecidos por{' '}
          <a href="https://open-meteo.com" target="_blank" rel="noreferrer" className="text-decoration-none">
            Open-Meteo
          </a>
          {' '}— gratuito e open source
        </p>
        <p className="mb-0 mt-1">LNL</p>
      </footer>
    </div>
  )
}
