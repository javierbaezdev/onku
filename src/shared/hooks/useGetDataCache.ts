import { useMemo } from 'react'
import { useQueryClient } from 'react-query'

const useGetDataCache = (keyToSearch: string) => {
  const queryClient = useQueryClient()
  /* const queryCache = queryClient.getQueryCache() */

  const cachedQueries = useMemo(() => {
    const queryCache = queryClient.getQueryCache()
    if (queryCache) {
      return queryCache.getAll()
    }
    return []
  }, [queryClient])

  const cachedData = useMemo(() => {
    const find = cachedQueries.find((q) => q?.queryKey[0] === keyToSearch)
    if (find) {
      return find.state.data
    }
    return undefined
  }, [cachedQueries, keyToSearch])

  /* if (queryCache) {
    const find = queryCache
      ?.getAll()
      ?.find((q) => q?.queryKey[0] === keyToSearch)

    if (find) {
      return find.state.data
    }
  } */

  return cachedData
}

export default useGetDataCache
