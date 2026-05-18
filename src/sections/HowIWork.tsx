import { useRef, memo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { FileCode2, Bot, ShieldCheck } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger)

const PILLAR_ICONS = [FileCode2, Bot, ShieldCheck] as const

const PillarCard = memo(function PillarCard({
  icon: Icon,
  title,
  body,
  index,
}: {
  icon: (typeof PILLAR_ICONS)[number]
  title: string
  body: string
  index: number
}) {
  return (
    <div
      className="howiwork-pillar spotlight-card glass-card glass-card-hover rounded-2xl p-6 flex flex-col gap-3"
      data-index={index}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex items-center justify-center w-9 h-9 rounded-lg"
          style={{ background: 'rgba(124, 58, 237, 0.12)' }}
        >
          <Icon className="w-5 h-5 text-purple-400" />
        </div>
        <h4 className="font-jetbrains text-base font-semibold text-text-primary">
          {title}
        </h4>
      </div>
      <p className="font-inter text-sm text-text-secondary leading-relaxed">
        {body}
      </p>
    </div>
  )
})

export default function HowIWork() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const pillarsRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const triggers: ScrollTrigger[] = []

      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 0, y: 40 })
        const st = ScrollTrigger.create({
          trigger: titleRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(titleRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power3.out',
            })
          },
          once: true,
        })
        triggers.push(st)
      }

      if (bodyRef.current) {
        gsap.set(bodyRef.current, { opacity: 0, y: 30 })
        const st = ScrollTrigger.create({
          trigger: bodyRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(bodyRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: 0.15,
              ease: 'power3.out',
            })
          },
          once: true,
        })
        triggers.push(st)
      }

      if (pillarsRef.current) {
        const cards = pillarsRef.current.querySelectorAll('.howiwork-pillar')
        gsap.set(cards, { opacity: 0, y: 30 })
        const st = ScrollTrigger.create({
          trigger: pillarsRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.1,
              delay: 0.3,
              ease: 'power3.out',
            })
          },
          once: true,
        })
        triggers.push(st)
      }

      return () => triggers.forEach((s) => s.kill())
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="how-i-work"
      className="relative w-full overflow-hidden"
      style={{
        paddingTop: '96px',
        paddingBottom: '96px',
        backgroundColor: '#0D1117',
      }}
    >
      {/* Subtle background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 80% 30%, rgba(249, 115, 22, 0.05) 0%, transparent 50%), radial-gradient(circle at 20% 70%, rgba(124, 58, 237, 0.06) 0%, transparent 50%)',
          zIndex: 0,
        }}
      />

      <div className="section-container relative" style={{ zIndex: 1 }}>
        {/* Title */}
        <div ref={titleRef} className="mb-10 md:mb-14">
          <span className="font-jetbrains text-sm text-purple-400">
            {t.howIWork.sectionNumber}
          </span>
          <h2 className="font-jetbrains text-[28px] md:text-[48px] font-bold text-text-primary mt-2 tracking-tight leading-tight">
            {t.howIWork.sectionTitle}
          </h2>
          <div
            className="mt-3 rounded-full"
            style={{
              width: '60px',
              height: '3px',
              background: 'linear-gradient(135deg, #7C3AED, #6D28D9, #4C1D95)',
            }}
          />
        </div>

        {/* Body paragraphs */}
        <div ref={bodyRef} className="max-w-3xl mb-12 md:mb-14 flex flex-col gap-5">
          {t.howIWork.paragraphs.map((para, i) => (
            <p
              key={i}
              className="font-inter text-base md:text-lg text-text-secondary"
              style={{ lineHeight: 1.7 }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Pillars grid */}
        <div ref={pillarsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.howIWork.pillars.map((pillar, i) => (
            <PillarCard
              key={i}
              icon={PILLAR_ICONS[i]}
              title={pillar.title}
              body={pillar.body}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
