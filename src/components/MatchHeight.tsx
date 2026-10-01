'use client'

import { useEffect } from 'react'

function visibleById(id: string) {
  return [...document.querySelectorAll<HTMLElement>(`#${CSS.escape(id)}`)].find(
    (element) => element.getClientRects().length > 0
  )
}

// Keeps the blog card the same height as education on desktop so the two
// cards share a top and bottom edge when the sticky sidebar reaches the end.
export const MatchHeight = ({
  sourceId,
  targetId,
}: {
  sourceId: string
  targetId: string
}) => {
  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)')

    const apply = () => {
      const targets = [...document.querySelectorAll<HTMLElement>(`#${CSS.escape(targetId)}`)]
      const source = visibleById(sourceId)
      const height = media.matches && source ? `${source.getBoundingClientRect().height}px` : ''

      targets.forEach((target) => {
        target.style.minHeight = height && target.getClientRects().length > 0 ? height : ''
      })
    }

    apply()

    const observer = new ResizeObserver(apply)
    document.querySelectorAll<HTMLElement>(`#${CSS.escape(sourceId)}`).forEach((element) => {
      observer.observe(element)
    })

    media.addEventListener('change', apply)
    window.addEventListener('resize', apply)

    return () => {
      observer.disconnect()
      media.removeEventListener('change', apply)
      window.removeEventListener('resize', apply)
      document.querySelectorAll<HTMLElement>(`#${CSS.escape(targetId)}`).forEach((target) => {
        target.style.minHeight = ''
      })
    }
  }, [sourceId, targetId])

  return null
}
