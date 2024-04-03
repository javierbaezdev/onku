import { useAppStore } from '@/store'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const useRedirect = () => {
  const navigate = useNavigate()
  const currentRoute = useAppStore((store) => store.currentRoute)
  const setCurrentRouteStore = useAppStore((store) => store.setCurrentRoute)

  const redirect = (route: string) => {
    navigate(route)
  }

  const setCurrentRoute = (route: string) => {
    setCurrentRouteStore(route)
  }

  useEffect(() => {
    if (currentRoute) {
      redirect(currentRoute)
    }
  }, [currentRoute])

  return { setCurrentRoute }
}

export default useRedirect
