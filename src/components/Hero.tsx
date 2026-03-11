type HeroProps = {
  onGoToCatalog?: () => void;
}

function Hero({ onGoToCatalog }: HeroProps) {
  return (
    <section className="hero">
      <h2>Online Book Store</h2>
      <p>Find the best books with delivery to your home</p>
      <button onClick={onGoToCatalog}>Go to catalog</button>
    </section>
  )
}

export default Hero