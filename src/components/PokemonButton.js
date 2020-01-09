import React from 'react'

import { colorByPokemonType } from '../utils'

const PokemonButton = props => {
  const { children, types, callback } = props
  return (
    <button
      className="pokemon__button"
      style={{ backgroundColor: colorByPokemonType(types[types.length - 1].type.name), color: 'white' }}
      onClick={callback}>{children}</button>
  )
}

export default PokemonButton
