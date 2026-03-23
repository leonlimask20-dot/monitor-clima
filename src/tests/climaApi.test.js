import { interpretarCodigoClima, buscarCoordenadas } from '../services/climaApi'

/**
 * Testes do serviço de clima.
 *
 * interpretarCodigoClima é uma função pura — testamos diretamente.
 * buscarCoordenadas faz fetch — mockamos o fetch para não chamar a API real.
 */

describe('interpretarCodigoClima', () => {
  it('deve retornar céu limpo para código 0', () => {
    const resultado = interpretarCodigoClima(0)
    expect(resultado.descricao).toBe('Céu limpo')
    expect(resultado.icone).toBe('bi-sun')
    expect(resultado.cor).toBe('warning')
  })

  it('deve retornar parcialmente nublado para código 1 e 2', () => {
    expect(interpretarCodigoClima(1).descricao).toBe('Parcialmente nublado')
    expect(interpretarCodigoClima(2).descricao).toBe('Parcialmente nublado')
  })

  it('deve retornar nublado para código 3', () => {
    expect(interpretarCodigoClima(3).descricao).toBe('Nublado')
  })

  it('deve retornar chuva para códigos 61 a 69', () => {
    expect(interpretarCodigoClima(61).descricao).toBe('Chuva')
    expect(interpretarCodigoClima(65).descricao).toBe('Chuva')
  })

  it('deve retornar trovoada para códigos 95 a 99', () => {
    expect(interpretarCodigoClima(95).descricao).toBe('Trovoada')
    expect(interpretarCodigoClima(95).cor).toBe('danger')
  })

  it('deve retornar desconhecido para código fora do range', () => {
    expect(interpretarCodigoClima(999).descricao).toBe('Desconhecido')
  })
})

describe('buscarCoordenadas', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('deve retornar coordenadas quando cidade é encontrada', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        results: [{
          name: 'Manaus',
          latitude: -3.1019,
          longitude: -60.025,
          admin1: 'Amazonas',
          country: 'Brasil',
          country_code: 'BR',
        }]
      })
    })

    const resultado = await buscarCoordenadas('Manaus')

    expect(resultado.nome).toBe('Manaus')
    expect(resultado.estado).toBe('Amazonas')
    expect(resultado.latitude).toBe(-3.1019)
  })

  it('deve lançar erro quando cidade não é encontrada', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ results: [] })
    })

    await expect(buscarCoordenadas('CidadeInventada123'))
      .rejects.toThrow('não encontrada')
  })

  it('deve lançar erro quando a API retorna falha', async () => {
    global.fetch.mockResolvedValueOnce({ ok: false, status: 500 })

    await expect(buscarCoordenadas('Manaus'))
      .rejects.toThrow('Erro ao buscar cidade')
  })

  it('deve priorizar resultados do Brasil', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        results: [
          { name: 'Manaus', latitude: 10, longitude: 20, country_code: 'US', admin1: 'Ohio', country: 'EUA' },
          { name: 'Manaus', latitude: -3.1, longitude: -60.0, country_code: 'BR', admin1: 'Amazonas', country: 'Brasil' },
        ]
      })
    })

    const resultado = await buscarCoordenadas('Manaus')
    expect(resultado.estado).toBe('Amazonas')
  })
})
