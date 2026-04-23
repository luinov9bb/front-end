export type BookId = string | number;

export interface Book {
  id: BookId;
  title: string;
  author: string;
  genres: string[];
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

// Основной список книг. Меняйте данные прямо здесь.
export const mockBooks: Book[] = [
  {
    id: 1,
    title: "Мастер и Маргарита",
    author: "Михаил Булгаков",
    genres: ["Классика", "Мистика", "Роман"],
    price: 133,
    year: 2024,
    pages: 480,
    annotation:
      "«Мастер и Маргарита» М.А. Булгакова — культовый многоуровневый роман, сочетающий сатиру, мистику и философию. В центре сюжета — визит сатаны (Воланда) в советскую Москву 1930-х, история любви Мастера и Маргариты, а также библейская драма Понтия Пилата и Иешуа. Произведение исследует темы добра и зла, творческой свободы и нравственного выбора. «Мастер и Маргарита» — загадочное произведение, которое, несмотря на запреты в советское время, стало одним из самых популярных романов XX века.",
    coverImage:
      "https://res.cloudinary.com/dnfj4t9cq/image/upload/v1776877699/image001_ths5xp.jpg",
  },
  {
    id: 2,
    title: "Властелин колец. Хранители Кольца",
    author: "Дж. Р. Р. Толкин",
    genres: ["Фэнтези", "Приключения"],
    price: 232,
    year: 2018,
    pages: 448,
    annotation:
      "\"Властелин Колец\" Джона Толкина повествует о Великой войне за Кольцо, о войне, длившейся не одну тысячу лет. Овладевший Кольцом получает власть над всем живым и мертвым, но при этом должен служить злу. Юному хоббиту Фродо выпадает участь уничтожить Кольцо. Он отправляется через Мордор к огненной Горе Судьбы, в которой кольцо было отлито, и только там, в адском пекле, оно может быть уничтожено. Фродо и его друзьям, среди которых эльфы, гномы и люди, противостоит Саурон, желающий вернуть свое драгоценное Кольцо и обрести власть над миром.",
    coverImage:
      "https://res.cloudinary.com/dnfj4t9cq/image/upload/v1776877749/image004_wsogci.jpg",
  },
  {
    id: 3,
    title: "Янки из коннектитута при дворе Короля Артура",
    author: "Джон Р. Р. Толкин",
    genres: ["Сатира", "Приключения"],
    price: 220,
    year: 2018,
    pages: 348,
    annotation:
      "Действие романа Марка Твена разворачивается в Англии 6-го века. Хэнк Морган, живущий в Восточном Хартфорде, штат Коннектикут, в 19-м веке, после удара по голове просыпается и обнаруживает, что необъяснимым образом перенесся назад во времени в средневековую Англию, где он встречает самого короля Артура. Хэнк, чей образ того времени годами расцвечивался романтическими мифами, берет на себя задачу проанализировать проблемы и поделиться своими знаниями, накопленными в будущем, чтобы попытаться модернизировать, американизировать и улучшить жизнь людей. Книга высмеивает современное общество, но основной темой является сатира на романтизированные идеи рыцарства и идеализацию средневековья, распространенные в романах сэра Вальтера Скотта и других авторов подобной литературы 19 века.",
    coverImage:
      "https://res.cloudinary.com/dnfj4t9cq/image/upload/v1776877913/image005_xz3lqk.jpg",
  },
  {
    id: 4,
    title: "Мюнхен",
    author: "Харрис Р.",
    genres: ["Триллер", "История"],
    price: 112,
    year: 2026,
    pages: 656,
    annotation:
      "1938 год. Германия не готова к войне, но Гитлер намерен захватить Чехословакию. Великобритания не готова к войне, но обязана выступить вместе с Францией в защиту чехов. Премьер-министр Чемберлен добивается от Гитлера согласия на встречу, надеясь достичь компромисса. Хью Легат — восходящая звезда британской дипломатии, личный секретарь Чемберлена. Пауль фон Хартманн — сотрудник германского МИДа и участник антигитлеровского заговора. Эти люди дружили, когда в 1920-х учились в Оксфорде, но с тех пор не имели контактов. И вот теперь им предстоит встреча в Мюнхене. Один отправляется туда, чтобы любой ценой предотвратить новую мировую войну, другой — чтобы развязать ее немедленно.",
    coverImage:
      "https://res.cloudinary.com/dnfj4t9cq/image/upload/v1776877938/image007_zget82.jpg",
  },
  {
    id: 5,
    title: "Вино из одуванчиков",
    author: "Брэдбери Р. Д.",
    genres: ["Фантастика"],
    price: 160,
    year: 2024,
    pages: 256,
    annotation:
      "Яркое, фантастическое лето 1928 года: двенадцатилетний Дуглас Сполдинг ведет записи о событиях того лета, которые складываются в отдельные истории, гротескные искажения ординарных будней маленького городка, где живут Дуглас и его семья. Там все кажется не тем, чем является, а сила детского воображения создает новую реальность, которую не отличить от вымысла. Выросший из отдельных рассказов, филигранных в своей лиричности, роман «Вино из одуванчиков» — классическая хроника детства Рэя Брэдбери, окно в творческий мир писателя, создавшего такие шедевры мировой литературы, как «Марсианские хроники» и «451 градус по Фаренгейту». «Держи лето в ладони, налей лето в стакан, совсем крошечный, разумеется, ведь детям полагается малюсенький глоточек с горчинкой; пригуби лета из бокала — и в твоих жилах переменится время года».",
    coverImage:
      "https://res.cloudinary.com/dnfj4t9cq/image/upload/v1776877943/image009_z43ujm.jpg",
  },
  {
    id: 6,
    title: "Рыцарь Семи Королевств",
    author: "Мартин Дж. Р. Р.",
    genres: ["Фэнтези", "Приключения"],
    price: 320,
    year: 2026,
    pages: 640,
    annotation: 
    "За сто лет до восстания Роберта Баратеона и рождения Дейенерис Бурерожденной. Уже отгремела кровопролитная Пляска драконов и вымерли последние крылатые ящеры, но Железный трон по-прежнему занимают короли из династии Таргариенов, а слова честь и доблесть еще не утратили былой силы. А по дорогам Вестероса в сопровождении верного оруженосца Эгга странствует наивный и благородный рыцарь Дункан Высокий. В будущем эту парочку ждут великая судьба, могущественные враги и опасные подвиги, но пока что оба еще молоды и лишь мечтают о славе и приключениях. И первая цель Дунка — победа на турнире в Эшфорде, который почтит своим присутствием сам король. А поскольку проигравшие должны будут отдать свои доспехи и коней победителю, второго шанса на успех у Дунка не будет.",
    coverImage: 
    "https://res.cloudinary.com/dnfj4t9cq/image/upload/v1776877950/image012_c6c7zu.jpg",
  },
  {
    id: 7,
    title: "Властелин Колец. Две твердыни",
    author: "Толкин Дж. Р. Р",
    genres: ["Фэнтези", "Приключения"],
    price: 278,
    year: 2024,
    pages: 420,
    annotation: 
    "«Две башни» — второй том эпической фэнтезийной саги Дж. Р. Р. Толкина «Властелин колец». Опубликованная в 1954 году, эта часть продолжает опасное путешествие Фродо Бэггинса и Сэмвайза Гэмджи, которые пытаются уничтожить Единое Кольцо Саурона и помешать Тёмному Властелину вернуть себе истинную силу . Отряд хранителей Кольца распадается, а война приходит на земли Рохана — государства вольных Всадников, союзников Гондора. Арагорн, Гимли и Леголас вместе с младшими хоббитами помогают рохирримам в жестокой битве против сил темного мага Сарумана, дорога же Фродо и Сэма лежит к Изгарным горам и далее, в мрачную крепость Кирит-Унгол, где открывается потайной ход в Темную страну",
    coverImage: 
    "https://res.cloudinary.com/dnfj4t9cq/image/upload/v1776877956/image014_izlrqk.jpg",
  },
   {
    id: 8,
    title: "Призраки воды",
    author: "Тремейн С. К.",
    genres: ["Триллер", "Мистика", "Роман"],
    price: 195,
    year: 2026,
    pages: 320,
    annotation: 
    "Осенним утром Натали Тьяк, молодую мать, находят мертвой у подножия скалы в отдаленном Пенуите на западе Корнуолла. Полиция в недоумении: убийство, самоубийство, несчастный случай? Спустя год двое детей Натали, Грейс и Соломон, живущие в старом поместье со своим отцом Малколмом, начинают странно себя вести. Их загадочные высказывания и поступки наводят на мысль, что они знают о смерти своей матери больше, чем готовы рассказать. Полиция снова в тупике. Детям явно нужна психологическая помощь, и за дело берется судебный психолог Каренза Брей, но когда она приезжает в старый особняк, затерянный в сказочной лесной долине на берегу сурового моря, то понимает, что тайна гораздо более загадочна и опасна, чем всё, с чем она имела дело раньше. Стараясь помочь детям, Каренза начинает искать корни трагедии в прошлом и с изумлением осознаёт, что случай, с которым она столкнулась, — наглядный пример модной теории психологической эпигенетики, согласно которой психологическая травма передается по наследству из поколения в поколение.",
    coverImage: 
    "https://res.cloudinary.com/dnfj4t9cq/image/upload/v1776877965/image016_jxaob3.jpg",
  },
   {
    id: 9,
    title: "Четвертая форма денег. Путь героя или Как избавиться от негативных сценариев",
    author: "Марьевич Ирина",
    genres: ["Финансы", "Саморазвитие"],
    price: 295,
    year: 2026,
    pages: 272,
    annotation: 
    "Эта книга способна перевернуть привычное представление о деньгах: психолог Ирина Марьевич предлагает рассматривать финансовое благополучие не как результат правильных инвестиций или усердной работы, а как следствие внутренней зрелости и качества отношений. Автор вводит понятие «четвертой формы денег» — отношений и утверждает, что именно они на самом деле есть истинный источник изобилия в жизни человека. Книга выстроена как путь читателя от сепарации к проявленности и далее к созданию отношений нового качества. Через яркие терапевтические кейсы и практические инструменты Марьевич показывает возможности трансформации: как отделиться от родительских сценариев, обрести внутреннее согласие с собой и выстроить систему связей, которая естественным образом притягивает ресурсы. Ведь итоговая формула проста, в ней деньги — побочный эффект правильно выстроенных отношений с собой и миром.",
    coverImage: 
    "https://res.cloudinary.com/dnfj4t9cq/image/upload/v1776877971/image018_oybsxo.jpg",
  },
   {
    id: 10,
    title: "Стив Джобс. Лучшее",
    author: "Стив Джобс",
    genres: ["Финансы", "Саморазвитие"],
    price: 446,
    year: 2026,
    pages: 278,
    annotation: 
    "Книга 'Стив Джобс. Лучшее' от журналиста Джорджа Бима представляет собой уникальную коллекцию самых вдохновляющих и мощных цитат одного из величайших визионеров современности. Стив Джобс, сооснователь Apple и Pixar, оставил после себя наследие, полное гениальных идей и философии успеха. Эта книга станет незаменимым источником мотивации для молодых людей и предпринимателей, стремящихся к инновациям и самосовершенствованию. В ней собраны мысли о создании великих продуктов, о том, как важно делать то, что любишь, и о том, что истинное богатство заключается в создании прекрасного. Читайте и вдохновляйтесь на собственные достижения!",
    coverImage: 
    "https://res.cloudinary.com/dnfj4t9cq/image/upload/v1776877976/image020_orhdlf.jpg",
  },
   {
    id: 11,
    title: "Финансы для нефинансистов",
    author: "Людмила Ярухина",
    genres: ["Финансы", "Саморазвитие"],
    price: 455,
    year: 2025,
    pages: 221,
    annotation: 
    "Практическое издание по бизнесу и экономике от автора экономического бестселлера (Финансы для нефинансистов). Людмила Ярухина — финансовый эксперт, бизнес-тренер, преподаватель MBA и CFO более 20 лет. Директор дистанционного обучения FinCourse. Людмила Ярухина разработала уникальные карточки с матчастью, теорией и практическими заданиями. Внутри — пять ключевых блоков для понимания финансов: диагностика, деньги, финансовая отчётность, оборотный капитал и прибыль. Эти блоки помогут разобраться в финансах компании предпринимателям, менеджерам и руководителям.",
    coverImage: 
    "https://res.cloudinary.com/dnfj4t9cq/image/upload/v1776877981/image022_qzghoy.jpg",
  },
   {
    id: 12,
    title: "Долгая Прогулка",
    author: "Стивен Кинг",
    genres: ["Мистика", "Ужасы"],
    price: 105,
    year: 2017,
    pages: 352,
    annotation: 
    "Это была страшная игра — игра на выживание. Это была Долгая Прогулка. Прогулка со Смертью, ибо смерть ожидала каждого упавшего. Дорога к счастью — потому что победивший в игре получал все. На долгую прогулку вышли многие — но закончит ее только один. Остальные лягут мертвыми на дороге — потому что дорога к счастью для одного станет последней дорогой для многих.",
    coverImage: 
    "https://res.cloudinary.com/dnfj4t9cq/image/upload/v1776877987/image024_n6xa9e.jpg",
  },
   {
    id: 13,
    title: "Замок Отранто",
    author: "Гораций Уолпол",
    genres: ["Мистика", "Ужасы"],
    price: 155,
    year: 2025,
    pages: 224,
    annotation: 
    "Книга, полная мистики, тайн и загадок. Проклятие, наложенное на род князя Манфреда, приводит к жуткой гибели наследника. Отчаявшийся Манфред пытается обмануть судьбу, совершая новые преступления. Замок Отранто — произведение, положившее начало жанру готического романа. Средневековый замок, зловещее пророчество, мстительные призраки и роковые тайны — Уолпол виртуозно смешивает реальное и сверхъестественное. Даже первое издание было мистификацией: Уолпол выдал роман за перевод древнего итальянского текста, найденного в Отранто. Но уже в предисловии ко второму изданию признал свое авторство. История о тиране Манфреде, который пытается удержать власть, начинается со смерти его сына, раздавленного гигантским шлемом, и оборачивается кошмаром, где судьбы живых решает мрачное прошлое.",
    coverImage: 
    "https://res.cloudinary.com/dnfj4t9cq/image/upload/v1776877992/image026_fk7xkk.jpg",
  },
   {
    id: 14,
    title: "Собор Парижской Богоматери",
    author: "Виктор Гюго",
    genres: ["Роман", "История", "Классика"],
    price: 160,
    year: 2022,
    pages: 576,
    annotation: 
    "Средневековый Париж. Уродливый горбун Квазимодо влюблен в красавицу-цыганку Эсмеральду, но остается ей всего лишь верным другом. И злобный архидьякон Клод Фролло тайно страдает от любви к ней. Не в силах побороть свою страсть, он использует власть, чтобы жестоко наказать девушку. Сможет ли Квазимодо защитить Эсмеральду от несправедливого обвинения и спасти свою любовь?",
    coverImage: 
    "https://res.cloudinary.com/dnfj4t9cq/image/upload/v1776878003/image030_vcbw8d.jpg",
  },
   {
    id: 15,
    title: "Преступление и наказание",
    author: "Фёдор Достоевский",
    genres: ["Роман", "Классика"],
    price: 110,
    year: 2019,
    pages: 672,
    annotation: 
    "Криминальная история, начало которой положил вопрос: «Тварь ли я дрожащая или право имею?», оборачивается душевными исканиями героя. Совершив преступление, студент Раскольников не находит подтверждения собственным идеям о человеческом предназначении и нуждается в искуплении, благодаря которому могла бы засиять «заря обновленного будущего, полного воскресения в новую жизнь».",
    coverImage: 
    "https://res.cloudinary.com/dnfj4t9cq/image/upload/v1776878008/image032_a44c9f.jpg",
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
    Array.isArray(book.genres) &&
    book.genres.every((genre) => typeof genre === "string") &&
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
  return getBooks().filter((book) => book.genres.includes(genre));
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
