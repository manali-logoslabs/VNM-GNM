import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function AnimatedCounter({ from = 0, to = 0, duration = 2, prefix = '', suffix = '', delay = 0 }) {
  const [count, setCount] = useState(from)
  const nodeRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true

          const startTime = Date.now() + delay * 1000
          const animate = () => {
            const now = Date.now()
            const elapsed = Math.max(0, (now - startTime) / 1000)
            const progress = Math.min(1, elapsed / duration)

            if (progress < 1) {
              setCount(Math.floor(from + (to - from) * progress))
              requestAnimationFrame(animate)
            } else {
              setCount(to)
            }
          }

          if (delay > 0) {
            setTimeout(() => requestAnimationFrame(animate), delay * 1000)
          } else {
            requestAnimationFrame(animate)
          }
        }
      },
      { threshold: 0.1 }
    )

    if (nodeRef.current) {
      observer.observe(nodeRef.current)
    }

    return () => {
      if (nodeRef.current) {
        observer.unobserve(nodeRef.current)
      }
    }
  }, [from, to, duration, delay])

  return (
    <motion.div
      ref={nodeRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      {prefix}
      {count.toLocaleString('en-IN')}
      {suffix}
    </motion.div>
  )
}
