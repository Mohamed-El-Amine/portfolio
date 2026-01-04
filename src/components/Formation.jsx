function Formations() {
  const formationList = [
    {
      id: 1,
      name: "BUT Informatique (2ᵉ year)",
      detail: "Institut Universitaire de Technologie A – University of Lille",
      grade: "Specialization: Application Development",
      year: "2024 – Present",
      logo: "src/assets/logo/IUT.png"
    },
    {
      id: 2,
      name: "General Baccalaureate – European English Option",
      detail: "Lycée Gustave Eiffel, Armentières",
      grade: "Graduated with honors (Mention Bien)",
      year: "2021 – 2024",
      logo: "src/assets/logo/Eiffel.png"
    }
  ]

  return (
    <section id="formations" className="formations">
      {formationList.map((i) => (
        <Formation
          key={i.id}
          name={i.name}
          detail={i.detail}
          grade={i.grade}
          year={i.year}
          logo={i.logo}
        />
      ))}
    </section>
  )
}

function Formation({ name, detail, grade, year, logo }) {
  return (
    <div className="formation">
      {/* Logo ajouté sans impacter le layout */}
      <img
        src={logo}
        alt={detail}
        className="formation-logo"
      />

      <h1 className="formation-name">{name}</h1>
      <p className="formation-year">{year}</p>
      <h3 className="formation-detail">{detail}</h3>
      <h4 className="formation-grade">{grade}</h4>
    </div>
  )
}

export default Formations
