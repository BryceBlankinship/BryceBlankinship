'use client'

import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect, useCallback } from 'react'
import { Briefcase, Code, GraduationCap, Mail, Phone, ChevronDown, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const navItems = [
  {
    name: 'About Me',
    sectionId: 'about-me',
    icon: User,
  },
  {
    name: 'Experience',
    sectionId: 'experience',
    icon: Briefcase,
  },
  {
    name: 'Skills',
    sectionId: 'skills',
    icon: Code,
  },
  {
    name: 'Education',
    sectionId: 'education',
    icon: GraduationCap,
  },
]

export const Navbar = () => {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const wrapperRef = useRef<HTMLDivElement>(null)
  const navContainerRef = useRef<HTMLDivElement>(null)
  const [buttonWidth, setButtonWidth] = useState<number | undefined>(undefined)
  const [activeSection, setActiveSection] = useState<string>('about-me')
  const navRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})
  const indicatorRef = useRef<HTMLDivElement>(null)
  const manualActiveRef = useRef<string | null>(null)
  const isScrollingRef = useRef<boolean>(false)
  const getVisibleSectionElement = useCallback((sectionId: string) => {
    const matchingSections = Array.from(
      document.querySelectorAll<HTMLElement>(`#${sectionId}`)
    )

    if (!matchingSections.length) {
      return null
    }

    return (
      matchingSections.find(
        (element) => element.offsetParent !== null || element.getClientRects().length > 0
      ) ?? matchingSections[0]
    )
  }, [])
  const scrollToSection = useCallback(
    (sectionId: string) => {
      if (!isHomePage) return

      const targetSection = getVisibleSectionElement(sectionId)

      if (!targetSection) return

      // Set scrolling flag to prevent scroll listener from interfering
      isScrollingRef.current = true
      manualActiveRef.current = sectionId
      setActiveSection(sectionId)

      const navRect = navContainerRef.current?.getBoundingClientRect()
      const navAnchoredBottom = navRect ? navRect.top > window.innerHeight / 2 : false
      const spacing = 16
      const offset = navAnchoredBottom
        ? spacing
        : Math.max((navRect?.height ?? 0) + (navRect?.top ?? 0) + spacing, spacing)

      const targetPosition =
        window.scrollY + targetSection.getBoundingClientRect().top - offset

      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: 'smooth',
      })

      // Reset scrolling flag after animation completes
      setTimeout(() => {
        isScrollingRef.current = false
      }, 1000)
    },
    [getVisibleSectionElement, isHomePage]
  )

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

    const updateActiveSection = () => {
      // Don't update if we're programmatically scrolling
      if (isScrollingRef.current) return

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const isMobile = window.innerWidth < 768
      const offset = isMobile ? 100 : 100

      // If a navigation button was just clicked, keep that section active
      // while it's still within the target view area. This prevents sections
      // like Skills from being overridden by Education when the document
      // bottom is reached while centering the clicked section.
      if (manualActiveRef.current) {
        const manualElement = getVisibleSectionElement(manualActiveRef.current)
        if (manualElement) {
          const rect = manualElement.getBoundingClientRect()
          const distanceFromTop = rect.top - offset
          const captureThreshold = 80
          const releaseThreshold = 200

          if (Math.abs(distanceFromTop) <= captureThreshold) {
            setActiveSection(manualActiveRef.current)
            return
          }

          if (Math.abs(distanceFromTop) > releaseThreshold) {
            manualActiveRef.current = null
          }
        } else {
          manualActiveRef.current = null
        }
      }
      
      // Check if at the absolute top
      if (scrollTop < 50) {
        setActiveSection('about-me')
        return
      }
      
      // Find which section is currently at the top of the viewport (accounting for navbar)
      // Exclude Education from normal detection - it's only active at absolute bottom
      let activeSection = 'about-me'
      let minDistance = Infinity

      navItems.forEach((item) => {
        // Skip Education - it's only active at absolute bottom
        if (item.sectionId === 'education') return

        const element = getVisibleSectionElement(item.sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Check if section is above the offset point (navbar area)
          // We want the section that's closest to but above the offset point
          const distanceFromTop = rect.top - offset
          
          // If section is above the offset point and closer than previous, it's active
          if (distanceFromTop <= 0 && Math.abs(distanceFromTop) < minDistance) {
            minDistance = Math.abs(distanceFromTop)
            activeSection = item.sectionId
          }
          // If no section is above offset, find the one closest to it
          else if (distanceFromTop > 0 && distanceFromTop < minDistance && rect.top < windowHeight) {
            minDistance = distanceFromTop
            activeSection = item.sectionId
          }
        }
      })

      // Check if at the absolute bottom - only then set Education as active
      if (scrollTop + windowHeight >= documentHeight - 50) {
        setActiveSection('education')
      } else {
        setActiveSection(activeSection)
      }
    }

    const handleScroll = () => {
      updateActiveSection()
    }

    const handleResize = () => {
      updateActiveSection()
    }

    // Initial check
    updateActiveSection()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [getVisibleSectionElement, isHomePage])

  // Update indicator position when active section changes
  useEffect(() => {
    const updateIndicator = () => {
      if (!indicatorRef.current || !navRefs.current[activeSection]) return

      const activeButton = navRefs.current[activeSection]
      if (activeButton) {
        const container = activeButton.parentElement
        if (container) {
          const containerRect = container.getBoundingClientRect()
          const buttonRect = activeButton.getBoundingClientRect()
          const relativeLeft = buttonRect.left - containerRect.left
          
          // Use requestAnimationFrame for smooth animation
          requestAnimationFrame(() => {
            if (indicatorRef.current) {
              indicatorRef.current.style.transform = `translateX(${relativeLeft}px)`
              indicatorRef.current.style.width = `${buttonRect.width}px`
            }
          })
        }
      }
    }

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      updateIndicator()
    })

    // Update on resize
    const handleResize = () => {
      requestAnimationFrame(updateIndicator)
    }
    
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [activeSection])

  // Only show navigation on home page
  if (!isHomePage) {
    return null
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 md:top-4 md:left-4 md:right-4 md:max-w-screen-lg md:mx-auto md:bottom-auto bottom-0 pointer-events-none">
      <div
        ref={navContainerRef}
        className="apple-liquid-nav pointer-events-auto"
      >
        <div className="flex items-center justify-between md:px-3 px-4 h-16 md:h-14">
          {/* Left side - Navigation items */}
          <div className="relative flex items-center gap-2 md:gap-4">
            {/* Sliding indicator */}
            <div
              ref={indicatorRef}
              className="absolute h-9 md:h-10 rounded-full bg-white/85 backdrop-blur-sm border border-white/50 shadow-md transition-all duration-500 ease-out pointer-events-none z-0"
              style={{
                transform: 'translateX(0px)',
                width: '0px',
                boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.12), inset 0 1px 0 0 rgba(255, 255, 255, 0.8)',
              }}
            />
            {navItems.map((item, index) => {
              const Icon = item.icon
              const isActive = activeSection === item.sectionId
              const isFirst = index === 0
              
              return (
                <button
                  key={item.sectionId}
                  ref={(el) => {
                    navRefs.current[item.sectionId] = el
                  }}
                  onClick={() => scrollToSection(item.sectionId)}
                  className={cn(
                    'relative flex items-center gap-2 px-4 md:px-5 py-2.5 transition-all duration-300 ease-out z-10',
                    'text-sm font-medium whitespace-nowrap',
                    'rounded-full',
                    isFirst && 'md:pl-6',
                    isActive
                      ? 'text-gray-900'
                      : 'text-gray-700 apple-liquid-nav-inactive'
                  )}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">{item.name}</span>
                </button>
              )
            })}
          </div>

          {/* Right side - Accepting New Work alert and Contact dropdown */}
          <div className="flex items-center gap-2 md:gap-3">
            <Badge 
              variant="secondary" 
              className="flex items-center gap-1.5 px-2 md:px-3 py-1 md:py-1.5 bg-green-50 text-green-700 border-green-200 hover:bg-green-100 transition-colors text-xs md:text-sm"
            >
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="hidden md:inline">Accepting New Work</span>
              <span className="md:hidden">Available</span>
            </Badge>
            <div ref={wrapperRef} className="inline-block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="flex items-center justify-center gap-2 p-2 md:px-5 md:py-2 h-9 w-9 md:w-auto md:h-10 md:rounded-r-full md:rounded-l-full rounded-full md:pr-6 apple-liquid-nav-button"
                    size="sm"
                  >
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span className="hidden sm:inline">Contact Me</span>
                    <ChevronDown className="w-3 h-3 flex-shrink-0 hidden sm:inline" />
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

