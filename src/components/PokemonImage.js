import React from 'react'

const PokemonImage = props => {
  const { sprites } = props

  return (
    <div className="pokemon__image">
      <img src={sprites.front_default} alt={sprites.front_default} />
    </div>
  )
}

export default PokemonImage
