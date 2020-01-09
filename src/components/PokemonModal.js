import { createPortal } from 'react-dom'

import usePortal from '../utils/usePortal'

const PokemonModal = ({ id, children }) => {
  const target = usePortal(id, children)
  return createPortal(children, target)
}

export default PokemonModal
