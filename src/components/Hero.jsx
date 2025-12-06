import photo from '../assets/photo.jpg'

function Hero() {
  return (
    <section className="hero">
      <div>
        <img className='hero-photo' src={photo} alt="Mohamed El Amine" />

        <p>Hey, I'm</p>
        <h1 className="hero-name-ar">محمد الأمين</h1>
        <h1 className="hero-name">Mohamed El Amine</h1>
        <h2>Computer Science Student</h2>
        <p className="hero-subtitle">
          Discode, PassAgent, Bumpless…
          Never heard of them? I hop you did.
        </p>
        <p>
          HamoudE Corp. maybe, but for now it's just Discode.
        </p>
      </div>
    </section>
  )
}

export default Hero
