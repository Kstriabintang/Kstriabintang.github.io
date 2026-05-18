import { lazy, Suspense } from 'react'
import Hero from '@/sections/Hero'

const About = lazy(() => import('@/sections/About'))
const HowIWork = lazy(() => import('@/sections/HowIWork'))
const Skills = lazy(() => import('@/sections/Skills'))
const Experience = lazy(() => import('@/sections/Experience'))
const Projects = lazy(() => import('@/sections/Projects'))
const Certificates = lazy(() => import('@/sections/Certificates'))
const Contact = lazy(() => import('@/sections/Contact'))

function SectionSkeleton({ tone = 'a' }: { tone?: 'a' | 'b' }) {
  const bg = tone === 'a' ? '#0A0A0A' : '#0D1117'
  return (
    <div
      aria-hidden="true"
      style={{ backgroundColor: bg, paddingTop: 96, paddingBottom: 96 }}
    >
      <div className="section-container">
        <div className="mb-12 space-y-3">
          <div className="h-3 w-10 rounded skeleton-shimmer" />
          <div className="h-10 w-2/3 max-w-sm rounded skeleton-shimmer" />
          <div className="h-1 w-16 rounded skeleton-shimmer" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-40 rounded-2xl skeleton-shimmer" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<SectionSkeleton tone="a" />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionSkeleton tone="b" />}>
        <HowIWork />
      </Suspense>
      <Suspense fallback={<SectionSkeleton tone="a" />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<SectionSkeleton tone="a" />}>
        <Experience />
      </Suspense>
      <Suspense fallback={<SectionSkeleton tone="b" />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<SectionSkeleton tone="a" />}>
        <Certificates />
      </Suspense>
      <Suspense fallback={<SectionSkeleton tone="b" />}>
        <Contact />
      </Suspense>
    </>
  )
}
