/**
 * Integração com a Open-Meteo API — gratuita, sem cadastro nem chave de API.
 * Documentação: https://open-meteo.com/en/docs
 *
 * Fluxo:
 * 1. Busca as coordenadas da cidade via Geocoding API
 * 2. Usa as coordenadas para buscar os dados climáticos
 */

const URL_GEOCODING = 'https://geocoding-api.open-meteo.com/v1/search'
const URL_CLIMA     = 'https://api.open-meteo.com/v1/forecast'

/**
 * Busca as coordenadas geográficas de uma cidade.
 * Retorna latitude, longitude e nome completo com estado/país.
 */
export async function buscarCoordenadas(nomeCidade) {
  const params = new URLSearchParams({
    name: nomeCidade,
    count: 5,
    language: 'pt',
    format: 'json',
  })

  const resposta = await fetch(`${URL_GEOCODING}?${params}`)

  if (!resposta.ok) {
    throw new Error(`Erro ao buscar cidade: ${resposta.status}`)
  }

  const dados = await resposta.json()

  if (!dados.results || dados.results.length === 0) {
    throw new Error(`Cidade "${nomeCidade}" não encontrada`)
  }

  // Filtra resultados do Brasil quando possível
  const resultadosBrasil = dados.results.filter(r => r.country_code === 'BR')
  const resultado = resultadosBrasil.length > 0 ? resultadosBrasil[0] : dados.results[0]

  return {
    latitude:  resultado.latitude,
    longitude: resultado.longitude,
    nome:      resultado.name,
    estado:    resultado.admin1 || '',
    pais:      resultado.country || '',
  }
}

/**
 * Busca os dados climáticos atuais para uma coordenada geográfica.
 *
 * current_weather: temperatura e velocidade do vento em tempo real
 * hourly: umidade e sensação térmica por hora (usamos a hora atual)
 */
export async function buscarClima(latitude, longitude) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    current_weather: true,
    hourly: 'relativehumidity_2m,apparent_temperature',
    timezone: 'America/Sao_Paulo',
    forecast_days: 1,
  })

  const resposta = await fetch(`${URL_CLIMA}?${params}`)

  if (!resposta.ok) {
    throw new Error(`Erro ao buscar clima: ${resposta.status}`)
  }

  const dados = await resposta.json()

  // Pega o índice da hora atual para buscar umidade e sensação térmica
  const agora = new Date()
  const horaAtual = agora.getHours()

  return {
    temperatura:    dados.current_weather.temperature,
    vento:          dados.current_weather.windspeed,
    codigoClima:    dados.current_weather.weathercode,
    umidade:        dados.hourly.relativehumidity_2m[horaAtual],
    sensacaoTermica: dados.hourly.apparent_temperature[horaAtual],
  }
}

/**
 * Converte o código numérico do clima da Open-Meteo em
 * descrição legível e ícone Bootstrap Icons.
 *
 * Referência: https://open-meteo.com/en/docs#weathervariables
 */
export function interpretarCodigoClima(codigo) {
  if (codigo === 0)             return { descricao: 'Céu limpo',        icone: 'bi-sun',              cor: 'warning' }
  if (codigo <= 2)              return { descricao: 'Parcialmente nublado', icone: 'bi-cloud-sun',    cor: 'info'    }
  if (codigo === 3)             return { descricao: 'Nublado',          icone: 'bi-clouds',           cor: 'secondary' }
  if (codigo <= 49)             return { descricao: 'Neblina',          icone: 'bi-cloud-fog2',       cor: 'secondary' }
  if (codigo <= 59)             return { descricao: 'Garoa',            icone: 'bi-cloud-drizzle',    cor: 'info'    }
  if (codigo <= 69)             return { descricao: 'Chuva',            icone: 'bi-cloud-rain',       cor: 'primary' }
  if (codigo <= 79)             return { descricao: 'Neve',             icone: 'bi-snow',             cor: 'light'   }
  if (codigo <= 84)             return { descricao: 'Pancadas de chuva', icone: 'bi-cloud-rain-heavy', cor: 'primary' }
  if (codigo <= 99)             return { descricao: 'Trovoada',         icone: 'bi-cloud-lightning',  cor: 'danger'  }
  return                               { descricao: 'Desconhecido',     icone: 'bi-question-circle',  cor: 'secondary' }
}
