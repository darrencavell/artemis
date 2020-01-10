import React, { useState, useEffect } from 'react'

import PokemonCard from '../components/PokemonCard'

import PokemonStore from '../stores/PokemonStore'
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
    }, 2000)
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

  return (
    <div id="home" className="layout">
      <h1 className="headliner">Artemis Pokedex</h1>
      <div className="swiper">
        <PokemonCard pokemonLists={pokemonLists} />
      </div>
      <PokemonNotification
        isFetching={isFetching} />
    </div>
  )
}

export default Home