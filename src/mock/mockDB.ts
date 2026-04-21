export type BookId = string | number;

export interface Book {
  id: BookId;
  title: string;
  author: string;
  genre: string;
  price: number;
  year: number;
  pages: number;
  annotation: string;
  coverImage: string;
}

export interface Review {
  id: number;
  book_id: BookId;
  user_id: number;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface Order {
  id: number;
  user_id: number;
  book_ids: BookId[];
  total_price: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: "admin" | "user";
  created_at: string;
  updated_at: string;
}

export const mockBooks: Book[] = [
  {
    id: 1,
    title: "Мастер и Маргарита",
    author: "Булгаков М.А.",
    genre: "Классика",
    price: 389,
    year: 2024,
    pages: 480,
    annotation:
      "«Мастер и Маргарита» М.А. Булгакова — культовый многоуровневый роман, сочетающий сатиру, мистику и философию. В центре сюжета — визит сатаны (Воланда) в советскую Москву 1930-х, история любви Мастера и Маргариты, а также библейская драма Понтия Пилата и Иешуа. Произведение исследует темы добра и зла, творческой свободы и нравственного выбора. «Мастер и Маргарита» — загадочное произведение, которое, несмотря на запреты в советское время, стало одним из самых популярных романов XX века.",
    coverImage:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Чистый код",
    author: "Роберт Мартин",
    genre: "Программирование",
    price: 640,
    year: 2008,
    pages: 464,
    annotation:
      "Практическая книга о том, как писать понятный, поддерживаемый и профессиональный код. Подходит разработчикам, которые хотят улучшить архитектурное мышление и рабочие привычки.",
    coverImage:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Властелин колец",
    author: "Джон Р. Р. Толкин",
    genre: "Фэнтези",
    price: 720,
    year: 1954,
    pages: 1216,
    annotation:
      "Эпическое путешествие по Средиземью, где дружба, мужество и жертва становятся главной силой в борьбе со злом. Книга, определившая жанр высокого фэнтези на десятилетия вперёд.",
    coverImage:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    title: "Думай медленно... решай быстро",
    author: "Даниэль Канеман",
    genre: "Психология",
    price: 560,
    year: 2011,
    pages: 656,
    annotation:
      "Исследование того, как устроено человеческое мышление: интуитивное, быстрое и эмоциональное с одной стороны, и медленное, аналитическое с другой. Полезна для работы, бизнеса и повседневных решений.",
    coverImage:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    title: "Самый богатый человек в Вавилоне",
    author: "Джордж Сэмюэль Клейсон",
    genre: "Финансы",
    price: 295,
    year: 1926,
    pages: 224,
    annotation:
      "Классика финансовой грамотности в форме коротких притч. Простые принципы накопления, дисциплины и разумного обращения с деньгами изложены легко и по делу.",
    coverImage:
      "https://images.unsplash.com/photo-1511108690759-009324a90311?auto=format&fit=crop&w=900&q=80",
  },
];

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

export const mockReviews: Review[] = [
  {
    id: 1,
    book_id: 1,
    user_id: 2,
    user_name: "John Doe",
    rating: 5,
    comment: "Одна из тех книг, к которым хочется возвращаться снова.",
    created_at: new Date("2024-02-01").toISOString(),
  },
  {
    id: 2,
    book_id: 2,
    user_id: 2,
    user_name: "John Doe",
    rating: 4,
    comment: "Очень полезная книга для тех, кто хочет писать чище и понятнее.",
    created_at: new Date("2024-02-05").toISOString(),
  },
];

export const mockOrders: Order[] = [
  {
    id: 1,
    user_id: 2,
    book_ids: [1, 2],
    total_price: 1029,
    status: "delivered",
    created_at: new Date("2024-02-10").toISOString(),
    updated_at: new Date("2024-02-15").toISOString(),
  },
];

const STORAGE_KEYS = {
  BOOKS: "bookstore_books",
  BOOKS_SNAPSHOT: "bookstore_books_snapshot",
  USERS: "bookstore_users",
  REVIEWS: "bookstore_reviews",
  ORDERS: "bookstore_orders",
  DB_INITIALIZED: "bookstore_db_initialized",
};

function getMockBooksSnapshot(): string {
  return JSON.stringify(mockBooks);
}

function isBook(value: unknown): value is Book {
  if (!value || typeof value !== "object") {
    return false;
  }

  const book = value as Record<string, unknown>;

  return (
    (typeof book.id === "number" || typeof book.id === "string") &&
    typeof book.title === "string" &&
    typeof book.author === "string" &&
    typeof book.genre === "string" &&
    typeof book.price === "number" &&
    typeof book.year === "number" &&
    typeof book.pages === "number" &&
    typeof book.annotation === "string" &&
    typeof book.coverImage === "string"
  );
}

function hasValidStoredBooks(): boolean {
  const rawBooks = localStorage.getItem(STORAGE_KEYS.BOOKS);
  if (!rawBooks) {
    return false;
  }

  try {
    const parsed = JSON.parse(rawBooks);
    return Array.isArray(parsed) && parsed.every(isBook);
  } catch {
    return false;
  }
}

function getNextBookNumericId(books: Book[]): number {
  const numericIds = books
    .map((book) => (typeof book.id === "number" ? book.id : Number.NaN))
    .filter((id) => !Number.isNaN(id));

  return Math.max(0, ...numericIds) + 1;
}

export function initializeDB(): void {
  const booksSnapshot = getMockBooksSnapshot();
  const storedSnapshot = localStorage.getItem(STORAGE_KEYS.BOOKS_SNAPSHOT);
  const shouldSeed =
    !localStorage.getItem(STORAGE_KEYS.DB_INITIALIZED) ||
    !hasValidStoredBooks() ||
    storedSnapshot !== booksSnapshot;

  if (!shouldSeed) {
    return;
  }

  localStorage.setItem(STORAGE_KEYS.BOOKS, booksSnapshot);
  localStorage.setItem(STORAGE_KEYS.BOOKS_SNAPSHOT, booksSnapshot);

  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(mockUsers));
  }

  if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(mockReviews));
  }

  if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(mockOrders));
  }

  localStorage.setItem(STORAGE_KEYS.DB_INITIALIZED, "true");
}

export function getBooks(): Book[] {
  const data = localStorage.getItem(STORAGE_KEYS.BOOKS);

  if (!data) {
    return [...mockBooks];
  }

  try {
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.every(isBook) ? parsed : [...mockBooks];
  } catch {
    return [...mockBooks];
  }
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

export function addBook(book: Book): void {
  const books = getBooks();
  const newBook: Book = {
    ...book,
    id: typeof book.id === "undefined" ? getNextBookNumericId(books) : book.id,
  };

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

export function updateBook(id: BookId, updates: Partial<Book>): void {
  const books = getBooks();
  const index = books.findIndex((book) => String(book.id) === String(id));
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

export function deleteBook(id: BookId): void {
  const books = getBooks();
  const filtered = books.filter((book) => String(book.id) !== String(id));
  localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(filtered));
}

export function deleteOrder(id: number): void {
  const orders = getOrders();
  const filtered = orders.filter((o) => o.id !== id);
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(filtered));
}

export function findBookById(id: BookId): Book | undefined {
  return getBooks().find((book) => String(book.id) === String(id));
}

export function findUserByUsername(username: string): User | undefined {
  return getUsers().find((u) => u.username === username);
}

export function findUserById(id: number): User | undefined {
  return getUsers().find((u) => u.id === id);
}

export function findBooksByGenre(genre: string): Book[] {
  return getBooks().filter((book) => book.genre === genre);
}

export function findOrdersByUserId(userId: number): Order[] {
  return getOrders().filter((o) => o.user_id === userId);
}

export function findReviewsByBookId(bookId: BookId): Review[] {
  return getReviews().filter((review) => String(review.book_id) === String(bookId));
}

export function clearDB(): void {
  localStorage.removeItem(STORAGE_KEYS.BOOKS);
  localStorage.removeItem(STORAGE_KEYS.BOOKS_SNAPSHOT);
  localStorage.removeItem(STORAGE_KEYS.USERS);
  localStorage.removeItem(STORAGE_KEYS.REVIEWS);
  localStorage.removeItem(STORAGE_KEYS.ORDERS);
  localStorage.removeItem(STORAGE_KEYS.DB_INITIALIZED);
}
