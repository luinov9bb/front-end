import styles from "./FilterButtons.module.css";

type FilterButtonsProps = {
  setCategory: (value: string) => void
}

function FilterButtons({ setCategory} : FilterButtonsProps){
  return (
      <section className={styles.section}>
          <button onClick={() => setCategory("All")}>Все жанры</button>
          <button onClick={() => setCategory("programming")}>Программирование</button>
          <button onClick={() => setCategory("fiction")}>Фэнтези</button>
          <button onClick={() => setCategory("finance")}>Финансы</button>
          <button onClick={() => setCategory("western")}>Вестерн</button>
          <button onClick={() => setCategory("roman")}>Романы</button>
      </section>
  )
}

export default FilterButtons