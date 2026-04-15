// TypeScript Interfaces

export type BookCategory = 'programming' | 'fiction' | 'western' | 'finance' | 'roman';

export interface Book {
  id: number;
  name: string;
  price: number;
  category: BookCategory;
  image: string;
  description: string;
  author: string;
  rating: number;
  reviews_count: number;
  in_stock: number;
}

export interface Review {
  id: number;
  book_id: number;
  user_id: number;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface Order {
  id: number;
  user_id: number;
  book_ids: number[];
  total_price: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  created_at: string;
  updated_at: string;
}

// Mock Books Data

export const mockBooks: Book[] = [
  {
    id: 1,
    name: "Мастер и Маргарита",
    price: 800,
    category: "roman",
    image: "https://picsum.photos/200?1",
    author: "Михаил Булгаков",
    description: "Классический роман о любви, творчестве и борьбе со сложностью мира. История переплетает две линии: действия в советской Москве 1930-х годов и истории Понтия Пилата и Иешуа из далеких времен.",
    rating: 4.9,
    reviews_count: 342,
    in_stock: 15,
  },
  {
    id: 2,
    name: "Чистый код",
    price: 1200,
    category: "programming",
    image: "https://picsum.photos/200?2",
    author: "Роберт Мартин",
    description: "Практическое руководство по написанию качественного кода. Книга раскрывает лучшие практики программирования, от именования переменных до архитектуры систем. Незаменимый справочник для разработчиков.",
    rating: 4.7,
    reviews_count: 156,
    in_stock: 8,
  },
  {
    id: 3,
    name: "Властелин Колец",
    price: 1500,
    category: "fiction",
    image: "https://cdn.librarius.md/img/original/vlastelin-kolec_1486810851.jpg",
    author: "Джон Толкиен",
    description: "Эпическое фэнтези о борьбе добра и зла, героических путешествиях и дружбе. История хоббита Фродо и его приключениях в мире Средиземья покорила сердца миллионов читателей.",
    rating: 4.8,
    reviews_count: 512,
    in_stock: 12,
  },
  {
    id: 4,
    name: "React для новичков",
    price: 950,
    category: "programming",
    image: "https://picsum.photos/200?3",
    author: "Алекс Бэнкс, Ева Порцелло",
    description: "Введение в React для начинающих разработчиков. Пошаговое руководство от установки до создания полнофункциональных приложений. Включает практические примеры и ошибки, которых стоит избежать.",
    rating: 4.6,
    reviews_count: 98,
    in_stock: 20,
  },
  {
    id: 5,
    name: "Кровавый Меридиан",
    price: 500,
    category: "western",
    image: "https://picsum.photos/200?4",
    author: "Кормак Маккарти",
    description: "Жестокий и поэтичный вестерн о путешествии охотников на скальпы через Техас и Мексику в XIX веке. Темная, философская работа о природе насилия и человеческой морали.",
    rating: 4.3,
    reviews_count: 87,
    in_stock: 6,
  },
  {
    id: 6,
    name: "Самый богатый человек в Вавилоне",
    price: 290,
    category: "finance",
    image: "https://picsum.photos/200?5",
    author: "Джордж Клейсон",
    description: "Классическое руководство по финансовой грамотности в форме вавилонских притч. Простые и мудрые советы о накоплении богатства, инвестировании и управлении деньгами, применимые и в современном мире.",
    rating: 4.5,
    reviews_count: 234,
    in_stock: 25,
  },
];

// Mock Users Data

export const mockUsers: User[] = [
  {
    id: 1,
    username: "admin",
    email: "admin@bookstore.com",
    password: "admin123",
    role: "admin",
    created_at: new Date("2024-01-01").toISOString(),
    updated_at: new Date("2024-01-01").toISOString(),
  },
  {
    id: 2,
    username: "johndoe",
    email: "john@example.com",
    password: "password123",
    role: "user",
    created_at: new Date("2024-01-15").toISOString(),
    updated_at: new Date("2024-01-15").toISOString(),
  },
];

// Mock Reviews Data

export const mockReviews: Review[] = [
  {
    id: 1,
    book_id: 1,
    user_id: 2,
    user_name: "John Doe",
    rating: 5,
    comment: "Шедевр русской литературы! Невозможно оторваться от чтения.",
    created_at: new Date("2024-02-01").toISOString(),
  },
  {
    id: 2,
    book_id: 2,
    user_id: 2,
    user_name: "John Doe",
    rating: 4,
    comment: "Полезная книга для любого разработчика. Рекомендую!",
    created_at: new Date("2024-02-05").toISOString(),
  },
];

// Mock Orders Data

export const mockOrders: Order[] = [
  {
    id: 1,
    user_id: 2,
    book_ids: [1, 2],
    total_price: 2000,
    status: "delivered",
    created_at: new Date("2024-02-10").toISOString(),
    updated_at: new Date("2024-02-15").toISOString(),
  },
];

// LocalStorage Keys

const STORAGE_KEYS = {
  BOOKS: "bookstore_books",
  USERS: "bookstore_users",
  REVIEWS: "bookstore_reviews",
  ORDERS: "bookstore_orders",
  DB_INITIALIZED: "bookstore_db_initialized",
};

// Initialize Database in LocalStorage

export function initializeDB(): void {
  // Check if DB is already initialized
  if (localStorage.getItem(STORAGE_KEYS.DB_INITIALIZED)) {
    return;
  }

  // Save all mock data to localStorage
  localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(mockBooks));
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(mockUsers));
  localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(mockReviews));
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(mockOrders));
  localStorage.setItem(STORAGE_KEYS.DB_INITIALIZED, "true");

  console.log("✅ Mock database initialized successfully!");
}

// Get data from localStorage

export function getBooks(): Book[] {
  const data = localStorage.getItem(STORAGE_KEYS.BOOKS);
  return data ? JSON.parse(data) : [];
}

export function getUsers(): User[] {
  const data = localStorage.getItem(STORAGE_KEYS.USERS);
  return data ? JSON.parse(data) : [];
}

export function getReviews(): Review[] {
  const data = localStorage.getItem(STORAGE_KEYS.REVIEWS);
  return data ? JSON.parse(data) : [];
}

export function getOrders(): Order[] {
  const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
  return data ? JSON.parse(data) : [];
}

// Add new item functions

export function addBook(book: Book): void {
  const books = getBooks();
  const newBook = { ...book, id: Math.max(...books.map((b) => b.id), 0) + 1 };
  books.push(newBook);
  localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(books));
}

export function addUser(user: User): void {
  const users = getUsers();
  const newUser = { ...user, id: Math.max(...users.map((u) => u.id), 0) + 1 };
  users.push(newUser);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

export function addReview(review: Review): void {
  const reviews = getReviews();
  const newReview = { ...review, id: Math.max(...reviews.map((r) => r.id), 0) + 1 };
  reviews.push(newReview);
  localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
}

export function addOrder(order: Order): void {
  const orders = getOrders();
  const newOrder = { ...order, id: Math.max(...orders.map((o) => o.id), 0) + 1 };
  orders.push(newOrder);
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
}

// Update functions

export function updateBook(id: number, updates: Partial<Book>): void {
  const books = getBooks();
  const index = books.findIndex((b) => b.id === id);
  if (index !== -1) {
    books[index] = { ...books[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(books));
  }
}

export function updateUser(id: number, updates: Partial<User>): void {
  const users = getUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }
}

export function updateOrder(id: number, updates: Partial<Order>): void {
  const orders = getOrders();
  const index = orders.findIndex((o) => o.id === id);
  if (index !== -1) {
    orders[index] = { ...orders[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }
}

// Delete functions

export function deleteBook(id: number): void {
  const books = getBooks();
  const filtered = books.filter((b) => b.id !== id);
  localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(filtered));
}

export function deleteOrder(id: number): void {
  const orders = getOrders();
  const filtered = orders.filter((o) => o.id !== id);
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(filtered));
}

// Find functions

export function findBookById(id: number): Book | undefined {
  return getBooks().find((b) => b.id === id);
}

export function findUserByUsername(username: string): User | undefined {
  return getUsers().find((u) => u.username === username);
}

export function findUserById(id: number): User | undefined {
  return getUsers().find((u) => u.id === id);
}

export function findBooksByCategory(category: BookCategory): Book[] {
  return getBooks().filter((b) => b.category === category);
}

export function findOrdersByUserId(userId: number): Order[] {
  return getOrders().filter((o) => o.user_id === userId);
}

export function findReviewsByBookId(bookId: number): Review[] {
  return getReviews().filter((r) => r.book_id === bookId);
}

// Clear all data (for testing/reset)

export function clearDB(): void {
  localStorage.removeItem(STORAGE_KEYS.BOOKS);
  localStorage.removeItem(STORAGE_KEYS.USERS);
  localStorage.removeItem(STORAGE_KEYS.REVIEWS);
  localStorage.removeItem(STORAGE_KEYS.ORDERS);
  localStorage.removeItem(STORAGE_KEYS.DB_INITIALIZED);
  console.log("🗑️  Mock database cleared!");
}
