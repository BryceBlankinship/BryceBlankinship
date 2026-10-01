'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowUp, Check, Copy, Mail } from 'lucide-react'

import { cn } from '@/lib/utils'

const COPIED_RESET_MS = 1500

// The async Clipboard API needs a secure, focused document; fall back to a selection copy otherwise.
const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const copied = document.execCommand('copy')
    textarea.remove()
    return copied
  }
}

export const EmailActions = ({ email }: { email: string }) => {
  const [copied, setCopied] = useState(false)
  const resetRef = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(resetRef.current), [])

  const copyEmail = async () => {
    if (!(await copyText(email))) return
    setCopied(true)
    window.clearTimeout(resetRef.current)
    resetRef.current = window.setTimeout(() => setCopied(false), COPIED_RESET_MS)
  }

  return (
    <div className="flex items-center gap-2">
      <a
        href={`mailto:${email}`}
        className="footer-glass-pill inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium text-gray-900"
      >
        <Mail className="size-4 flex-shrink-0" aria-hidden="true" />
        {email}
      </a>
      <button
        type="button"
        onClick={copyEmail}
        aria-label={copied ? 'Email address copied' : 'Copy email address'}
        className={cn(
          'footer-glass-pill inline-flex h-11 items-center justify-center gap-1.5 rounded-full text-sm font-medium text-gray-700 transition-[width,padding] duration-300',
          copied ? 'px-4' : 'w-11'
        )}
      >
        {copied ? (
          <>
            <Check className="size-4 text-green-600" aria-hidden="true" />
            <span>Copied</span>
          </>
        ) : (
          <Copy className="size-4" aria-hidden="true" />
        )}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </div>
  )
}

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
  timeZone: 'America/New_York',
  timeZoneName: 'short',
})

export const LocalTime = () => {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())

    let interval: number | undefined
    const msUntilNextMinute = 60_000 - (Date.now() % 60_000)
    const timeout = window.setTimeout(() => {
      setNow(new Date())
      interval = window.setInterval(() => setNow(new Date()), 60_000)
    }, msUntilNextMinute)

    return () => {
      window.clearTimeout(timeout)
      window.clearInterval(interval)
    }
  }, [])

  if (!now) {
    return <span className="inline-block w-20" aria-hidden="true" />
  }

  return (
    <time dateTime={now.toISOString()} className="tabular-nums">
      {timeFormatter.format(now).replace(/\b(EDT|EST)\b/, 'ET')}
    </time>
  )
}

export const BackToTop = () => (
  <button
    type="button"
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    aria-label="Back to top"
    className="footer-glass-pill inline-flex size-10 items-center justify-center rounded-full text-gray-700"
  >
    <ArrowUp className="size-4" aria-hidden="true" />
  </button>
)

export const FooterReveal = ({ children, className }: { children: ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} data-visible={visible ? '' : undefined} className={cn('footer-reveal', className)}>
      {children}
    </div>
  )
}
