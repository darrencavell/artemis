import React from 'react'
import { useHistory } from 'react-router-dom'

import PokemonType from './PokemonType'
import PokemonImage from './PokemonImage'

const PokemonCard = props => {
  const { pokemon, color, minibar, additional } = props
  const { sprites, types, name } = pokemon

  const history = useHistory()

  const MiniBarComponent = minibar ? minibar(pokemon) : null
  const AdditionalComponent = additional ? additional(pokemon) : null

  return (
    <div className="pokemon-card" style={{ background: color }}>
      <div onClick={() => history.push(`/${name}`)}>
        <PokemonImage
          sprites={sprites} />
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
