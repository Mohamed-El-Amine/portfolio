function Formations() {
  const formationList = [
    {
      id: 1,
      name: "BUT Informatique",
      detail: "Institut Universitaire de Technologie A – University of Lille",
      grade: "Specialisation: Application Development",
      year: "2024 – Present",
    },
    {
      id: 2,
      name: "General Baccalaureate – Euro",
      detail: "Lycée Gustave Eiffel, Armentières",
      grade: "Graduated with honors (Mention Bien) – European English Option",
      year: "2021 – 2024",
    }
  ]

  return (
    <section id="graduation" className="formations">
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
      <h1 className="formation-name">{name}</h1>
      <p className="formation-year">{year}</p>
      <h3 className="formation-detail">{detail}</h3>
      <h4 className="formation-grade">{grade}</h4>
    </div>
  )
}

export default Formations
