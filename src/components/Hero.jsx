import photo from '../assets/photo.jpg'
import video from '../assets/video/CPU.webm'

function Hero() {
  return (
    <section className="hero">
      <img className="hero-photo" src={photo} alt="Mohamed El Amine" />
      <video autoPlay muted loop className="hero-video" src={video} alt="Mohamed El Amine" />

      <div className="hero-content">
        <p>Hey, I'm</p>

        <div className="hero-names">
          <h1 className="hero-name-ar">محمد الأمين</h1>
          <h1 className="hero-name">Mohamed El Amine</h1>
        </div>

        <h2>
          <span style={{fontWeight: 900}}>
            Computer Science Student
          </span>
          <br />
          <span style={{ fontSize: '0.8em', fontWeight: 300, color: '#ffffff5f'}}>
            who likes to see how it works under the hood.
          </span>
        </h2>

        <div>
          <p className="hero-subtitle">Discode, PassAgent, Bumpless… Never heard of them?</p>

          <p className='hero-current'>Currently working on Discode.dev</p>
        </div>
      </div>
    </section>
  )
}

export default Hero
