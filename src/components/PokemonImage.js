import React, {
  useRef,
  // useEffect
} from 'react'

const PokemonImage = props => {
  const {
    // isLazy,
    // observer,
    src
  } = props
  const imageRef = useRef()

  // if (isLazy) {
  //   useEffect(() => {
  //     const { current } = imageRef
  //     if (observer) {
  //       observer.observe(current)
  //     }
  //     return () => {
  //       observer.unobserve(current)
  //     }
  //   }, [observer])
  // }

  return (
    <div className="pokemon__image">
      {/* <img ref={imageRef} src={isLazy ? '' : src} data-src={src} alt={src.toString()} /> */}
      <img src={src} alt={src.toString()} />
    </div>
  )
}

export default PokemonImage
