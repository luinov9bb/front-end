type Props = {
    setCategory: (value: string) => void
  }
  
  function FilterButtons({ setCategory }: Props) {
    return (
      <section>
        <button onClick={() => setCategory("all")}>All</button>
        <button onClick={() => setCategory("programming")}>Programming</button>
        <button onClick={() => setCategory("fiction")}>Fiction</button>
        <button onClick={() => setCategory("selfdev")}>Self Development</button>
      </section>
    )
  }
  
  export default FilterButtons