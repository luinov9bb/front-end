import AboutStyles from "../pages/About.module.css";
import homeStyles from "../pages/Home.module.css";
import Carousel from "../components/Carousel";
import Features from "../components/Features";

function Home() {
  const carouselSlides = [
    {
      id: 1,
      image: "https://www.mirf.ru/backend/wp-content/uploads/2018/05/5e63e0242e67a2340a2f7d098d4ca2c2.jpg",
      title: "Книги по литературе",
    },
    {
      id: 2,
      image: "https://main-cdn.sbermegamarket.ru/big1/hlr-system/1628137/100001820150b0.jpg",
      title: "Популярные издания",
    },
    {
      id: 3,
      image: "https://ir.ozone.ru/s3/multimedia-1-7/c1000/6915613975.jpg",
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
