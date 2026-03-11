export type Product = {
    id: number
    name: string
    price: number
    category: string
    image: string
  }
  
  export const products: Product[] = [
    {
      id: 1,
      name: "Clean Code",
      price: 35,
      category: "programming",
      image: "https://picsum.photos/200?1"
    },
    {
      id: 2,
      name: "The Pragmatic Programmer",
      price: 40,
      category: "programming",
      image: "https://picsum.photos/200?2"
    },
    {
      id: 3,
      name: "Atomic Habits",
      price: 20,
      category: "selfdev",
      image: "https://picsum.photos/200?3"
    },
    {
      id: 4,
      name: "Deep Work",
      price: 22,
      category: "selfdev",
      image: "https://picsum.photos/200?4"
    },
    {
      id: 5,
      name: "1984",
      price: 15,
      category: "fiction",
      image: "https://picsum.photos/200?5"
    },
    {
      id: 6,
      name: "Dune",
      price: 18,
      category: "fiction",
      image: "https://picsum.photos/200?6"
    }
  ]