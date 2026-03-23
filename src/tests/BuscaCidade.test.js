import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { BuscaCidade } from '../components/BuscaCidade'

describe('BuscaCidade', () => {
  it('deve renderizar o campo de busca', () => {
    render(<BuscaCidade onBuscar={jest.fn()} carregando={false} />)
    expect(screen.getByPlaceholderText(/Digite o nome/)).toBeInTheDocument()
  })

  it('deve chamar onBuscar ao submeter o formulário', () => {
    const onBuscar = jest.fn()
    render(<BuscaCidade onBuscar={onBuscar} carregando={false} />)

    const campo = screen.getByPlaceholderText(/Digite o nome/)
    fireEvent.change(campo, { target: { value: 'Manaus' } })

    const botao = screen.getByRole('button', { name: '' })
    fireEvent.click(botao)

    expect(onBuscar).toHaveBeenCalledWith('Manaus')
  })

  it('deve desabilitar o botão quando está carregando', () => {
    render(<BuscaCidade onBuscar={jest.fn()} carregando={true} />)
    const botao = screen.getByRole('button', { name: '' })
    expect(botao).toBeDisabled()
  })

  it('deve chamar onBuscar ao clicar em cidade rápida', () => {
    const onBuscar = jest.fn()
    render(<BuscaCidade onBuscar={onBuscar} carregando={false} />)

    fireEvent.click(screen.getByText('Manaus'))
    expect(onBuscar).toHaveBeenCalledWith('Manaus')
  })

  it('deve exibir os botões de cidades rápidas', () => {
    render(<BuscaCidade onBuscar={jest.fn()} carregando={false} />)
    expect(screen.getByText('São Paulo')).toBeInTheDocument()
    expect(screen.getByText('Rio de Janeiro')).toBeInTheDocument()
    expect(screen.getByText('Brasília')).toBeInTheDocument()
  })
})
