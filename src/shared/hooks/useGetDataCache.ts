import { useQueryClient } from 'react-query'

const useGetDataCache = (keyToSearch: string) => {
  const queryClient = useQueryClient()
  const queryCache = queryClient.getQueryCache()

  if (queryCache) {
    const find = queryCache?.getAll()?.find((q) => q?.queryKey[0] === keyToSearch)

    if (find) {
      return find.state.data
    }
  }

  return null
}

export default useGetDataCache
