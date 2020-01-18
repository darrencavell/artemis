import React, { useState, useEffect, useRef } from 'react'

import { colorTransform } from '../utils/index'

const PokemonButton = props => {
  const {
    children,
    color,
    callback
  } = props
  const [hover, setHover] = useState(false)
  let [style, setStyle] = useState({
    color: 'white',
    backgroundColor: color
  })

  function onHover() {
    setHover(!hover)
  }

  useEffect(() => {
    if (hover) {
      setStyle(prevState => ({ ...prevState, backgroundColor: colorTransform(color, 20) }))
    } else {
      setStyle(prevState => ({ ...prevState, backgroundColor: color }))
    }
  }, [hover])

  return (
    <button
      className="pokemon__button"
      style={style}
      onClick={callback}
      onMouseEnter={onHover}
      onMouseLeave={onHover}>{children}</button>
  )
}

export default PokemonButton
