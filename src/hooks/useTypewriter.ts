import { useState, useEffect, useRef } from 'react'

interface UseTypewriterOptions {
  text: string
  speed?: number
  delay?: number
  onComplete?: () => void
}

export function useTypewriter({
  text,
  speed = 30,
  delay = 0,
  onComplete,
}: UseTypewriterOptions) {
  const [displayed, setDisplayed] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const indexRef = useRef(0)

  useEffect(() => {
    setDisplayed('')
    setIsComplete(false)
    indexRef.current = 0

    const delayTimer = setTimeout(() => {
      const interval = setInterval(() => {
        if (indexRef.current < text.length) {
          indexRef.current++
          setDisplayed(text.slice(0, indexRef.current))
        } else {
          clearInterval(interval)
          setIsComplete(true)
          onComplete?.()
        }
      }, speed)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(delayTimer)
  }, [text, speed, delay])

  const skip = () => {
    setDisplayed(text)
    setIsComplete(true)
    onComplete?.()
  }

  return { displayed, isComplete, skip }
}
