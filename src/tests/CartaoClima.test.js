import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { CartaoClima } from '../components/CartaoClima'

const dadosMock = {
  temperatura: 32,
  sensacaoTermica: 38,
  umidade: 85,
  vento: 12,
  codigoClima: 0,
}

const localidadeMock = {
  nome: 'Manaus',
  estado: 'Amazonas',
  pais: 'Brasil',
}

describe('CartaoClima', () => {
  it('deve exibir o nome da cidade', () => {
    render(<CartaoClima dados={dadosMock} localidade={localidadeMock} />)
    expect(screen.getByText('Manaus')).toBeInTheDocument()
  })

  it('deve exibir a temperatura', () => {
    render(<CartaoClima dados={dadosMock} localidade={localidadeMock} />)
    expect(screen.getByText('32°')).toBeInTheDocument()
  })

  it('deve exibir a umidade', () => {
    render(<CartaoClima dados={dadosMock} localidade={localidadeMock} />)
    expect(screen.getByText('85%')).toBeInTheDocument()
  })

  it('deve exibir a velocidade do vento', () => {
    render(<CartaoClima dados={dadosMock} localidade={localidadeMock} />)
    expect(screen.getByText('12 km/h')).toBeInTheDocument()
  })

  it('deve exibir a descrição do clima', () => {
    render(<CartaoClima dados={dadosMock} localidade={localidadeMock} />)
    expect(screen.getByText('Céu limpo')).toBeInTheDocument()
  })

  it('deve exibir o estado quando informado', () => {
    render(<CartaoClima dados={dadosMock} localidade={localidadeMock} />)
    expect(screen.getByText(/Amazonas/)).toBeInTheDocument()
  })

  it('deve exibir a sensação térmica', () => {
    render(<CartaoClima dados={dadosMock} localidade={localidadeMock} />)
    expect(screen.getByText('38°C')).toBeInTheDocument()
  })
})
