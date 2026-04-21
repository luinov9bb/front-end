import styles from "./FilterButtons.module.css";

type FilterButtonsProps = {
  genres: string[];
  selectedGenre: string;
  setCategory: (value: string) => void;
};

function FilterButtons({ genres, selectedGenre, setCategory }: FilterButtonsProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Жанры</h2>
      <button
        type="button"
        className={selectedGenre === "All" ? styles.active : undefined}
        onClick={() => setCategory("All")}
      >
        Все жанры
      </button>
      {genres.map((genre) => (
        <button
          key={genre}
          type="button"
          className={selectedGenre === genre ? styles.active : undefined}
          onClick={() => setCategory(genre)}
        >
          {genre}
        </button>
      ))}
    </section>
  );
}

export default FilterButtons;
