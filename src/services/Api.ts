import axios from '@/config/axios/Axios'
import formatQuery, { type QueryObject } from './helpers'

export type EndPoint = string
export type Id = string | number

export interface Base {
  endPoint: EndPoint
  contentType?: string
}

export interface GetAllProps extends Base {
  queries?: QueryObject
}

export interface GetOneProps extends Base {
  id: Id
}

export interface RemoveOneProps extends GetOneProps {}

const getAll = async ({ endPoint, queries }: GetAllProps) => {
  const queryObj = formatQuery(queries)

  try {
    const { data } = await axios.get(`${endPoint}`, { params: queryObj })

    return data
  } catch (error) {
    return await Promise.reject(error)
  }
}

const getOne = async ({ endPoint, id }: GetOneProps) => {
  try {
    const { data } = await axios.get(`${endPoint}/${id}`)
    return data
  } catch (error) {
    return await Promise.reject(error)
  }
}

const ApiService = {
  getAll,
  getOne,
}
export default ApiService
