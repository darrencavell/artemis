import React from 'react'

import PokemonType from './PokemonType'
import PokemonImage from './PokemonImage'

const PokemonCard = props => {
  const { pokemon, color, minibar, additional, callback, observer } = props
  const { sprites, types, name } = pokemon

  const MiniBarComponent = minibar ? minibar(pokemon) : null
  const AdditionalComponent = additional ? additional(pokemon) : null

  return (
    <div className="pokemon__card" style={{ background: color }}>
      <div onClick={callback}>
        <PokemonImage
          isLazy
          observer={observer}
          src={sprites.front_default} />
        <div className="pokemon__description">
          <div>
            <div className="pokemon__name">{name}</div>
            {MiniBarComponent}
          </div>
          <div className="pokemon__types">
            <PokemonType
              types={types} />
          </div>
        </div>
      </div>
      {AdditionalComponent}
    </div>
  )
}

export default PokemonCard
