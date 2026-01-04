import Header from './components/Header'
import Hero from './components/Hero'
import LogoBanner from './components/LogoBanner'
import Work from './components/Work'
import Formation from './components/Formation'
import Skills from './components/Skills'
import Footer from './components/Footer'

import './styles/index.css'
import "./fonts/css/satoshi.css"
import "./fonts/css/expose.css"

function App() {
  return (
    <>
      <Header />
      <Hero />
      <LogoBanner />
      <Formation />
      <Work />
      <Skills />
      <Footer />
    </>
  )
}

export default App
