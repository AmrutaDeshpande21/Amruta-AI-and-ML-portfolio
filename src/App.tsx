import Background from './components/Background'
import Nav from './components/Nav'
import { useSmoothScroll } from './lib/useSmoothScroll'
import Hero from './sections/Hero'
import About from './sections/About'
import Work from './sections/Work'
import Experience from './sections/Experience'
import Skills from './sections/Skills'
import Journey from './sections/Journey'
import Contact from './sections/Contact'
import { profile } from './data/profile'

export default function App() {
  useSmoothScroll()
  return (
    <>
      <Background />
      <div className="relative z-[1]">
        <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-bg focus:px-4 focus:py-2">
          Skip to content
        </a>
        <Nav />
        <main>
          <Hero />
          <About />
          <Work />
          <Experience />
          <Skills />
          <Journey />
          <Contact />
        </main>
        <footer className="px-5 pb-10 text-center text-sm text-muted">
          © {new Date().getFullYear()} {profile.name}.
        </footer>
      </div>
    </>
  )
}
