import React from 'react'

const PokemonButton = props => {
  const { children, color, callback } = props
  return (
    <button
      className="pokemon__button"
      style={{ backgroundColor: color, color: 'white' }}
      onClick={callback}>{children}</button>
  )
}

export default PokemonButton
