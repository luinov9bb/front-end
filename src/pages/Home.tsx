import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";

function Home() {
  const navigate = useNavigate();

  const handleGoToCatalog = () => {
    navigate("/catalog");
  };

  return (
    <>
      <Hero onGoToCatalog={handleGoToCatalog} />

      <section className="about">
        <h2>О магазине</h2>
        <p>
          Наш онлайн-магазин книг предлагает широкий выбор литературы:
          от художественных романов и фантастики до учебников по программированию
          и книгам по финансам. Мы стараемся подбирать только самые интересные
          и полезные издания.
        </p>
      </section>
    </>
  );
}

export default Home;
