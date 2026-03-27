import { useState, useEffect } from "react";
import styles from "./Carousel.module.css";

interface CarouselSlide {
  id: number;
  image: string;
  title?: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

function Carousel({ slides, autoPlay = true, autoPlayInterval = 5000 }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.carouselContainer}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${index === currentSlide ? styles.active : ""}`}
          >
            <img src={slide.image} alt={slide.title || `Slide ${index + 1}`} />
          </div>
        ))}

        <button className={styles.prevButton} onClick={prevSlide} aria-label="Предыдущий слайд">
          ‹
        </button>
        <button className={styles.nextButton} onClick={nextSlide} aria-label="Следующий слайд">
          ›
        </button>
      </div>

      <div className={styles.dots}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Слайд ${index + 1}`}
          />
        ))}
      </div>

      <div className={styles.counter}>
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
}

export default Carousel;
