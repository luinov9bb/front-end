import styles from "./FilterButtons.module.css";

type FilterButtonsProps = {
  categories: string[];
  selectedCategory: string;
  setCategory: (value: string) => void;
};

function FilterButtons({ categories, selectedCategory, setCategory }: FilterButtonsProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Категории</h2>
      <button
        type="button"
        className={selectedCategory === "All" ? styles.active : undefined}
        onClick={() => setCategory("All")}
      >
        Все категории
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          className={selectedCategory === cat ? styles.active : undefined}
          onClick={() => setCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </section>
  );
}

export default FilterButtons;
