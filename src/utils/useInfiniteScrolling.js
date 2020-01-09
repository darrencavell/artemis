import { useState, useEffect } from 'react'

const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    console.log('useEffect ', isFetching)
    if (isFetching)
      callback()
    return
  }, [isFetching])

  function handleScroll() {
    // console.log(window.innerHeight, document.documentElement.scrollTop === document.documentElement.offsetHeight)
    console.log('current: ', window.innerHeight + document.documentElement.scrollTop)
    console.log('goal: ', document.documentElement.offsetHeight)
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight || isFetching) {
      console.log('set is fetching called', isFetching)
      setIsFetching(true)
    }
    return
  }

  return [isFetching, setIsFetching]
}

export default useInfiniteScroll
