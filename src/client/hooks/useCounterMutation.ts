import { useMutation } from '@tanstack/react-query'

import { BASE_PATH } from '../../config'
import queryClient from '../util/queryClient'
import { queryKey } from './useCounter'

export const useIncrementMutation = () => {
  const mutationFn = async () => {
    const res = await fetch(`${BASE_PATH}/api/counter/increment`, {
      method: 'POST',
    })

    const value = await res.json()

    return value
  }

  const mutation = useMutation(mutationFn, {
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey,
      }),
  })

  return mutation
}

export const useDecrementMutation = () => {
  const mutationFn = async () => {
    const res = await fetch(`${BASE_PATH}/api/counter/decrement`, {
      method: 'POST',
    })

    return res
  }

  const mutation = useMutation(mutationFn, {
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey,
      }),
  })

  return mutation
}
