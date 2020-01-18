import React, { useState, useEffect, useRef, createRef } from 'react'
import { useHistory } from 'react-router-dom'

import PokemonCard from '../components/PokemonCard'
import PokemonMenu from '../components/PokemonMenu'

import PokemonStore from '../stores/PokemonStore'
import {
  colorByPokemonType,
  // createObserver
} from '../utils'
import { fetchPokemon } from '../actions/PokemonAction'
import useInfiniteScrolling from '../utils/useInfiniteScrolling'

import './Home.css'

const Home = props => {
  const history = useHistory()
  const [pokemonLists, setPokemonLists] = useState([])
  // const [imageObserver, setImageObserver] = useState(null)

  const [isFetching, setIsFetching, clear] = useInfiniteScrolling(fetchMorePokemon)
  function fetchMorePokemon() {
    setTimeout(() => {
      fetchPokemon({ query: `?limit=${PokemonStore.data.limit}&offset=${PokemonStore.data.loaded}` })
    }, 3000)
  }

  // function onImageInView(entries, observer) {
  //   entries.forEach((entry) => {
  //     if (entry.isIntersecting) {
  //       const element = entry.target
  //       const imageSrc = element.getAttribute('data-src')
        
  //       element.removeAttribute('data-src')
  //       element.setAttribute('src', imageSrc)
        
  //       observer.unobserve(element)
  //     } 
  //   })
  // }

  useEffect(() => {
    PokemonStore.data.loaded === 0
      ? fetchPokemon({ query: `?limit=10&offset=${PokemonStore.data.loaded}` })
      : setPokemonLists(PokemonStore.getExistingPokemon())
    
    // if ("IntersectionObserver" in window) {
    //   const observer = createObserver(onImageInView)
    //   setImageObserver(observer)
    // }
    PokemonStore.on('change', updateFromStore)
    return () => {
      clear()
      setIsFetching(false)
      // if ("IntersectionObserver" in window) {
      //   imageObserver.disconnect()
      // }
      PokemonStore.removeListener('change', updateFromStore)
    }
  }, [])
  function updateFromStore() {
    if(!isFetching) {
      setPokemonLists(prevState => prevState.concat(PokemonStore.getPokemon()))
      setIsFetching(false)
    }
  }

  const PokemonNotification = props => {
    const { isFetching } = props
    const toggle = isFetching ? 'show' : 'hide'

    return (
      <div className={`pokemon__notification ${toggle}`}>
        Fetching more pokemons
      </div>
    )
  }

  const PokemonCardModified = props => {
    const { pokemonLists, observer } = props

    return pokemonLists.map(pokemon => {
      const { id, types, name } = pokemon
      const color = colorByPokemonType(types[types.length - 1].type.name)

      return (
        <PokemonCard
          key={id}
          pokemon={pokemon}
          color={color}
          // observer={observer}
          callback={() => history.push(`/${name}`)} />
      )
    })
  }

  return (
    <div id="home" className="layout">
      <h1 className="headliner">Artemis Pokedex</h1>
      <div className="swiper">
        <PokemonCardModified
          // observer={imageObserver}
          pokemonLists={pokemonLists} />
      </div>
      <PokemonNotification
        isFetching={isFetching} />
      <PokemonMenu />
    </div>
  )
}

export default Home