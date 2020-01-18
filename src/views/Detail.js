import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'

import PokemonType from '../components/PokemonType'
import PokemonImage from '../components/PokemonImage'
import PokemonModal from '../components/PokemonModal'
import PokemonButton from '../components/PokemonButton'

import PokemonStore from '../stores/PokemonStore'
import { colorTransform, colorByPokemonType } from '../utils'
import { fetchPokemonDetail, tamePokemon } from '../actions/PokemonAction'

import './Detail.css'

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
    const { pokemonDetail, isButtonClicked, setIsButtonClicked, types } = props
    const [name, setName] = useState('')
    const color = colorTransform(colorByPokemonType(types[types.length - 1].type.name), 20)

    return isButtonClicked ? (
      <PokemonModal id="modal">
        <div className="pokemon__catch">
          <div className="pokemon__dialayer" onClick={() => setIsButtonClicked(false)}></div>
          <div className="pokemon__dialog">
            {isCaught ? (
              <>
                <div className="pokemon__diatitle" style={{ color }}>Pokemon is caught...</div>
                <label className="pokemon__dialabel">Pokemon Nickname</label>
                <input className="pokemon__diainput" onChange={e => setName(e.target.value)}></input>
              </>
            ) : (
              <>
                <div className="pokemon__diatitle" style={{ color }}>UH OH!</div>
                <div className="pokemon__diatitle">Pokemon failed to catch...</div>
              </>
            )}
            <PokemonButton
              color={color}
              callback={() => isCaught
                ? (tamePokemon({ detail: pokemonDetail, nickname: name, catch_date: new Date().getTime() }), setIsButtonClicked(false))
                : setIsButtonClicked(false)}>
                OK
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
      setIsCaught(true)
    } else {
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
              <svg data-icon="arrow-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path></svg>
            </Link>
            <div className="pokemon__name">{name}</div>
            <div className="pokemon__types">
              <PokemonType
                types={types} />
            </div>
          </div>
          <PokemonImage
            src={sprites.front_default} />
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
            pokemonDetail={pokemonDetail}
            isButtonClicked={isButtonClicked}
            setIsButtonClicked={setIsButtonClicked} />
          <PokemonButton
            color={colorTransform(colorByPokemonType(types[types.length - 1].type.name), 20)}
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