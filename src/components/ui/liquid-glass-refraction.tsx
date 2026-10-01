'use client'

import { useEffect, useState, type RefObject } from 'react'

type LiquidGlassRefractionProps = {
  id: string
  targetRef: RefObject<HTMLElement | null>
  /** Width in px of the rim band that bends the backdrop. */
  bezel?: number
  /** `feDisplacementMap` scale; the offset at the very edge is half of this, in px. */
  strength?: number
}

type DisplacementMap = { href: string; width: number; height: number }

// Only Chromium renders SVG filters referenced from `backdrop-filter`. Safari and
// Firefox would drop the backdrop entirely, so they keep the plain blur.
const supportsBackdropSvgFilter = () => 'userAgentData' in navigator

// Encodes a per-pixel offset (R = x, G = y, 128 = none) that pulls the backdrop
// inward near the rounded-rect edge, like light bending through a glass bevel.
function createDisplacementMap(width: number, height: number, radius: number, bezel: number) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  if (!context) return null

  const image = context.createImageData(width, height)
  const halfWidth = width / 2
  const halfHeight = height / 2
  const r = Math.min(radius, halfWidth, halfHeight)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const px = x + 0.5 - halfWidth
      const py = y + 0.5 - halfHeight
      const qx = Math.abs(px) - (halfWidth - r)
      const qy = Math.abs(py) - (halfHeight - r)

      let distanceFromEdge: number
      let nx = 0
      let ny = 0
      if (qx > 0 && qy > 0) {
        const length = Math.hypot(qx, qy)
        distanceFromEdge = r - length
        nx = (qx / length) * Math.sign(px)
        ny = (qy / length) * Math.sign(py)
      } else if (qx > qy) {
        distanceFromEdge = r - qx
        nx = Math.sign(px)
      } else {
        distanceFromEdge = r - qy
        ny = Math.sign(py)
      }

      let dx = 0
      let dy = 0
      if (distanceFromEdge >= 0 && distanceFromEdge < bezel) {
        const t = 1 - distanceFromEdge / bezel
        const magnitude = t * t
        dx = -nx * magnitude
        dy = -ny * magnitude
      }

      const i = (y * width + x) * 4
      image.data[i] = 128 + dx * 127
      image.data[i + 1] = 128 + dy * 127
      image.data[i + 2] = 128
      image.data[i + 3] = 255
    }
  }

  context.putImageData(image, 0, 0)
  return canvas.toDataURL()
}

/**
 * Renders an SVG filter sized to `targetRef` and flags the target with
 * `data-refract` so CSS can add `url(#id)` to its `backdrop-filter`.
 */
export function LiquidGlassRefraction({
  id,
  targetRef,
  bezel = 18,
  strength = 36,
}: LiquidGlassRefractionProps) {
  const [map, setMap] = useState<DisplacementMap | null>(null)

  useEffect(() => {
    const element = targetRef.current
    if (!element || !supportsBackdropSvgFilter()) return

    const update = () => {
      const width = Math.round(element.offsetWidth)
      const height = Math.round(element.offsetHeight)
      if (!width || !height) return

      const radius = parseFloat(getComputedStyle(element).borderTopLeftRadius) || 0
      const href = createDisplacementMap(width, height, radius, bezel)
      if (href) setMap({ href, width, height })
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(element)
    return () => observer.disconnect()
  }, [targetRef, bezel])

  useEffect(() => {
    const element = targetRef.current
    if (!element || !map) return

    element.dataset.refract = ''
    return () => {
      delete element.dataset.refract
    }
  }, [targetRef, map])

  if (!map) return null

  return (
    <svg aria-hidden width="0" height="0" className="absolute pointer-events-none">
      <filter
        id={id}
        x="0"
        y="0"
        width={map.width}
        height={map.height}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feImage
          href={map.href}
          x="0"
          y="0"
          width={map.width}
          height={map.height}
          preserveAspectRatio="none"
          result="displacement"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="displacement"
          scale={strength}
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  )
}
