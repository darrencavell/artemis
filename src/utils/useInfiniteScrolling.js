import { useState, useEffect } from 'react'

const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isFetching)
      callback()
    return
  }, [isFetching])

  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop >= (document.documentElement.offsetHeight - 10) || isFetching) {
      setIsFetching(true)
    }
    return
  }

  return [isFetching, setIsFetching]
}

export default useInfiniteScroll
