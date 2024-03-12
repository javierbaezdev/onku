import { useState } from 'react'

const useAllData = (initialValue: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initialValue)

  const onToggle = () => {
    setIsOpen((prev) => !prev)
  }

  const onClose = () => {
    setIsOpen(false)
  }

  const onOpen = () => {
    setIsOpen(true)
  }

  return { isOpen, onToggle, onOpen, onClose }
}

export default useAllData
