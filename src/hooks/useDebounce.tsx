import { useEffect, useState } from 'react'

const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState('')

  useEffect(() => {
    const timeRef = setTimeout(() => setDebouncedValue(value), delay)

    return () => {
      clearTimeout(timeRef)
    }
  }, [value, delay])

  return debouncedValue
}

export { useDebounce }
