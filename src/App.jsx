import Tiles from './components/Tiles'
import Tiles2 from './components/Tiles2'
import Footer from './components/Footer'
import Formation from './components/Formation'
import Header from './components/Header'
import Hero from './components/Hero'
import IconList from './components/IconList'
import LogoBanner from './components/LogoBanner'
import Work from './components/Work'


import "./fonts/css/expose.css"
import "./fonts/css/satoshi.css"
import "./fonts/css/abuhmeda.css"
import "./fonts/css/neckar.css"
import './styles/index.css'

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Tiles />
      <IconList />
      {/* <LogoBanner /> */}
      <Work />
      {/* <Skills /> */}
      <Formation />
      <Footer />
    </>
  )
}

export default App
