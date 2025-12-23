function BackgroundTexture({ text = "const hamoudE=()=>{", opacity = 0.06 }) {
  return (
    <div className="bg-texture-container">
      <div className="bg-text-layer" style={{ '--text': `"${text}"`, '--opacity': opacity }}>
        <span aria-hidden="true">{text}</span>
      </div>
    </div>
  )
}

export default BackgroundTexture
