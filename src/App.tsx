import { lazy, Suspense } from 'react'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
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
  return <div className="section-padding mx-auto max-w-6xl animate-pulse h-64 rounded-2xl bg-white/5" />
}

export default function App() {
  return (
    <>
      <Navbar />
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
    </>
  )
}
