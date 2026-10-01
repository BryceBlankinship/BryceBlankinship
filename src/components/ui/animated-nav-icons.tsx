'use client'

import { useEffect, useRef, type SVGProps } from 'react'
import { cn } from '@/lib/utils'

export type AnimatedIconProps = SVGProps<SVGSVGElement> & { engaged?: boolean }

const IconSvg = ({ engaged, className, children, ...props }: AnimatedIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    data-engaged={engaged || undefined}
    className={cn('overflow-visible', className)}
    {...props}
  >
    {children}
  </svg>
)

export const BriefcaseIcon = (props: AnimatedIconProps) => (
  <IconSvg {...props}>
    <g className="nav-icon-briefcase">
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </g>
  </IconSvg>
)

export const GraduationCapIcon = (props: AnimatedIconProps) => (
  <IconSvg {...props}>
    <g className="nav-icon-cap">
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path className="nav-icon-cap-tassel" d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </g>
  </IconSvg>
)

// Lucide's Folder and FolderOpen, split into a back panel and a front flap with
// matching command structures so each pair can be interpolated number by number.
const FOLDER_BACK = {
  closed:
    'M4 20A2 2 0 0 1 2 18V5A2 2 0 0 1 4 3H7.93A2 2 0 0 1 9.6 3.9L10.4 5.1A2 2 0 0 0 12.07 6H20A2 2 0 0 1 22 8V10',
  open: 'M4 20A2 2 0 0 1 2 18V5A2 2 0 0 1 4 3H7.9A2 2 0 0 1 9.59 3.9L10.4 5.1A2 2 0 0 0 12.07 6H18A2 2 0 0 1 20 8V10',
}

const FOLDER_FLAP = {
  closed: 'M12.07 6L12.07 6A2 2 0 0 1 12.07 6H20A2 2 0 0 1 22 8L22 18A2 2 0 0 1 20 20H4',
  open: 'M6 14L7.5 11.1A2 2 0 0 1 9.24 10H20A2 2 0 0 1 21.94 12.5L20.4 18.5A2 2 0 0 1 18.45 20H4',
}

const NUMBER = /-?\d*\.?\d+/g

const interpolatePath = (from: string, to: string) => {
  const a = from.match(NUMBER)!.map(Number)
  const b = to.match(NUMBER)!.map(Number)
  return (t: number) => {
    let i = 0
    return to.replace(NUMBER, () => {
      const value = a[i] + (b[i] - a[i]) * t
      i++
      return String(Math.round(value * 1000) / 1000)
    })
  }
}

const backAt = interpolatePath(FOLDER_BACK.closed, FOLDER_BACK.open)
const flapAt = interpolatePath(FOLDER_FLAP.closed, FOLDER_FLAP.open)

// Slight overshoot so the flap settles like it has a little weight
const easeOutBack = (t: number) => {
  const c1 = 1.3
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

const OPEN_MS = 420
const CLOSE_MS = 260

// CSS `d: path()` transitions aren't supported in Safari, so the morph is tweened in JS.
export const FolderIcon = ({ engaged = false, ...props }: AnimatedIconProps) => {
  const backRef = useRef<SVGPathElement>(null)
  const flapRef = useRef<SVGPathElement>(null)
  const progressRef = useRef(0)

  useEffect(() => {
    const target = engaged ? 1 : 0
    const render = (t: number) => {
      progressRef.current = t
      backRef.current?.setAttribute('d', backAt(t))
      flapRef.current?.setAttribute('d', flapAt(t))
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      render(target)
      return
    }

    const from = progressRef.current
    const duration = engaged ? OPEN_MS : CLOSE_MS
    const ease = engaged ? easeOutBack : easeOutCubic
    let frame = 0
    let start: number | undefined

    const step = (now: number) => {
      start ??= now
      const elapsed = Math.min((now - start) / duration, 1)
      render(from + (target - from) * ease(elapsed))
      if (elapsed < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [engaged])

  return (
    <IconSvg engaged={engaged} {...props}>
      <path ref={backRef} d={FOLDER_BACK.closed} />
      <path ref={flapRef} d={FOLDER_FLAP.closed} />
    </IconSvg>
  )
}

export const PhoneIcon = (props: AnimatedIconProps) => (
  <IconSvg {...props}>
    <path
      className="nav-icon-phone"
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
    />
  </IconSvg>
)

export const ChevronDownIcon = (props: AnimatedIconProps) => (
  <IconSvg {...props}>
    <path className="nav-icon-chevron" d="m6 9 6 6 6-6" />
  </IconSvg>
)
