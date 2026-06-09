import discodeLogo from '../assets/logo/Discode.png';
import bumplessLogo from '../assets/logo/Bumpless.png';
import passagentLogo from '../assets/logo/PassAgent.ico';
import mazyLogo from '../assets/logo/Mazy.ico';
import { useEffect, useRef } from 'react';

function IconList() {
  const logoList = [
    { id: 0, logo: discodeLogo },
    { id: 1, logo: bumplessLogo },
    { id: 2, logo: passagentLogo },
    { id: 3, logo: mazyLogo },
  ];

  const myCanvas = useRef();

  useEffect(() => {
    const context = myCanvas.current.getContext('2d');
    const image = new Image();
    image.src = '/src/assets/logo/Discode.png';
    context.drawImage(image, 600, 0, 100, 100);
  });

  return (
    <div className="canva">
      <canvas ref={myCanvas} width="window.innerWidth" height="50"></canvas>
    </div>
  );
}

export default IconList;
