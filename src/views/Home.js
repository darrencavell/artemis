import { Link } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'

import PokemonType from '../components/PokemonType'
import PokemonImage from '../components/PokemonImage'

import PokemonStore from '../stores/PokemonStore'
import { fetchPokemon } from '../actions/PokemonAction'
import { colorByPokemonType } from '../utils'
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

  const PokemonCard = () => {
    return pokemonLists.map((pokemon, index) => {
      const { id, name, sprites, types} = pokemon
      
      const color = colorByPokemonType(types[types.length - 1].type.name)
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

  const PokemonNotification = props => {
    const { isFetching } = props

    const toggle = isFetching ? 'show' : 'hide'
    return (
      <div className={`pokemon__notification ${toggle}`}>Fetching more pokemons...</div>
    )
  }

  return (
    <div id="home">
      <h1 className="headliner">Artemis Pokedex</h1>
      <div className="swiper">
        <PokemonCard />
      </div>
      <PokemonNotification
        isFetching={isFetching} />
    </div>
  )
}

export default Home