import { useQuery } from '@tanstack/react-query'

import { BASE_PATH } from '../../config'
import { Counter } from '../../types'

export const queryKey = ['counter']

const useCounter = () => {
  const queryFn = async (): Promise<Counter> => {
    const res = await fetch(`${BASE_PATH}/api/counter`)

    const data = await res.json()

    return data
  }

  const { data: counter, ...rest } = useQuery(queryKey, queryFn)

  return { counter, ...rest }
}

export default useCounter
