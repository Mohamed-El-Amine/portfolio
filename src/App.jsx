import Header from './components/Header'
import Hero from './components/Hero'
import LogoBanner from './components/LogoBanner'
import Work from './components/Work'
import Formation from './components/Formation'
import BackgroundTexture from './components/BackgroundTexture'

import './styles/index.css'
import "./fonts/css/satoshi.css"
import "./fonts/css/expose.css"

function App() {
  return (
    <>
      <BackgroundTexture text="
      شُورْتْنْجْرَوْنْد 
      مَازي
      باسْ إيجِنْت
      بمبلِس 
      بمبلِس" />
      <Header />
      <Hero />
      <LogoBanner />
      <Work />
      <Formation />
    </>
  )
}

export default App
