import React from 'react'
import { Link } from 'react-router-dom'

import PokemonType from './PokemonType'
import PokemonImage from './PokemonImage'
import PokemonButton from './PokemonButton'

import { colorByPokemonType } from '../utils'
import { untamePokemon } from '../actions/PokemonAction'

const PokemonCard = props => {
  const { pokemonLists } = props
  
  return pokemonLists.map((pokemon, index) => {
    const { id, name, sprites, types, owned} = pokemon
    
    const color = colorByPokemonType(types[types.length - 1].type.name)
    if (owned) {
      return owned.map(o => (
        <Link
          key={`${id}-${o.nickname}-${o.catch_date}`}
          to={`/${name}`}
          className="pokemon-card"
          style={{ background: color }}
        >
          <PokemonImage
            sprites={sprites} />
          <div className="pokemon__description">
            <div>
              <div className="pokemon__name">{name}</div>
              <div className="pokemon__nickname">{o.nickname}</div>
              <div className="pokemon__catchdate">{new Date(o.catch_date).toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short'
              })}</div>
              <PokemonButton
                types={types}
                callback={() => untamePokemon({ id, name })}>
                  ✖
              </PokemonButton>
            </div>
            <div className="pokemon__types">
              <PokemonType
                types={types} />
            </div>
          </div>
        </Link>
      ))
    }
    return (
      <Link
        key={id}
        to={`/${name}`}
        className="pokemon-card"
        style={{ background: color }}
      >
        <PokemonImage
          sprites={sprites} />
        <div className="pokemon__description">
          <div className="pokemon__name">{name}</div>
          <div className="pokemon__types">
            <PokemonType
              types={types} />
          </div>
        </div>
      </Link>
    )
  })
}

export default PokemonCard
