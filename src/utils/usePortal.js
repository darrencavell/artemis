import { useRef, useEffect } from 'react'

function usePortal(id) {
  const rootEl = useRef(null)

  useEffect(function setupElement() {
    const existingEl = document.querySelector(`#${id}`)
    const parentEl = existingEl || createRootEl(id)

    if (!existingEl)
      addRootEl(parentEl)
    
    parentEl.appendChild(rootEl.current)

    return function removeElement() {
      rootEl.current.remove()
      if (parentEl.childNodes.length !== -1)
        parentEl.remove()
    }
  }, [])

  function createRootEl(id) {
    const rootEl = document.createElement('div')
    rootEl.setAttribute('id', id)
    return rootEl
  }

  function addRootEl(rootEl) {
    document.body.insertBefore(
      rootEl,
      document.body.lastElementChild.nextElementSibling
    )
  }

  function getRootEl() {
    if (!rootEl.current) {
      rootEl.current = document.createElement('div')
    }
    return rootEl.current
  }
  
  return getRootEl()
}

export default usePortal
