'use client'

import { useEffect, useRef, type ComponentProps } from 'react'

import { cn } from '@/lib/utils'

const TOP_OFFSET = 96
const BOTTOM_OFFSET = 24

// Only pin a sidebar that fits below the navbar. Taller sidebars scroll
// naturally so their top isn't pinned behind the navbar and all content is reachable.
export const StickySidebar = ({ className, style, ...props }: ComponentProps<'aside'>) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const update = () => {
      const fits = element.offsetHeight + TOP_OFFSET + BOTTOM_OFFSET <= window.innerHeight
      element.style.position = fits ? 'sticky' : 'static'
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
      className={cn('sticky self-start z-0', className)}
      style={{ top: TOP_OFFSET, ...style }}
      {...props}
    />
  )
}
