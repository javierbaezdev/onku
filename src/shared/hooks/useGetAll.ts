import { useQuery, type UseQueryResult } from 'react-query'
import ApiService, { type EndPoint, type GetAllProps } from '@/services/Api'
import { type AdapterData, type Key } from '@/shared/types/fetch'

interface UseGetAllProps<T, R> {
  key?: Key
  getAllProps: GetAllProps
  queryConfig?: any
  adapterData?: AdapterData<T, R>
}

interface FetchAllItemsProps<T, R> extends GetAllProps {
  adapterData?: AdapterData<T, R>
}

interface AdapterGetAllProps {
  key?: Key
  endPoint: EndPoint
}
const adapterParamsGetAll = ({ key, endPoint }: AdapterGetAllProps) => {
  const formatKey = key || endPoint

  return {
    formatKey,
  }
}

async function fetchAllItems<T, R>({
  endPoint,
  queries,
  adapterData,
}: FetchAllItemsProps<T, R>): Promise<R[]> {
  try {
    const data = await ApiService.getAll({
      endPoint,
      queries,
    })
    return adapterData ? adapterData(data) : data
  } catch (error) {
    throw new Error('No se pudieron cargar los elementos.')
  }
}

export default function useGetAll<T, R>({
  key,
  getAllProps,
  queryConfig,
  adapterData,
}: UseGetAllProps<T, R>): UseQueryResult<R> {
  const { endPoint } = getAllProps
  const { formatKey } = adapterParamsGetAll({
    key,
    endPoint,
  })

  const formatGetAllProps: FetchAllItemsProps<T, R> = {
    ...getAllProps,
    adapterData,
    endPoint,
  }

  const queryKey = [formatKey, formatGetAllProps]

  return useQuery(
    queryKey,
    async () => await fetchAllItems(formatGetAllProps),
    queryConfig,
  )
}
