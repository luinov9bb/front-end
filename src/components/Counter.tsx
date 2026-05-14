import styles from "./Counter.module.css";

type CounterProps = {
  count: number;
  centered?: boolean;
};

function Counter({ count, centered }: CounterProps) {
  return (
    <p className={`${styles.p} ${centered ? styles.pCenter : ""}`.trim()}>Найдено книг: {count}</p>
  );
}

export default Counter;
