import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'

import PokemonType from '../components/PokemonType'
import PokemonImage from '../components/PokemonImage'
import PokemonModal from '../components/PokemonModal'

import PokemonStore from '../stores/PokemonStore'
import { colorByPokemonType } from '../utils'
import { fetchPokemonDetail } from '../actions/PokemonAction'

import './Detail.css'
import PokemonButton from '../components/PokemonButton'

const Detail = props => {
  const { searchedPokemon } = props.match.params
  const [isFetching, setIsFetching] = useState(false)
  const [pokemonDetail, setPokemonDetail] = useState({})
  const [isButtonClicked, setIsButtonClicked] = useState(false)
  const [isCaught, setIsCaught] = useState(false)

  useEffect(() => {
    fetchPokemonDetail({ searchedPokemon })
    PokemonStore.on('change', updateFromStore)
    return () => {
      PokemonStore.removeListener('change', updateFromStore)
    }
  }, [])
  function updateFromStore() {
    setPokemonDetail(PokemonStore.getPokemonDetail())
    setIsFetching(true)
  }

  const PokemonStatus = props => {
    const { name, stats } = props

    return (
      <div className="statser">
        {
          stats.map(s => {
            const statname = {
              speed: 'Speed',
              'special-defense': 'Sp. Def',
              'special-attack': 'Sp. Atk',
              defense: 'Defense',
              attack: 'Attack',
              hp: 'Hp'
            }
            return (
              <div key={`${name}-${s.stat.name}`} className="pokemon__status">
                <span className="pokemon__statname">{statname[s.stat.name]}</span>
                <span className="pokemon__statvalue">{s.base_stat}</span>
                <div className="pokemon__statprogress">
                  <div style={{ height: 'inherit', width: `${s.base_stat / 1.5}%`, backgroundColor: 'red' }}></div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }

  const PokemonAbout = props => {
    const { height, weight, abilities } = props

    return (
      <div className="abouters">
        <div className="pokemon__status">
          <span className="pokemon__statname">Height</span>
          <span className="pokemon__statvalue">{height} cm</span>
        </div>
        <div className="pokemon__status">
          <span className="pokemon__statname">Weight</span>
          <span className="pokemon__statvalue">{weight} kg</span>
        </div>
        <div className="pokemon__status">
          <span className="pokemon__statname">Abilities</span>
          <span className="pokemon__statvalue">{abilities.map(a => `${a.ability.name.charAt(0).toUpperCase()}${a.ability.name.substring(1)}`).join(', ')}</span>
        </div>
      </div>
    )
  }

  const PokemonCatch = props => {
    const { isButtonClicked, setIsButtonClicked, types } = props

    return isButtonClicked ? (
      <PokemonModal id="modal">
        <div className="pokemon__catch">
          <div className="pokemon__dialayer" onClick={() => setIsButtonClicked(false)}></div>
          <div className="pokemon__dialog">
            <div className="pokemon__diatitle">{ isCaught ? 'Pokemon is caught...' : 'Pokemon failed to catch...'}</div>
            <label className="pokemon__dialabel">Pokemon Nickname</label>
            <input className="pokemon__diainput"></input>
            <PokemonButton
              types={types}
              callback={() => {}}>
                Save
            </PokemonButton>
          </div>
        </div>
      </PokemonModal>
    ) : ''
  }

  function catchPokemon() {
    setIsButtonClicked(true)
    const chances = Math.random()
    
    if (chances <= 0.5) {
      console.log('Pokemon is caught...')
      setIsCaught(true)
    } else {
      console.log('Pokemon failed to catch...')
      setIsCaught(false)
    }
  }

  if (isFetching) {
    const { name, types, sprites, stats, height, weight, abilities } = pokemonDetail
    return (
      <div id="detail">
        <div className="headliner column" style={{ background: colorByPokemonType(types[types.length - 1].type.name) }}>
          <div className="pokemon__description">
            <Link to="/" className="backsider">
              <span>←</span>
            </Link>
            <div className="pokemon__name">{name}</div>
            <div className="pokemon__types">
              <PokemonType
                types={types} />
            </div>
          </div>
          <PokemonImage
            sprites={sprites} />
        </div>
        <div className="container">
          <PokemonStatus
            name={name}
            stats={stats} />
          <PokemonAbout
            height={height}
            weight={weight}
            abilities={abilities} />
          <PokemonCatch
            types={types}
            isButtonClicked={isButtonClicked}
            setIsButtonClicked={setIsButtonClicked} />
          <PokemonButton
            types={types}
            callback={catchPokemon}>
              Catch Now!
          </PokemonButton>
        </div>
      </div>
    )
  }
  return ''
}

export default Detail