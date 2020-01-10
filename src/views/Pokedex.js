import React, { useState, useEffect } from 'react'

import PokemonCard from '../components/PokemonCard'

import PokemonStore from '../stores/PokemonStore'

import './Pokedex.css'

const Pokedex = props => {
  const [tamedPokemonLists, setTamedPokemonLists] = useState([])

  useEffect(() => {
    PokemonStore.getTamePokemonFromIdbAsync()
    PokemonStore.on('change', getTamedPokemonFromStore)
    return () => PokemonStore.removeListener('change', getTamedPokemonFromStore)
  }, [])
  function getTamedPokemonFromStore() {
    setTamedPokemonLists(PokemonStore.getTamePokemon())
  }

  return (
    <div id="pokedex" className="layout">
      <h1 className="headliner">Owned Pokedex</h1>
      <div className="swiper">
        <PokemonCard pokemonLists={tamedPokemonLists} />
      </div>
      {/* <PokemonNotification
        isFetching={isFetching} /> */}
    </div>
  )
}

export default Pokedex
