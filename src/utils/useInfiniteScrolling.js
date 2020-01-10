import { useState, useEffect } from 'react'

const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false)
  let timeout

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
    clearTimeout(timeout)
    if (window.innerHeight + document.documentElement.scrollTop >= (document.documentElement.offsetHeight - 10) || isFetching) {
      timeout = setTimeout(() => {
        setIsFetching(true)
      }, 2000)
    }
    return
  }

  return [isFetching, setIsFetching]
}

export default useInfiniteScroll
