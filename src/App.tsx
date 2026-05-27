import { lazy, Suspense } from 'react'
import { useState } from 'react'
import { F1ScrollProvider } from './context/F1ScrollContext'
import { RaceAtmosphereBackdrop } from './components/layout/RaceAtmosphereBackdrop'
import { F1DataDustBackground } from './components/layout/F1DataDustBackground'
import { TelemetryCursor } from './components/ui/TelemetryCursor'
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
  const [raceStarted, setRaceStarted] = useState(false)

  return (
    <F1ScrollProvider>
      <div className="relative isolate min-h-screen overflow-x-hidden bg-zinc-950">
        <RaceAtmosphereBackdrop />
        <F1DataDustBackground />
        <TelemetryCursor />
        {raceStarted && <RpmShiftLights />}
        {raceStarted && <Navbar />}
        {raceStarted && <SpeedometerHUD />}
        <main className="relative z-10">
          <Hero onRaceStart={() => setRaceStarted(true)} />
          <Suspense fallback={<SectionFallback />}>
            <About />
            <Projects />
            <Experience />
            <Contact />
          </Suspense>
        </main>
        <Footer />
      </div>
    </F1ScrollProvider>
  )
}
