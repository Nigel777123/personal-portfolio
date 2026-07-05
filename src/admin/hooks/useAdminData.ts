import { useState, useCallback } from 'react'

export function useAdminData<T>(key: string, seed: T): {
  data: T
  save: (next: T) => void
  reset: () => void
} {
  const read = (): T => {
    try {
      const raw = localStorage.getItem(key)
      if (raw) return JSON.parse(raw) as T
    } catch {
      // ignore parse errors
    }
    return seed
  }

  const [data, setData] = useState<T>(read)

  const save = useCallback((next: T) => {
    localStorage.setItem(key, JSON.stringify(next))
    setData(next)
  }, [key])

  const reset = useCallback(() => {
    localStorage.removeItem(key)
    setData(seed)
  }, [key, seed])

  return { data, save, reset }
}
