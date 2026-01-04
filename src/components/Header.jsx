function Header() {
  return (
    <header className="header">
      <nav className="header-nav">
        <a className="header-name" href="#">محمد</a>
        <ul className="header-links">
          <li><a href="#home">Accueil</a></li>
          <li><a href="#formations">Formations</a></li>
          <li><a href="#realisations">Réalisations</a></li>
          <li><a href="#competences">Compétences</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
