import { useMemo } from 'react'
import { useMobileAmbienceLite } from '@/presentation/hooks/useMobileAmbienceLite'
import { usePrefersReducedMotion } from '@/presentation/hooks/usePrefersReducedMotion'
import { useScrollParallax } from '@/presentation/hooks/useScrollParallax'

interface DecoItem {
  readonly kind: 'bean' | 'leaf'
  readonly left: string
  readonly top: string
  readonly size: number
  readonly parallax: number
  readonly rotate: number
  readonly opacity: number
  readonly delay: string
  readonly duration: string
}

/** Un poco más transparente que el baseline: sigue visible pero más sutil */
const DECO: readonly DecoItem[] = [
  {
    kind: 'leaf',
    left: '3%',
    top: '6%',
    size: 72,
    parallax: 0.14,
    rotate: -18,
    opacity: 0.34,
    delay: '0s',
    duration: '14s',
  },
  {
    kind: 'bean',
    left: '86%',
    top: '10%',
    size: 56,
    parallax: 0.1,
    rotate: 22,
    opacity: 0.38,
    delay: '-3s',
    duration: '12s',
  },
  {
    kind: 'bean',
    left: '10%',
    top: '38%',
    size: 64,
    parallax: 0.18,
    rotate: -8,
    opacity: 0.32,
    delay: '-1.5s',
    duration: '13s',
  },
  {
    kind: 'leaf',
    left: '74%',
    top: '44%',
    size: 68,
    parallax: 0.15,
    rotate: 14,
    opacity: 0.28,
    delay: '-6s',
    duration: '16s',
  },
  {
    kind: 'bean',
    left: '5%',
    top: '68%',
    size: 52,
    parallax: 0.11,
    rotate: 35,
    opacity: 0.36,
    delay: '-5s',
    duration: '11s',
  },
  {
    kind: 'leaf',
    left: '90%',
    top: '62%',
    size: 60,
    parallax: 0.16,
    rotate: -25,
    opacity: 0.26,
    delay: '-9s',
    duration: '15s',
  },
  {
    kind: 'bean',
    left: '46%',
    top: '18%',
    size: 44,
    parallax: 0.08,
    rotate: -30,
    opacity: 0.3,
    delay: '-0.5s',
    duration: '10s',
  },
  {
    kind: 'leaf',
    left: '50%',
    top: '82%',
    size: 78,
    parallax: 0.13,
    rotate: 8,
    opacity: 0.31,
    delay: '-11s',
    duration: '17s',
  },
  {
    kind: 'bean',
    left: '28%',
    top: '12%',
    size: 48,
    parallax: 0.12,
    rotate: 12,
    opacity: 0.32,
    delay: '-7s',
    duration: '12.5s',
  },
  {
    kind: 'leaf',
    left: '62%',
    top: '28%',
    size: 54,
    parallax: 0.11,
    rotate: -12,
    opacity: 0.29,
    delay: '-4s',
    duration: '14s',
  },
  {
    kind: 'bean',
    left: '34%',
    top: '56%',
    size: 58,
    parallax: 0.17,
    rotate: -22,
    opacity: 0.33,
    delay: '-2s',
    duration: '13s',
  },
  {
    kind: 'leaf',
    left: '18%',
    top: '88%',
    size: 66,
    parallax: 0.14,
    rotate: 20,
    opacity: 0.3,
    delay: '-8s',
    duration: '15s',
  },
  {
    kind: 'bean',
    left: '72%',
    top: '78%',
    size: 50,
    parallax: 0.12,
    rotate: 40,
    opacity: 0.35,
    delay: '-10s',
    duration: '11s',
  },
  {
    kind: 'leaf',
    left: '94%',
    top: '36%',
    size: 46,
    parallax: 0.13,
    rotate: -35,
    opacity: 0.32,
    delay: '-5.5s',
    duration: '14s',
  },
]

/** En móvil quitamos solo unas pocas piezas (14 → 10), repartidas en la lista */
const MOBILE_DECO_SKIP = new Set<number>([4, 7, 10, 12])

function decoForViewport(mobileLite: boolean): readonly DecoItem[] {
  if (!mobileLite) return DECO
  return DECO.filter((_, i) => !MOBILE_DECO_SKIP.has(i))
}

/**
 * Sin tope, scroll largo + parallax empuja las formas fuera del viewport y
 * `overflow-hidden` las recorta (muy visible en móvil con página alta).
 */
function clampParallaxY(
  scrollY: number,
  parallax: number,
  mobileLite: boolean,
): number {
  const raw = scrollY * parallax
  const capPx = mobileLite ? 72 : 120
  return Math.max(-capPx, Math.min(raw, capPx))
}

function BeanGlyph({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="text-amber-200/85 drop-shadow-[0_0_12px_rgba(251,191,36,0.32)]"
    >
      <path
        d="M24 6c-7 0-13 6.5-13 14.5 0 6 3.5 11 8 13.5-.5 2-1 4.5-1 7 0 5 2.5 7.5 6 7.5s6-2.5 6-7.5c0-2.5-.5-5-1-7 4.5-2.5 8-7.5 8-13.5C37 12.5 31 6 24 6Z"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinejoin="round"
      />
      <path
        d="M24 12v22"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        opacity={0.55}
      />
    </svg>
  )
}

function LeafGlyph({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="text-emerald-300/85 drop-shadow-[0_0_10px_rgba(52,211,153,0.28)]"
    >
      <path
        d="M38 10C26 10 14 18 10 30c12-2 22-10 28-20m0 0c-4 10-12 18-22 22"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 26c8 2 16-2 22-10"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity={0.55}
      />
    </svg>
  )
}

export function ScrollAmbience() {
  const scrollY = useScrollParallax()
  const reducedMotion = usePrefersReducedMotion()
  const mobileLite = useMobileAmbienceLite()

  const decoVisible = useMemo(
    () => decoForViewport(mobileLite),
    [mobileLite],
  )

  if (reducedMotion) {
    const reducedList = decoVisible.slice(0, mobileLite ? 6 : 8)
    return (
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-x-hidden overflow-y-visible"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_0%,rgba(201,169,98,0.12),transparent_65%),radial-gradient(ellipse_70%_45%_at_80%_90%,rgba(52,211,153,0.06),transparent)]" />
        {reducedList.map((item) => (
          <span
            key={`${item.left}-${item.top}-${item.kind}`}
            className="absolute"
            style={{
              left: item.left,
              top: item.top,
              opacity: Math.min(item.opacity + 0.06, 0.48),
              transform: `rotate(${item.rotate}deg)`,
            }}
          >
            {item.kind === 'bean' ? (
              <BeanGlyph size={item.size} />
            ) : (
              <LeafGlyph size={item.size} />
            )}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-x-hidden overflow-y-visible"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-5%,rgba(201,169,98,0.16),transparent_60%),radial-gradient(ellipse_75%_50%_at_100%_80%,rgba(180,83,9,0.1),transparent),radial-gradient(ellipse_60%_40%_at_0%_70%,rgba(16,185,129,0.08),transparent)]" />
      {decoVisible.map((item) => {
        const py = clampParallaxY(scrollY, item.parallax, mobileLite)
        return (
          <span
            key={`${item.left}-${item.top}-${item.kind}`}
            className="absolute will-change-transform"
            style={{
              left: item.left,
              top: item.top,
              opacity: item.opacity,
              transform: `translate3d(0, ${py}px, 0) rotate(${item.rotate}deg)`,
            }}
          >
            <span
              className="inline-block animate-ambience-drift"
              style={{
                animationDelay: item.delay,
                animationDuration: item.duration,
              }}
            >
              {item.kind === 'bean' ? (
                <BeanGlyph size={item.size} />
              ) : (
                <LeafGlyph size={item.size} />
              )}
            </span>
          </span>
        )
      })}
    </div>
  )
}
