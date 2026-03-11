export type Product = { id: number; name: string; price: number; category: string; image: string;}

export const products: Product[] = [
    { id: 1, name: "Мастер и Маргарита", price: 800, category: "roman", image: "https://picsum.photos/200?1" },
    { id: 2, name: "Чистый код", price: 1200, category: "programming", image: "https://picsum.photos/200?2" },
    { id: 3, name: "Властелин Колец", price: 1500, category: "fiction", image: "https://cdn.librarius.md/img/original/vlastelin-kolec_1486810851.jpg" },
    { id: 4, name: "React для новичков", price: 950, category: "programming", image: "https://picsum.photos/200?3" },
    { id: 5, name: "Кровавый Меридиан", price: 500, category: "western", image: "https://picsum.photos/200?4"},
    { id: 6, name: "Самый богатый человек в Вавилоне", price: 290, category: "finance", image: "https://picsum.photos/200?5"},
]

