function Formations() {
    const formationList = [
        { id: 1, name: "BUT Informatique (2ᵉ année)", detail: "Institut Universitaire de Technologie A - Lille", grade: "Parcours : Développement d'applications", year: '2024 - Présent' },
        { id: 2, name: "Baccalauréat Général Option Euro Anglais", detail: "Lycée Gustave Eiffel, Armentières", grade: "Mention Bien", year: '2021 - 2024' }

    ]

    return (
        <div className="formations">
            {formationList.map((i) => (
                <Formation key={i.id} name={i.name} detail={i.detail} grade={i.grade} year={i.year} />
            ))}
        </div>
    )
}

function Formation({ name, detail, grade, year }) {
    return (
        <div id="formation" className="formation">
            <h1 className="formation-name">{name}</h1>
            <p className="formation-year">{year}</p>
            <h3 className="formation-detail">{detail}</h3>
            <h4 className="formation-grade">{grade}</h4>
        </div>
    )
}

export default Formations
