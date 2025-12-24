import photo from '../assets/photo.jpg'

function Hero() {
  return (
    <section className="hero">
      <img className="hero-photo" src={photo} alt="Mohamed El Amine" />
      
      <div className="hero-content">
        <p>Hey, I'm</p>
        
        <div className="hero-names">
          <h1 className="hero-name-ar">محمد الأمين</h1>
          <h1 className="hero-name">Mohamed El Amine</h1>
        </div>
        
        <h2>Computer Science Student</h2>
        <p className="hero-subtitle">
          Discode, PassAgent, Bumpless… Never heard of them?
        </p>
        <p className='hero-current'>Currently working on Discode.dev</p>
      </div>
    </section>
  )
}

export default Hero
