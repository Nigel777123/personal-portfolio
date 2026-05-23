import { lazy, Suspense } from 'react'
import { F1ScrollProvider } from './context/F1ScrollContext'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { RpmShiftLights } from './components/hud/RpmShiftLights'
import { SpeedometerHUD } from './components/hud/SpeedometerHUD'
import { Hero } from './components/sections/Hero'

const About = lazy(() =>
  import('./components/sections/About').then((m) => ({ default: m.About })),
)
const Projects = lazy(() =>
  import('./components/sections/Projects').then((m) => ({ default: m.Projects })),
)
const Experience = lazy(() =>
  import('./components/sections/Experience').then((m) => ({ default: m.Experience })),
)
const Contact = lazy(() =>
  import('./components/sections/Contact').then((m) => ({ default: m.Contact })),
)

function SectionFallback() {
  return (
    <div className="section-padding mx-auto max-w-6xl">
      <div className="h-64 animate-pulse rounded-sm border border-white/10 bg-neutral-900/50" />
    </div>
  )
}

export default function App() {
  return (
    <F1ScrollProvider>
      <RpmShiftLights />
      <Navbar />
      <SpeedometerHUD />
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <About />
          <Projects />
          <Experience />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </F1ScrollProvider>
  )
}
