import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import PokemonCard from '../components/PokemonCard'
import PokemonButton from '../components/PokemonButton'
import PokemonMenu from '../components/PokemonMenu'

import PokemonStore from '../stores/PokemonStore'
import {
  colorByPokemonType,
  colorTransform,
  // createObserver
} from '../utils'
import { untamePokemon } from '../actions/PokemonAction'

import './Pokedex.css'

const Pokedex = props => {
  const history = useHistory()
  const [tamedPokemonLists, setTamedPokemonLists] = useState([])
  // const [imageObserver, setImageObserver] = useState(null)

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
    PokemonStore.getTamePokemonFromIdbAsync()
    PokemonStore.on('change', getTamedPokemonFromStore)
    PokemonStore.on('delete', deletedTamePokemonFromStore)

    // if ("IntersectionObserver" in window) {
    //   const imageObserver = createObserver(onImageInView) 
    //   setImageObserver(imageObserver)
    // }
    return () => {
      // if ("IntersectionObserver" in window) {
      //   imageObserver.disconnect()
      // }
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
      const { id, types, name } = pokemon
      const color = colorByPokemonType(types[types.length - 1].type.name)

      return pokemon.owned.map(o => {
        return (
          <PokemonCard
            key={`${id}-${o.catch_date}`}
            pokemon={pokemon}
            color={color}
            callback={() => history.push(`/${name}`)}
            // observer={imageObserver}
            additional={pokemon => {
              const { id, name, types } = pokemon
              const color = colorByPokemonType(types[types.length - 1].type.name)

              return (
                <PokemonButton
                  color={color}
                  callback={() => untamePokemon({ id, name, nickname: o.nickname })}>
                    ✖
                </PokemonButton>
              )
            }}
            minibar={() => {
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
      <PokemonMenu />
    </div>
  )
}

export default Pokedex
