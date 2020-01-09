import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'

import PokemonStore from '../stores/PokemonStore'
import { colorByPokemonType } from '../utils'
import { fetchPokemonDetail } from '../actions/PokemonAction'

import './Detail.css'

const Detail = props => {
  const { searchedPokemon } = props.match.params
  const [isFetching, setIsFetching] = useState(false)
  const [pokemonDetail, setPokemonDetail] = useState({})

  function updateFromStore() {
    setPokemonDetail(PokemonStore.getPokemonDetail())
    setIsFetching(true)
  }
  useEffect(() => {
    fetchPokemonDetail({ searchedPokemon })
    PokemonStore.on('change', updateFromStore)
    return () => {
      PokemonStore.removeListener('change', updateFromStore)
    }
  }, [])
  if(isFetching) {
    const { types } = pokemonDetail
    return (
      <div id="detail">
        <div className="headliner column" style={{ background: colorByPokemonType(types[types.length - 1].type.name) }}>
          <Link to="/" className="backsider">
            <span>←</span>
          </Link>
          <div className="pokemon__image">
            <img src={pokemonDetail.sprites.front_default} />
          </div>
          <div className="pokemon__description">
            <div>{pokemonDetail.name}</div>
            <div className="pokemon__types">
              {
                pokemonDetail.types.map(t => t.type.name).map(type => {
                  return (
                    <div key={`${name}-${type}`} className="pokemon__type" style={{ background: colorByPokemonType(type), color: 'white' }}>{type}</div>
                  )
                })
              }
            </div>
          </div>
        </div>

        {
          pokemonDetail.stats && pokemonDetail.stats.map(s => {
            return (
              <div key={`${pokemonDetail.name}-${s.stat.name}`}>
                <span>{s.stat.name}</span>
                <span>{s.base_stat}</span>
              </div>
            )
          })
        }
        <div className="headliner-content">
          <div>
            <span>Height</span>
            <span>{pokemonDetail.height}</span>
          </div>
          <div>
            <span>Weight</span>
            <span>{pokemonDetail.weight}</span>
          </div>
        </div>
      </div>
    )
  }
  return ''
}

export default Detail