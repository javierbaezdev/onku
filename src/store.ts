import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface BaseState {}

interface State extends BaseState {}

const initialValues = {}

export const useAppStore = create<State>()(
  devtools(
    persist(
      () => {
        return {
          ...initialValues,
        }
      },
      {
        name: 'onkuStore',
      }
    )
  )
)
