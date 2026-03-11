type CounterProps={
  count:number;
}

function Counter({count}:CounterProps){
  return (
      <p>Найденные книги: {count}</p>
  )
}

export default Counter