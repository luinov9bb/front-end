import styles from "./Counter.module.css";

type CounterProps = {
  count: number;
};

function Counter({ count }: CounterProps) {
  return <p className={styles.p}>Найдено книг: {count}</p>;
}

export default Counter;
