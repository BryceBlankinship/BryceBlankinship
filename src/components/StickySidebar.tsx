'use client'

import { useEffect, useRef, type ComponentProps } from 'react'

import { cn } from '@/lib/utils'

const TOP_OFFSET = 96
const BOTTOM_OFFSET = 24

// A sticky element taller than the viewport can never reveal its bottom, so
// when the sidebar doesn't fit it pins by its bottom edge instead of its top.
export const StickySidebar = ({ className, style, ...props }: ComponentProps<'aside'>) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const update = () => {
      const fitTop = window.innerHeight - element.offsetHeight - BOTTOM_OFFSET
      element.style.top = `${Math.min(TOP_OFFSET, fitTop)}px`
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(element)
    window.addEventListener('resize', update)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <aside
      ref={ref}
      className={cn('sticky self-start', className)}
      style={{ top: TOP_OFFSET, ...style }}
      {...props}
    />
  )
}
