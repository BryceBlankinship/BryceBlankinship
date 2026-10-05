'use client'

import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect, useCallback, type ComponentType } from 'react'
import { Mail, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LiquidGlassRefraction } from '@/components/ui/liquid-glass-refraction'
import {
  BriefcaseIcon,
  ChevronDownIcon,
  FolderIcon,
  GraduationCapIcon,
  PhoneIcon,
  type AnimatedIconProps,
} from '@/components/ui/animated-nav-icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type NavItem = {
  name: string
  icon: ComponentType<AnimatedIconProps>
  sectionId: string
}

const navItems: NavItem[] = [
  {
    name: 'Experience',
    sectionId: 'experience',
    icon: BriefcaseIcon,
  },
  {
    name: 'Projects',
    sectionId: 'projects',
    icon: FolderIcon,
  },
  {
    name: 'Education',
    sectionId: 'education',
    icon: GraduationCapIcon,
  },
]

const LABEL_ANIMATION_MS = 280
const INDICATOR_POP_MS = 320
// How long scrolling must stay idle before the scroll spy may move the pill again.
const SCROLL_IDLE_MS = 200
// Slightly overdamped so the pill glides for about a third of a second and stops
// on the tab instead of coasting past it.
const PILL_STIFFNESS = 480
const PILL_DAMPING = 2 * Math.sqrt(PILL_STIFFNESS) * 1.2

export const Navbar = () => {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const navRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const navContainerRef = useRef<HTMLDivElement>(null)
  const [buttonWidth, setButtonWidth] = useState<number | undefined>(undefined)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const navRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})
  const indicatorRef = useRef<HTMLDivElement>(null)
  const pillMotionRef = useRef({ x: 0, w: 0, vx: 0, vw: 0, placed: false })
  // True while a nav click's smooth scroll is still in progress.
  const programmaticScrollRef = useRef(false)
  const scrollIdleTimerRef = useRef<number | undefined>(undefined)
  // True while the pill glide is running. Scroll-spy updates wait until it settles.
  const pillMovingRef = useRef(false)
  const pendingSectionRef = useRef<{ id: string | null } | null>(null)
  const applyScrollSectionRef = useRef<() => void>(() => {})
  const popTimeoutRef = useRef<number | undefined>(undefined)
  const releaseProgrammaticScroll = useCallback(() => {
    window.clearTimeout(scrollIdleTimerRef.current)
    if (!programmaticScrollRef.current) return
    programmaticScrollRef.current = false
    applyScrollSectionRef.current()
  }, [])
  const bumpProgrammaticScroll = useCallback(() => {
    programmaticScrollRef.current = true
    window.clearTimeout(scrollIdleTimerRef.current)
    scrollIdleTimerRef.current = window.setTimeout(releaseProgrammaticScroll, SCROLL_IDLE_MS)
  }, [releaseProgrammaticScroll])
  // Like iOS, the selection swells into a clear glass lens while it travels to a tapped tab.
  const popIndicator = useCallback(() => {
    const indicator = indicatorRef.current
    if (!indicator) return

    const surface = indicator.querySelector<HTMLElement>('.apple-liquid-nav-indicator-surface')
    window.clearTimeout(popTimeoutRef.current)
    delete indicator.dataset.popped
    if (surface) surface.style.animation = 'none'

    requestAnimationFrame(() => {
      if (!indicator.isConnected) return
      if (surface) surface.style.animation = ''
      indicator.dataset.popped = ''
      popTimeoutRef.current = window.setTimeout(() => {
        delete indicator.dataset.popped
      }, INDICATOR_POP_MS)
    })
  }, [])
  useEffect(() => () => window.clearTimeout(popTimeoutRef.current), [])
  const getVisibleSectionElement = useCallback((sectionId: string) => {
    const matchingSections = Array.from(
      document.querySelectorAll<HTMLElement>(`#${sectionId}`)
    )

    if (!matchingSections.length) {
      return null
    }

    // The page renders separate mobile and desktop layouts, so a section id can
    // match a hidden copy; only the copy in the current layout counts.
    return (
      matchingSections.find((element) => element.getClientRects().length > 0) ?? null
    )
  }, [])
  // Distance from the viewport top where a section lands after a nav click
  const getSectionOffset = useCallback(() => {
    const navRect = navContainerRef.current?.getBoundingClientRect()
    const navAnchoredBottom = navRect ? navRect.top > window.innerHeight / 2 : false
    const spacing = 16
    return navAnchoredBottom
      ? spacing
      : Math.max((navRect?.height ?? 0) + (navRect?.top ?? 0) + spacing, spacing)
  }, [])
  const scrollToSection = useCallback(
    (sectionId: string) => {
      if (!isHomePage) return

      const targetSection = getVisibleSectionElement(sectionId)

      if (!targetSection) return

      popIndicator()

      // Hold the clicked tab until this smooth scroll goes idle, so the spy
      // can't pull the pill back through the sections it passes.
      pendingSectionRef.current = null
      bumpProgrammaticScroll()
      setActiveSection(sectionId)

      const targetPosition =
        window.scrollY + targetSection.getBoundingClientRect().top - getSectionOffset()

      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: 'smooth',
      })
    },
    [bumpProgrammaticScroll, getSectionOffset, getVisibleSectionElement, isHomePage, popIndicator]
  )

  // iOS browser chrome can shift the visible viewport without moving the
  // layout viewport that position: fixed uses. Keep the mobile bar in view.
  useEffect(() => {
    if (!isHomePage) return

    const nav = navRef.current
    const viewport = window.visualViewport
    if (!nav || !viewport) return

    let frame = 0
    const updateTop = () => {
      frame = 0
      // Let the browser handle positioning normally during pinch zoom.
      const top = viewport.scale === 1 ? Math.max(0, viewport.offsetTop) : 0
      nav.style.setProperty('--nav-viewport-top', `${top}px`)
    }
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateTop)
    }

    updateTop()
    viewport.addEventListener('resize', scheduleUpdate, { passive: true })
    viewport.addEventListener('scroll', scheduleUpdate, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      viewport.removeEventListener('resize', scheduleUpdate)
      viewport.removeEventListener('scroll', scheduleUpdate)
      nav.style.removeProperty('--nav-viewport-top')
    }
  }, [isHomePage])

  useEffect(() => {
    const updateWidth = () => {
      if (wrapperRef.current) {
        setButtonWidth(wrapperRef.current.offsetWidth)
      }
    }
    
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  // Track scroll position to update active section
  useEffect(() => {
    if (!isHomePage) return

    let frame = 0

    // The active section is the last one whose top has scrolled past the point
    // where nav clicks land. Sections near the end of the page can't scroll
    // that far, so reaching the bottom activates the last section.
    const readScrollSection = () => {
      const sections = navItems.flatMap((item) => {
        const element = getVisibleSectionElement(item.sectionId)
        return element ? [{ id: item.sectionId, element }] : []
      })

      if (!sections.length) return null

      const documentHeight = document.documentElement.scrollHeight
      if (window.scrollY + window.innerHeight >= documentHeight - 2) {
        return sections[sections.length - 1].id
      }

      const activationLine = getSectionOffset() + 16
      let current: string | null = null
      for (const { id, element } of sections) {
        if (element.getBoundingClientRect().top <= activationLine) current = id
      }
      return current
    }

    const publishSection = (id: string | null) => {
      // The pill keeps its current glide. The latest section is applied once it stops.
      if (pillMovingRef.current) {
        pendingSectionRef.current = { id }
        return
      }
      pendingSectionRef.current = null
      setActiveSection(id)
    }

    const updateActiveSection = () => {
      frame = 0
      if (programmaticScrollRef.current) return
      publishSection(readScrollSection())
    }
    applyScrollSectionRef.current = updateActiveSection

    const scheduleUpdate = () => {
      if (programmaticScrollRef.current) {
        bumpProgrammaticScroll()
        return
      }
      if (!frame) frame = requestAnimationFrame(updateActiveSection)
    }

    const onScrollEnd = () => {
      // Keep the lock through the end of the gesture, then let the idle timer release it.
      if (programmaticScrollRef.current) bumpProgrammaticScroll()
    }

    // Initial check
    updateActiveSection()

    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('scrollend', onScrollEnd)
    window.addEventListener('resize', scheduleUpdate, { passive: true })
    const viewport = window.visualViewport
    viewport?.addEventListener('resize', scheduleUpdate, { passive: true })
    viewport?.addEventListener('scroll', scheduleUpdate, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      programmaticScrollRef.current = false
      window.clearTimeout(scrollIdleTimerRef.current)
      applyScrollSectionRef.current = () => {}
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('scrollend', onScrollEnd)
      window.removeEventListener('resize', scheduleUpdate)
      viewport?.removeEventListener('resize', scheduleUpdate)
      viewport?.removeEventListener('scroll', scheduleUpdate)
    }
  }, [bumpProgrammaticScroll, getSectionOffset, getVisibleSectionElement, isHomePage])

  // Move the selection pill. Desktop tabs are a fixed size, so one spring runs
  // without reading layout again. Mobile labels expand and collapse, so the pill
  // tracks the active button directly until that layout animation finishes.
  useEffect(() => {
    const motion = pillMotionRef.current
    const indicator = indicatorRef.current
    let frame = 0

    if (!activeSection) {
      motion.x = 0
      motion.w = 0
      motion.vx = 0
      motion.vw = 0
      motion.placed = false
      pillMovingRef.current = false
      pendingSectionRef.current = null
      return
    }

    if (!indicator) return

    const readTarget = () => {
      const activeButton = activeSection ? navRefs.current[activeSection] : null
      if (!activeButton) return null

      const container = activeButton.parentElement
      if (!container) return null

      const containerRect = container.getBoundingClientRect()
      const buttonRect = activeButton.getBoundingClientRect()
      return {
        x: buttonRect.left - containerRect.left,
        w: buttonRect.width,
      }
    }

    const write = (x: number, w: number) => {
      indicator.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`
      indicator.style.width = `${Math.max(0, w).toFixed(2)}px`
    }

    const snap = (x: number, w: number) => {
      motion.x = x
      motion.w = w
      motion.vx = 0
      motion.vw = 0
      motion.placed = true
      write(x, w)
    }

    // Scroll-spy changes that arrived during this glide are applied once it stops,
    // so the pill can't be pulled backward mid-travel.
    const endMovement = () => {
      pillMovingRef.current = false
      if (programmaticScrollRef.current) return
      const pending = pendingSectionRef.current
      if (!pending || pending.id === activeSection) {
        pendingSectionRef.current = null
        return
      }
      pendingSectionRef.current = null
      setActiveSection(pending.id)
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const labelsAnimate =
      window.matchMedia('(max-width: 639px)').matches && !reduceMotion
    const target = readTarget()

    if (!target) {
      motion.vw = 0
      motion.w = 0
      write(motion.x, 0)
      endMovement()
    } else if (labelsAnimate) {
      pillMovingRef.current = true
      const start = performance.now()
      const follow = (now: number) => {
        const next = readTarget()
        if (next) snap(next.x, next.w)
        if (now - start < LABEL_ANIMATION_MS + 40) {
          frame = requestAnimationFrame(follow)
        } else {
          endMovement()
        }
      }
      frame = requestAnimationFrame(follow)
    } else if (reduceMotion || !motion.placed) {
      snap(target.x, target.w)
      endMovement()
    } else {
      pillMovingRef.current = true
      // Start this glide from rest so a new tab can't sling the pill backward.
      motion.vx = 0
      motion.vw = 0
      let last = performance.now()
      const step = (now: number) => {
        let remaining = Math.min(0.032, (now - last) / 1000)
        last = now

        while (remaining > 0) {
          const h = Math.min(remaining, 0.008)
          const ax = PILL_STIFFNESS * (target.x - motion.x) - PILL_DAMPING * motion.vx
          const aw = PILL_STIFFNESS * (target.w - motion.w) - PILL_DAMPING * motion.vw
          motion.vx += ax * h
          motion.vw += aw * h
          motion.x += motion.vx * h
          motion.w += motion.vw * h
          remaining -= h
        }

        const dx = target.x - motion.x
        const dw = target.w - motion.w
        if (Math.hypot(dx, dw) < 0.75 && Math.hypot(motion.vx, motion.vw) < 40) {
          snap(target.x, target.w)
          endMovement()
          return
        }

        write(motion.x, motion.w)
        frame = requestAnimationFrame(step)
      }
      frame = requestAnimationFrame(step)
    }

    const handleResize = () => {
      cancelAnimationFrame(frame)
      const next = readTarget()
      if (next) snap(next.x, next.w)
      else write(motion.x, 0)
      endMovement()
    }

    window.addEventListener('resize', handleResize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', handleResize)
    }
  }, [activeSection])

  // Only show navigation on home page
  if (!isHomePage) {
    return null
  }

  return (
    <nav
      ref={navRef}
      className="fixed top-[var(--nav-viewport-top,0px)] left-0 right-0 z-50 px-3 pt-[calc(0.75rem+env(safe-area-inset-top,0px))] md:px-0 md:pt-0 md:top-4 md:left-4 md:right-4 md:max-w-screen-lg md:mx-auto pointer-events-none"
    >
      <div
        ref={navContainerRef}
        className="apple-liquid-nav pointer-events-auto"
      >
        <LiquidGlassRefraction id="navbar-glass-refraction" targetRef={navContainerRef} />
        <div className="flex items-center justify-between px-1.5 h-14">
          {/* Left side - Navigation items */}
          <div className="relative flex items-center gap-1 sm:gap-2 md:gap-4">
            {/* Sliding indicator */}
            {activeSection && (
              <div
                ref={indicatorRef}
                className="apple-liquid-nav-indicator absolute h-11 pointer-events-none z-0"
                style={{
                  transform: 'translate3d(0px,0,0)',
                  width: '0px',
                }}
              >
                <span className="apple-liquid-nav-indicator-surface" />
              </div>
            )}
            {navItems.map((item) => {
              const Icon = item.icon
              const itemClassName = (isActive: boolean) =>
                cn(
                  'relative flex items-center h-11 px-2.5 sm:px-4 md:px-5 transition-colors duration-150 ease-out z-10',
                  'text-sm font-medium whitespace-nowrap',
                  'rounded-full',
                  isActive
                    ? 'text-gray-900'
                    : 'text-gray-700 apple-liquid-nav-inactive'
                )

              const sectionId = item.sectionId
              return (
                <button
                  key={sectionId}
                  ref={(el) => {
                    navRefs.current[sectionId] = el
                  }}
                  onClick={() => scrollToSection(sectionId)}
                  className={itemClassName(activeSection === sectionId)}
                >
                  <Icon
                    engaged={activeSection === sectionId}
                    className="w-4 h-4 flex-shrink-0"
                  />
                  {/* Mobile: label expands only for the active item (animated).
                      sm and up: label is always visible. */}
                  <span
                    className={cn(
                      'grid transition-[grid-template-columns,opacity] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                      'sm:grid-cols-[1fr] sm:opacity-100',
                      activeSection === sectionId
                        ? 'grid-cols-[1fr] opacity-100'
                        : 'grid-cols-[0fr] opacity-0'
                    )}
                    style={{ transitionDuration: `${LABEL_ANIMATION_MS}ms` }}
                  >
                    <span className="overflow-hidden">
                      <span className="block pl-2 whitespace-nowrap">{item.name}</span>
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          {/* Right side - Accepting New Work alert and Contact dropdown */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* <Badge 
              variant="secondary" 
              className="flex items-center gap-1.5 px-2 md:px-3 py-1 md:py-1.5 bg-green-50 text-green-700 border-green-200 hover:bg-green-100 transition-colors text-xs md:text-sm"
            >
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="hidden md:inline">Accepting New Work</span>
              <span className="md:hidden">Available</span>
            </Badge> */}
            <div ref={wrapperRef} className="inline-block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="group apple-liquid-nav-cta font-semibold flex items-center justify-center gap-2 p-0 h-11 w-11 md:w-auto md:pl-5 md:pr-6 rounded-full bg-transparent hover:bg-transparent"
                    size="sm"
                  >
                    <PhoneIcon className="w-4 h-4 flex-shrink-0" />
                    <span className="hidden sm:inline">Contact Me</span>
                    <ChevronDownIcon className="w-3 h-3 flex-shrink-0 hidden sm:inline" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="apple-liquid-dropdown"
                  style={{ width: buttonWidth ? `${buttonWidth}px` : undefined }}
                >
                  <DropdownMenuItem
                    onClick={() => window.location.href = 'mailto:blankinship2002@gmail.com'}
                    className="cursor-pointer"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    <span>Email</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => window.location.href = 'tel:9082978745'}
                    className="cursor-pointer"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    <span>Phone</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
