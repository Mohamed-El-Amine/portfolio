import ProjectDate from '../hooks/time'

import discodeLogo from '../assets/logo/Discode.png'
import discodeImage from '../assets/image/Discode.png'
import discodeVideo from '../assets/video/Discode.webm'

import bumplessLogo from '../assets/logo/Bumpless.png'
import bumplessImage from '../assets/image/Bumpless.png'
import bumplessVideo from '../assets/video/Bumpless.mp4'

import passagentLogo from '../assets/logo/PassAgent.ico'
import passagentImage from '../assets/image/PassAgent.webp'
import passagentVideo from '../assets/video/PassAgent.webm'

import mazyLogo from '../assets/logo/Mazy.ico'
import mazyImage from '../assets/image/Mazy.webp'
import mazyVideo from '../assets/video/Mazy.webm'

import shortngroundLogo from '../assets/logo/Shortnground.jpg'
import shortngroundImage from '../assets/image/Shortnground.png'
import shortngroundVideo from '../assets/video/Shortnground.mp4'

function Work() {
    return (
        <div className='work'>
            <h1 className='work-title'>Here is my Work</h1>
            <Projects />
        </div>
    )
}

function Projects() {
    const projectsList = [
        { id: 0, logo: discodeLogo, image: discodeImage, video: discodeVideo, name: 'Discode', type: 'Messaging Web App', tags: ['code', 'dev', 'discord'], date: '2025-09-01', description: "Chat temps réel avec IA, fait par un étudiant. Communication (relativement) sécurisée, architecture ambitieuse et bugs en bonus. Gratuit parce qu'on apprend encore." },
        { id: 1, logo: shortngroundLogo, image: shortngroundImage, video: shortngroundVideo, name: 'Shortnground', type: 'Hardware Conception project', tags: ['PCB', 'Electronics', 'Keyboard'], date: '2023-10-24', description: "Design of printed circuit boards (PCBs) for custom mechanical keyboards and study of ARM-based SoCs" },
        { id: 2, logo: mazyLogo, image: mazyImage, video: mazyVideo, name: 'Mazy', type: 'Maze Java Game', tags: ['Maze', 'exit', 'game'], date: '2025-10-24', description: "Mazy is a java Object orented game with advanced feature." },
        { id: 3, logo: passagentLogo, image: passagentImage, video: passagentVideo, name: 'PassAgent', type: 'Password Manager & Gnerator', tags: ['Password', 'Security', 'python', 'UI'], date: '2023-01-11', description: "PassAgent is a modern password generator application developed in Python using customtkinter for a sleek, dark-mode UI. It allows you to generate strong passwords, copy them to the clipboard, and save them to a dedicated file." },
        { id: 4, logo: bumplessLogo, image: bumplessImage, video: bumplessVideo, name: 'Bumpless', type: '1v1 Pyhton Game', tags: ['tank', '1v1', 'bump', 'bounce'], date: '2024-03-29', description: "Bumpless Battle Tank est un jeu en un contre un avec des Tanks armés de Rockets." },
    ]

    return (
        <div className="projects">
            {projectsList.map((i) => (
                <Project key={i.id} logo={i.logo} image={i.image} video={i.video} name={i.name} type={i.type} tags={i.tags} date={i.date} description={i.description} />
            ))}
        </div>
    )
}

function Project({ logo, image, video, name, type, tags, date, description }) {
    return (
        <div id="work" className="project">
            <div className="project-media">
                <h3 className="project-date"><ProjectDate date={date} /></h3>
                <img src={image} className="project-image" />
                <video
                    autoPlay muted loop
                    src={video}
                    className="project-video"
                />
                <img src={logo} className="project-logo" />
            </div>

            <div className="project-info">
                <h3 className="project-name">{name}</h3>
                <h4 className="project-type">{type}</h4>
                <p className="project-description">{description}</p>
                <ul className="project-tags">
                    {tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Work
