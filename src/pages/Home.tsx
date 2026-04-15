import AboutStyles from "../pages/About.module.css";
import homeStyles from "../pages/Home.module.css";
import Carousel from "../components/Carousel";
import Features from "../components/Features";

function Home() {
  const carouselSlides = [
    {
      id: 1,
      image: "https://picsum.photos/1200/600?random=1",
      title: "Книги по литературе",
    },
    {
      id: 2,
      image: "https://picsum.photos/1200/600?random=2",
      title: "Популярные издания",
    },
    {
      id: 3,
      image: "https://picsum.photos/1200/600?random=3",
      title: "Лучшие бестселлеры",
    },
  ];

  return (
    <div className={homeStyles.contentPanel}>
      <Carousel slides={carouselSlides} autoPlay={true} autoPlayInterval={5000} />

      <section className={AboutStyles.about}>
        <h2>О нашем магазине</h2>
        <p>
          BookStore - ваш надежный партнер в мире книг. Мы предлагаем огромный выбор литературы на любой вкус и возраст:
          от захватывающих романов и увлекательной фантастики до полезных учебников по программированию и книг по финансам.
          <br />
          <br />
          Каждая книга в нашем каталоге тщательно отобрана нашей командой экспертов. Мы работаем только с проверенными издательствами
          и авторами, чтобы гарантировать качество каждого издания. Наша миссия - сделать чтение доступным и удовольствием для каждого.
        </p>
      </section>

      <Features />
    </div>
  );
}

export default Home;
