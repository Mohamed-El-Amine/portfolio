import ProjectDate from '../hooks/time'

import discodeLogo from '../assets/logo/Discode.png'
import discodeImage from '../assets/image/Discode.png'
import discodeVideo from '../assets/video/Discode.webm'

import bumplessLogo from '../assets/logo/Bumpless.png'
import bumplessImage from '../assets/image/Bumpless.png'
import bumplessVideo from '../assets/video/Bumpless.webm'

import passagentLogo from '../assets/logo/PassAgent.ico'
import passagentImage from '../assets/image/PassAgent.webp'
import passagentVideo from '../assets/video/PassAgent.webm'

import mazyLogo from '../assets/logo/Mazy.ico'
import mazyImage from '../assets/image/Mazy.png'
import mazyVideo from '../assets/video/Mazy.webm'

import shortngroundLogo from '../assets/logo/Shortnground.jpg'
import shortngroundImage from '../assets/image/Shortnground.png'
import shortngroundVideo from '../assets/video/Shortnground.webm'

function Work() {
    return (
        <section id="work" className='work'>
            <h1 className='work-title'>Experiences & Projects</h1>
            <Projects />
        </section>
    )
}

function Projects() {
    const projectsList = [
        {
            id: 0,
            name: "Discode",
            type: "Messaging Web Application",
            context: "BUT Informatique – Academic Project",
            dateStart: "2025-02-01",
            dateEnd: "Present",
            logo: discodeLogo,
            image: discodeImage,
            video: discodeVideo,
            description:
                "Design and development of a real-time messaging web application integrating AI features. The project focuses on secure communication, system architecture, and scalability.",
            skills: ["Web development", "Real-time communication", "System architecture", "Teamwork"],
            proof: "https://github.com/Mohamed-El-Amine/Discode"
        },
        {
            id: 1,
            name: "Mazy",
            type: "Java Object-Oriented Game",
            context: "BUT Informatique – Academic Project",
            dateStart: "2024-10-01",
            dateEnd: "2025-01-15",
            logo: mazyLogo,
            image: mazyImage,
            video: mazyVideo,
            description:
                "Development of a Java maze game using object-oriented programming principles. Focus on game logic, class design, and user interaction.",
            skills: ["Java", "Object-Oriented Programming", "Algorithmic thinking"],
            proof: "https://gitlab.univ-lille.fr/sae302/2025/I3_SAE3.3"
        },
        {
            id: 2,
            name: "PassAgent",
            type: "Password Manager & Generator",
            context: "Personal Project",
            dateStart: "2023-01-11",
            dateEnd: "2023-03-01",
            logo: passagentLogo,
            image: passagentImage,
            video: passagentVideo,
            description:
                "Development of a desktop password manager in Python featuring password generation, clipboard interaction, and file storage.",
            skills: ["Python", "UI design", "Security fundamentals"],
            proof: "https://github.com/Mohamed-El-Amine/PassAgent"
        },
        {
            id: 3,
            name: "Bumpless",
            type: "1v1 Python Game",
            context: "Personal Project",
            dateStart: "2024-03-01",
            dateEnd: "2024-03-29",
            logo: bumplessLogo,
            image: bumplessImage,
            video: bumplessVideo,
            description:
                "Design of a two-player tank game focusing on physics-based movement, collisions, and gameplay mechanics.",
            skills: ["Python", "Game logic", "Problem solving"],
            proof: "https://github.com/Anas-SIBARNI/bumpless"
        },
        {
            id: 4,
            name: "Shortnground",
            type: "Hardware Design Project",
            context: "Personal Project",
            dateStart: "2023-10-01",
            dateEnd: "2023-12-01",
            logo: shortngroundLogo,
            image: shortngroundImage,
            video: shortngroundVideo,
            description:
                "Design of printed circuit boards (PCBs) for custom mechanical keyboards and study of ARM-based systems.",
            skills: ["Electronics", "PCB design", "Hardware analysis"],
            proof: "https://www.instagram.com/shortnground/"
        }
    ]

    return (
        <div className="projects">
            {projectsList.map((p) => (
                <Project key={p.id} {...p} />
            ))}
        </div>
    )
}

function Project({
    logo,
    image,
    video,
    name,
    type,
    context,
    dateStart,
    dateEnd,
    description,
    skills,
    proof
}) {
    return (
        <div className="project">
            <div className="project-media">
                <h3 className="project-date">{dateStart} – {dateEnd}</h3>
                <img src={image} className="project-image" />
                <video autoPlay muted loop src={video} className="project-video" />
                <img src={logo} className="project-logo" />
            </div>

            <div className="project-info">
                <h3 className="project-name">{name}</h3>
                <h4 className="project-type">{type}</h4>
                <p className="project-context">{context}</p>
                <p className="project-description">{description}</p>

                <ul className="project-tags">
                    {skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                    ))}
                </ul>

                <a href={proof} className="project-proof" target="_blank">
                    View project
                </a>
            </div>
        </div>
    )
}

export default Work
