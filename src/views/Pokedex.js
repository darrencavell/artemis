import React, { useState, useEffect } from 'react'

import PokemonCard from '../components/PokemonCard'
import PokemonButton from '../components/PokemonButton'

import PokemonStore from '../stores/PokemonStore'
import { colorByPokemonType, colorTransform } from '../utils'
import { untamePokemon } from '../actions/PokemonAction'

import './Pokedex.css'

const Pokedex = props => {
  const [tamedPokemonLists, setTamedPokemonLists] = useState([])

  useEffect(() => {
    PokemonStore.getTamePokemonFromIdbAsync()
    PokemonStore.on('change', getTamedPokemonFromStore)
    PokemonStore.on('delete', deletedTamePokemonFromStore)
    return () => {
      PokemonStore.removeListener('change', getTamedPokemonFromStore)
      PokemonStore.removeListener('delete', deletedTamePokemonFromStore)
    }
  }, [])
  function getTamedPokemonFromStore() {
    setTamedPokemonLists(PokemonStore.getTamePokemon())
  }
  function deletedTamePokemonFromStore() {
    PokemonStore.getTamePokemonFromIdbAsync()
  }

  const PokemonCardModifiedComponent = props => {
    const { tamedPokemonLists } = props

    return tamedPokemonLists.map(pokemon => {
      const { id, types } = pokemon
      const color = colorByPokemonType(types[types.length - 1].type.name)

      return pokemon.owned.map(o => {
        console.log(o, pokemon, color)
        return (
          <PokemonCard
            key={id}
            pokemon={pokemon}
            color={color}
            additional={pokemon => {
              const { id, name, types } = pokemon
              const color = colorByPokemonType(types[types.length - 1].type.name)
  
              return (
                <PokemonButton
                  color={colorTransform(color, 20)}
                  callback={() => untamePokemon({ id, name, nickname: o.nickname })}>
                    ✖
                </PokemonButton>
              )
            }}
            minibar={() => {
              console.log(pokemon)
              return (
                <React.Fragment key={`${o.nickname}-${o.catch_date}`}>
                  <div className="pokemon__catchdate">{new Date(o.catch_date).toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  })}</div>
                  <div className="pokemon__nickname">{o.nickname}</div>
                </React.Fragment>
              )
            }} />
        )
      })
    })
  }

  return (
    <div id="pokedex" className="layout">
      <h1 className="headliner">Owned Pokedex</h1>
      <div className="swiper">
        <PokemonCardModifiedComponent
          tamedPokemonLists={tamedPokemonLists} />
      </div>
    </div>
  )
}

export default Pokedex
