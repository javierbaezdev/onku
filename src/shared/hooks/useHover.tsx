import { useState } from 'react'

const useHover = (initialValue: boolean = false) => {
  const [isHover, setIsHover] = useState(initialValue)

  const onEnter = () => {
    setIsHover(true)
  }

  const onLeave = () => {
    setIsHover(false)
  }

  return { isHover, onEnter, onLeave }
}

export default useHover
