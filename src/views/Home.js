import React, { useState, useEffect } from 'react'

import PokemonCard from '../components/PokemonCard'

import PokemonStore from '../stores/PokemonStore'
import { colorByPokemonType } from '../utils'
import { fetchPokemon } from '../actions/PokemonAction'
import useInfiniteScrolling from '../utils/useInfiniteScrolling'

import './Home.css'

const Home = props => {
  const [pokemonLists, setPokemonLists] = useState([])

  const [isFetching, setIsFetching] = useInfiniteScrolling(fetchMorePokemon)
  function fetchMorePokemon() {
    setTimeout(() => {
      fetchPokemon({ query: `?limit=${PokemonStore.data.limit}&offset=${PokemonStore.data.loaded}` })
      setIsFetching(false)
    }, 3000)
  }

  useEffect(() => {
    fetchPokemon()
    PokemonStore.on('change', updateFromStore)
    return () => {
      PokemonStore.removeListener('change', updateFromStore)
    }
  }, [])
  function updateFromStore() {
    if(!isFetching)
      setPokemonLists(prevState => prevState.concat(PokemonStore.getPokemon()))
  }

  const PokemonNotification = props => {
    const { isFetching } = props
    const toggle = isFetching ? 'show' : 'hide'
    
    return (
      <div className={`pokemon__notification ${toggle}`}>Fetching more pokemons...</div>
    )
  }

  const PokemonCardModified = props => {
    const { pokemonLists } = props

    return pokemonLists.map(pokemon => {
      const { id, types } = pokemon
      const color = colorByPokemonType(types[types.length - 1].type.name)

      return (
        <PokemonCard
          key={id}
          pokemon={pokemon}
          color={color} />
      )
    })
  }

  return (
    <div id="home" className="layout">
      <h1 className="headliner">Artemis Pokedex</h1>
      <div className="swiper">
        <PokemonCardModified
          pokemonLists={pokemonLists} />
      </div>
      <PokemonNotification
        isFetching={isFetching} />
    </div>
  )
}

export default Home