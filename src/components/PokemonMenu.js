import React, { useState } from 'react'

import menu from '../images/menu.svg'
import home from '../images/home.svg'
import pokedex from '../images/pokedex.svg'

import { Link } from 'react-router-dom'

const PokemonMenu = () => {
  const [classes, setClasses] = useState(false)
  function triggerClick() {
    setClasses(!classes)
  }
  return (
    <div className="pokemon__menu">
      <div className="pokemon__circle main-circle" onClick={triggerClick}>
        <img className="icon" src={menu} alt="menu" />
      </div>
      <Link to="/" onClick={triggerClick} className={`pokemon__circle first-circle ${classes ? 'show' : ''}`}>
        <img className="icon" src={home} alt="home" />
      </Link>
      <Link to="/pokedex" onClick={triggerClick} className={`pokemon__circle second-circle ${classes ? 'show' : ''}`}>
        <img className="icon" src={pokedex} alt="pokedex" />
      </Link>
    </div>
  )
}

export default PokemonMenu
