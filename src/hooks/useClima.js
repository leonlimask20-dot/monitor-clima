import { useState, useCallback } from 'react'
import { buscarCoordenadas, buscarClima } from '../services/climaApi'

/**
 * Hook customizado para buscar dados climáticos.
 *
 * --- O QUE É UM HOOK? ---
 * Hooks são funções que permitem usar recursos do React (estado, efeitos)
 * dentro de componentes funcionais. O prefixo "use" é obrigatório.
 *
 * useState: armazena valores que, quando mudam, re-renderizam o componente.
 * useCallback: memoriza a função para evitar recriações desnecessárias.
 *
 * Separar a lógica em um hook customizado:
 * - Mantém os componentes limpos (só UI)
 * - Facilita os testes (testamos o hook separado do componente)
 * - Permite reusar a lógica em outros componentes
 */
export function useClima() {
  // Estado inicial: sem dados, sem erro, sem carregamento
  const [dados, setDados]         = useState(null)
  const [localidade, setLocalidade] = useState(null)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro]           = useState(null)

  const buscar = useCallback(async (nomeCidade) => {
    if (!nomeCidade.trim()) return

    setCarregando(true)
    setErro(null)
    setDados(null)

    try {
      // 1. Busca as coordenadas da cidade
      const coords = await buscarCoordenadas(nomeCidade)

      // 2. Usa as coordenadas para buscar o clima
      const clima = await buscarClima(coords.latitude, coords.longitude)

      setLocalidade(coords)
      setDados(clima)
    } catch (err) {
      setErro(err.message)
    } finally {
      // finally garante que o loading é desativado mesmo com erro
      setCarregando(false)
    }
  }, [])

  return { dados, localidade, carregando, erro, buscar }
}
