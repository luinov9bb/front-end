type Props = {
    count: number
  }
  
  function Counter({ count }: Props) {
    return (
      <p>Found books: {count}</p>
    )
  }
  
  export default Counter