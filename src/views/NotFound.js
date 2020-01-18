import React from 'react'
import { Link } from 'react-router-dom'

import './NotFound.css'

const NotFound = props => {
  return (
    <div id="not__found">
    <div className="box tagline">
      <div className="box__title">
        <span className="title--big">Hmmm.</span>
        <span className="title--small">It seems that you have lost in the unknown. Let us help you get back.</span>
      </div>
    </div>
      <div className="box not-found">
        <div className="box__title">
          <span className="title--big">404</span>
          <span className="title--small">Page Not Found</span>
        </div>
        <ul className="box__menu">
          <div className="menu--item">
            <Link to="/">Home</Link>
          </div>
          <div className="menu--item">
            <Link to="/pokedex">Pokedex</Link>
          </div>
        </ul>
      </div>
    </div>
  )
}

export default NotFound
