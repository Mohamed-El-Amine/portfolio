import discodeLogo from '../assets/logo/Discode.png'
import bumplessLogo from '../assets/logo/Bumpless.png'
import passagentLogo from '../assets/logo/PassAgent.ico'
import mazyLogo from '../assets/logo/Mazy.ico'


function LogoBanner() {
    const logoList = [
        { id: 0, logo: discodeLogo },
        { id: 1, logo: bumplessLogo },
        { id: 2, logo: passagentLogo },
        { id: 3, logo: mazyLogo },

    ]

    return (
        <div className="logobanner">
            <ul className="logobanner-list">
                {logoList.map((item) => (
                    <li key={item.id}>
                        <img src={item.logo} alt="" />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default LogoBanner
