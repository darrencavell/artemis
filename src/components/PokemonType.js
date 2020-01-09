import React from 'react'

import { colorByPokemonType } from '../utils'

const PokemonType = props => {
  const { types } = props
  
  return types.map(t => t.type.name).map(type => {
    return (
      <div key={`${name}-${type}`} className="pokemon__type" style={{ background: colorByPokemonType(type), color: 'white' }}>{type}</div>
    )
  })
}

export default PokemonType