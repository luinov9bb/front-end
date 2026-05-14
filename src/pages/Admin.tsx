import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  adminCreateBook,
  adminDeleteBook,
  adminUpdateBook,
  fetchBooks,
} from "../api/books";
import {
  adminCreateCategory,
  adminDeleteCategory,
  adminUpdateCategory,
  fetchCategories,
} from "../api/categories";
import { fetchAllOrders, adminUpdateOrderStatusRequest, adminDeleteOrderRequest } from "../api/orders";
import { fetchAllUsers, adminUpdateUser, adminSoftDeleteUser } from "../api/users";
import { fetchAllReviews, adminSetReviewApprovalRequest, adminDeleteReviewRequest } from "../api/reviews";
import { ApiError } from "../api/client";
import type { Book, Review } from "../types/catalog";
import type { CategoryDto } from "../api/categories";
import type { UserListDto } from "../api/users";
import type { OrderDto } from "../api/types/orderApi";
import styles from "./Admin.module.css";

type AdminTab = "books" | "orders" | "categories" | "users" | "reviews";

function orderStatusLabel(status: number): string {
  const labels: Record<number, string> = {
    0: "—",
    1: "Отклонён",
    2: "Принят",
    3: "Проверка",
    4: "Оплачен",
    5: "Доставлен",
    6: "Возврат",
  };
  return labels[status] ?? `Статус ${status}`;
}

const ORDER_STATUS_OPTIONS = [0, 1, 2, 3, 4, 5, 6] as const;

function formatDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "—" : d.toLocaleString("ru-RU");
}

function truncateText(text: string, maxLen: number): string {
  const t = text.trim();
  if (t.length <= maxLen) {
    return t;
  }
  return `${t.slice(0, maxLen)}…`;
}

function Admin() {
  const { isAdmin, currentUser } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<AdminTab>("books");

  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [booksLoading, setBooksLoading] = useState(false);
  const [booksError, setBooksError] = useState("");

  const [categoriesTabLoading, setCategoriesTabLoading] = useState(false);
  const [categoriesTabError, setCategoriesTabError] = useState("");

  const [users, setUsers] = useState<UserListDto[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState("");
  const [usersTabMessage, setUsersTabMessage] = useState("");
  const [usersTabError, setUsersTabError] = useState("");
  const [userEditingId, setUserEditingId] = useState<number | null>(null);
  const [userUsername, setUserUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("User");
  const [userIsActive, setUserIsActive] = useState(true);
  const [userNewPassword, setUserNewPassword] = useState("");
  const [userSaving, setUserSaving] = useState(false);
  const [userActionLoadingId, setUserActionLoadingId] = useState<number | null>(null);

  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState("");
  const [ordersTabMessage, setOrdersTabMessage] = useState("");
  const [ordersTabError, setOrdersTabError] = useState("");
  const [orderStatusDrafts, setOrderStatusDrafts] = useState<Record<number, number>>({});
  const [orderActionLoadingId, setOrderActionLoadingId] = useState<number | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const [catEditingId, setCatEditingId] = useState<number | null>(null);
  const [catName, setCatName] = useState("");
  const [catActive, setCatActive] = useState(true);
  const [catFormMessage, setCatFormMessage] = useState("");
  const [catFormError, setCatFormError] = useState("");
  const [catSaving, setCatSaving] = useState(false);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsError, setReviewsError] = useState("");
  const [reviewsTabMessage, setReviewsTabMessage] = useState("");
  const [reviewsTabError, setReviewsTabError] = useState("");
  const [reviewActionId, setReviewActionId] = useState<number | null>(null);

  useEffect(() => {
    if (!isAdmin) {
      return;
    }
    let cancelled = false;
    const load = async () => {
      if (tab !== "books") {
        return;
      }
      setBooksLoading(true);
      setBooksError("");
      try {
        await Promise.resolve();
        const [b, c] = await Promise.all([fetchBooks(), fetchCategories()]);
        if (!cancelled) {
          setBooks(b);
          setCategories(c);
        }
      } catch (e: unknown) {
        if (!cancelled) {
          setBooksError(e instanceof ApiError ? e.message : "Не удалось загрузить каталог.");
        }
      } finally {
        if (!cancelled) {
          setBooksLoading(false);
        }
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [isAdmin, tab]);

  useEffect(() => {
    if (!isAdmin) {
      return;
    }
    let cancelled = false;
    const load = async () => {
      if (tab !== "categories") {
        return;
      }
      setCategoriesTabLoading(true);
      setCategoriesTabError("");
      try {
        await Promise.resolve();
        const c = await fetchCategories();
        if (!cancelled) {
          setCategories(c);
        }
      } catch (e: unknown) {
        if (!cancelled) {
          setCategoriesTabError(e instanceof ApiError ? e.message : "Не удалось загрузить категории.");
        }
      } finally {
        if (!cancelled) {
          setCategoriesTabLoading(false);
        }
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [isAdmin, tab]);

  useEffect(() => {
    if (!isAdmin) {
      return;
    }
    let cancelled = false;
    const load = async () => {
      if (tab !== "users") {
        return;
      }
      setUsersLoading(true);
      setUsersError("");
      try {
        await Promise.resolve();
        const list = await fetchAllUsers();
        if (!cancelled) {
          setUsers(list);
        }
      } catch (e: unknown) {
        if (!cancelled) {
          setUsersError(e instanceof ApiError ? e.message : "Не удалось загрузить пользователей.");
        }
      } finally {
        if (!cancelled) {
          setUsersLoading(false);
        }
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [isAdmin, tab]);

  useEffect(() => {
    if (!isAdmin) {
      return;
    }
    let cancelled = false;
    const load = async () => {
      if (tab !== "reviews") {
        return;
      }
      setReviewsLoading(true);
      setReviewsError("");
      try {
        await Promise.resolve();
        const list = await fetchAllReviews();
        if (!cancelled) {
          setReviews(list);
        }
      } catch (e: unknown) {
        if (!cancelled) {
          setReviewsError(e instanceof ApiError ? e.message : "Не удалось загрузить отзывы.");
        }
      } finally {
        if (!cancelled) {
          setReviewsLoading(false);
        }
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [isAdmin, tab]);

  useEffect(() => {
    if (!isAdmin) {
      return;
    }
    let cancelled = false;
    const load = async () => {
      if (tab !== "orders") {
        return;
      }
      setOrdersLoading(true);
      setOrdersError("");
      try {
        await Promise.resolve();
        const list = await fetchAllOrders();
        if (!cancelled) {
          setOrders(list);
        }
      } catch (e: unknown) {
        if (!cancelled) {
          setOrdersError(e instanceof ApiError ? e.message : "Не удалось загрузить заказы.");
        }
      } finally {
        if (!cancelled) {
          setOrdersLoading(false);
        }
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [isAdmin, tab]);

  useEffect(() => {
    setOrderStatusDrafts({});
  }, [orders]);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setAuthor("");
    setCategory("");
    setDescription("");
    setPrice("");
    setStock("");
    setCoverImageUrl("");
    setFormMessage("");
    setFormError("");
  };

  const startEdit = (book: Book) => {
    setEditingId(book.id);
    setTitle(book.title);
    setAuthor(book.author);
    setCategory(book.category);
    setDescription(book.description);
    setPrice(String(book.price));
    setStock(String(book.stock));
    setCoverImageUrl(book.coverImageUrl ?? "");
    setFormMessage("");
    setFormError("");
  };

  const refreshBooks = async () => {
    const b = await fetchBooks();
    setBooks(b);
  };

  const handleSubmitBook = async (e: FormEvent) => {
    e.preventDefault();
    setFormMessage("");
    setFormError("");
    const priceNum = Number(price);
    const stockNum = Number.parseInt(stock, 10);
    if (!title.trim()) {
      setFormError("Укажите название.");
      return;
    }
    if (!Number.isFinite(priceNum) || priceNum < 0) {
      setFormError("Укажите корректную цену.");
      return;
    }
    if (!Number.isFinite(stockNum) || stockNum < 0 || Number.isNaN(stockNum)) {
      setFormError("Укажите корректный остаток.");
      return;
    }
    setSaving(true);
    try {
      if (editingId === null) {
        const res = await adminCreateBook({
          title: title.trim(),
          author: author.trim(),
          category: category.trim(),
          description: description.trim(),
          price: priceNum,
          stock: stockNum,
          coverImageUrl: coverImageUrl.trim() || null,
        });
        if (!res.isSuccess) {
          setFormError(res.message);
          return;
        }
        setFormMessage(res.message);
        resetForm();
        await refreshBooks();
      } else {
        const res = await adminUpdateBook({
          id: editingId,
          title: title.trim(),
          author: author.trim(),
          category: category.trim(),
          description: description.trim(),
          price: priceNum,
          stock: stockNum,
          isDeleted: false,
          coverImageUrl: coverImageUrl.trim() || null,
        });
        if (!res.isSuccess) {
          setFormError(res.message);
          return;
        }
        setFormMessage(res.message);
        resetForm();
        await refreshBooks();
      }
    } catch (err: unknown) {
      setFormError(err instanceof ApiError ? err.message : "Ошибка запроса.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteBook = async (id: number) => {
    if (!window.confirm("Скрыть книгу из каталога?")) {
      return;
    }
    setFormError("");
    setFormMessage("");
    try {
      const res = await adminDeleteBook(id);
      if (!res.isSuccess) {
        setFormError(res.message);
        return;
      }
      setFormMessage(res.message);
      if (editingId === id) {
        resetForm();
      }
      await refreshBooks();
    } catch (err: unknown) {
      setFormError(err instanceof ApiError ? err.message : "Ошибка запроса.");
    }
  };

  const resetCatForm = () => {
    setCatEditingId(null);
    setCatName("");
    setCatActive(true);
    setCatFormMessage("");
    setCatFormError("");
  };

  const startCatEdit = (c: CategoryDto) => {
    setCatEditingId(c.id);
    setCatName(c.name);
    setCatActive(c.isActive);
    setCatFormMessage("");
    setCatFormError("");
  };

  const refreshCategoryList = async () => {
    const c = await fetchCategories();
    setCategories(c);
  };

  const handleSubmitCategory = async (e: FormEvent) => {
    e.preventDefault();
    setCatFormMessage("");
    setCatFormError("");
    if (!catName.trim()) {
      setCatFormError("Укажите название категории.");
      return;
    }
    setCatSaving(true);
    try {
      if (catEditingId === null) {
        const res = await adminCreateCategory({ name: catName.trim(), isActive: catActive });
        if (!res.isSuccess) {
          setCatFormError(res.message);
          return;
        }
        setCatFormMessage(res.message);
        resetCatForm();
        await refreshCategoryList();
      } else {
        const res = await adminUpdateCategory({
          id: catEditingId,
          name: catName.trim(),
          isActive: catActive,
        });
        if (!res.isSuccess) {
          setCatFormError(res.message);
          return;
        }
        setCatFormMessage(res.message);
        resetCatForm();
        await refreshCategoryList();
      }
    } catch (err: unknown) {
      setCatFormError(err instanceof ApiError ? err.message : "Ошибка запроса.");
    } finally {
      setCatSaving(false);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (
      !window.confirm(
        "Удалить категорию безвозвратно? Если она привязана к книгам, сервер может вернуть ошибку.",
      )
    ) {
      return;
    }
    setCatFormError("");
    setCatFormMessage("");
    try {
      const res = await adminDeleteCategory(id);
      if (!res.isSuccess) {
        setCatFormError(res.message);
        return;
      }
      setCatFormMessage(res.message);
      if (catEditingId === id) {
        resetCatForm();
      }
      await refreshCategoryList();
    } catch (err: unknown) {
      setCatFormError(err instanceof ApiError ? err.message : "Ошибка запроса.");
    }
  };

  const refreshUsersList = async () => {
    const list = await fetchAllUsers();
    setUsers(list);
  };

  const resetUserForm = () => {
    setUserEditingId(null);
    setUserUsername("");
    setUserEmail("");
    setUserRole("User");
    setUserIsActive(true);
    setUserNewPassword("");
    setUsersTabMessage("");
    setUsersTabError("");
  };

  const startUserEdit = (u: UserListDto) => {
    setUserEditingId(u.id);
    setUserUsername(u.username);
    setUserEmail(u.email);
    setUserRole(u.role === "Admin" ? "Admin" : "User");
    setUserIsActive(u.isActive);
    setUserNewPassword("");
    setUsersTabMessage("");
    setUsersTabError("");
  };

  const handleSubmitUser = async (e: FormEvent) => {
    e.preventDefault();
    if (userEditingId === null) {
      return;
    }
    setUsersTabMessage("");
    setUsersTabError("");
    setUserSaving(true);
    try {
      const res = await adminUpdateUser({
        id: userEditingId,
        username: userUsername.trim(),
        email: userEmail.trim(),
        role: userRole,
        isActive: userIsActive,
        newPassword: userNewPassword.trim() || undefined,
      });
      if (!res.isSuccess) {
        setUsersTabError(res.message);
        return;
      }
      setUsersTabMessage(res.message);
      resetUserForm();
      await refreshUsersList();
    } catch (err: unknown) {
      setUsersTabError(err instanceof ApiError ? err.message : "Ошибка запроса.");
    } finally {
      setUserSaving(false);
    }
  };

  const handleDeactivateUser = async (u: UserListDto) => {
    if (!window.confirm(`Отключить пользователя «${u.username}»? Вход будет невозможен.`)) {
      return;
    }
    setUsersTabMessage("");
    setUsersTabError("");
    setUserActionLoadingId(u.id);
    try {
      const res = await adminSoftDeleteUser(u.id);
      if (!res.isSuccess) {
        setUsersTabError(res.message);
        return;
      }
      setUsersTabMessage(res.message);
      if (userEditingId === u.id) {
        resetUserForm();
      }
      await refreshUsersList();
    } catch (err: unknown) {
      setUsersTabError(err instanceof ApiError ? err.message : "Ошибка запроса.");
    } finally {
      setUserActionLoadingId(null);
    }
  };

  const refreshOrdersList = async () => {
    const list = await fetchAllOrders();
    setOrders(list);
  };

  const handleApplyOrderStatus = async (o: OrderDto) => {
    const next = orderStatusDrafts[o.id] ?? o.status;
    setOrdersTabMessage("");
    setOrdersTabError("");
    if (next === o.status) {
      setOrdersTabMessage("Статус без изменений.");
      return;
    }
    setOrderActionLoadingId(o.id);
    try {
      const res = await adminUpdateOrderStatusRequest(o, next);
      if (!res.isSuccess) {
        setOrdersTabError(res.message);
        return;
      }
      setOrdersTabMessage(res.message);
      await refreshOrdersList();
    } catch (err: unknown) {
      setOrdersTabError(err instanceof ApiError ? err.message : "Ошибка запроса.");
    } finally {
      setOrderActionLoadingId(null);
    }
  };

  const handleDeleteOrder = async (o: OrderDto) => {
    if (!window.confirm(`Скрыть заказ №${o.id}? Он исчезнет из списков.`)) {
      return;
    }
    setOrdersTabMessage("");
    setOrdersTabError("");
    setOrderActionLoadingId(o.id);
    try {
      const res = await adminDeleteOrderRequest(o.id);
      if (!res.isSuccess) {
        setOrdersTabError(res.message);
        return;
      }
      setOrdersTabMessage(res.message);
      await refreshOrdersList();
    } catch (err: unknown) {
      setOrdersTabError(err instanceof ApiError ? err.message : "Ошибка запроса.");
    } finally {
      setOrderActionLoadingId(null);
    }
  };

  const refreshReviewsList = async () => {
    const list = await fetchAllReviews();
    setReviews(list);
  };

  const handleReviewSetApproval = async (review: Review, isApproved: boolean) => {
    setReviewsTabMessage("");
    setReviewsTabError("");
    setReviewActionId(review.id);
    try {
      const res = await adminSetReviewApprovalRequest({ id: review.id, isApproved });
      if (!res.isSuccess) {
        setReviewsTabError(res.message);
        return;
      }
      setReviewsTabMessage(res.message);
      await refreshReviewsList();
    } catch (err: unknown) {
      setReviewsTabError(err instanceof ApiError ? err.message : "Ошибка запроса.");
    } finally {
      setReviewActionId(null);
    }
  };

  const handleReviewDelete = async (review: Review) => {
    if (!window.confirm(`Удалить отзыв №${review.id} безвозвратно?`)) {
      return;
    }
    setReviewsTabMessage("");
    setReviewsTabError("");
    setReviewActionId(review.id);
    try {
      const res = await adminDeleteReviewRequest(review.id);
      if (!res.isSuccess) {
        setReviewsTabError(res.message);
        return;
      }
      setReviewsTabMessage(res.message);
      await refreshReviewsList();
    } catch (err: unknown) {
      setReviewsTabError(err instanceof ApiError ? err.message : "Ошибка запроса.");
    } finally {
      setReviewActionId(null);
    }
  };

  if (!isAdmin) {
    return (
      <div className={styles.container}>
        <div className={styles.errorBox}>
          <h1>Доступ запрещён</h1>
          <p>Только администраторы могут получить доступ к этой странице.</p>
          <button type="button" onClick={() => navigate("/")} className={styles.backButton}>
            Вернуться на главную
          </button>
        </div>
      </div>
    );
  }

  const categoryHint = categories
    .filter((c) => c.isActive)
    .map((c) => c.name)
    .filter(Boolean)
    .join(", ");

  return (
    <div className={styles.container}>
      <div className={styles.adminPanel}>
        <h1>Админ-панель</h1>
        <p className={styles.welcome}>Добро пожаловать, {currentUser?.username}!</p>

        <div className={styles.tabs} role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "books"}
            className={tab === "books" ? styles.tabActive : styles.tab}
            onClick={() => setTab("books")}
          >
            Книги
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "categories"}
            className={tab === "categories" ? styles.tabActive : styles.tab}
            onClick={() => setTab("categories")}
          >
            Категории
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "reviews"}
            className={tab === "reviews" ? styles.tabActive : styles.tab}
            onClick={() => setTab("reviews")}
          >
            Отзывы
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "orders"}
            className={tab === "orders" ? styles.tabActive : styles.tab}
            onClick={() => setTab("orders")}
          >
            Заказы
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "users"}
            className={tab === "users" ? styles.tabActive : styles.tab}
            onClick={() => setTab("users")}
          >
            Пользователи
          </button>
        </div>

        {tab === "books" ? (
          <section className={styles.section} aria-labelledby="admin-books-heading">
            <div className={styles.sectionIntro}>
              <h2 id="admin-books-heading" className={styles.sectionHeading}>
                Каталог
              </h2>
              {formMessage ? <p className={styles.noticeSuccess}>{formMessage}</p> : null}
              {formError ? <p className={styles.noticeError}>{formError}</p> : null}
              {booksError ? <p className={styles.inlineError}>{booksError}</p> : null}
              {booksLoading ? <p className={styles.muted}>Загрузка…</p> : null}
            </div>

            <div className={styles.splitLayout}>
              <div className={styles.splitMain}>
                <div className={styles.tableWrap}>
                  <table className={styles.dataTable}>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Автор</th>
                        <th>Категории</th>
                        <th>Цена</th>
                        <th>Остаток</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {books.map((b) => (
                        <tr key={b.id}>
                          <td>{b.id}</td>
                          <td>{b.title}</td>
                          <td>{b.author}</td>
                          <td className={styles.cellMuted}>{b.category || "—"}</td>
                          <td>{b.price.toFixed(2)}</td>
                          <td>{b.stock}</td>
                          <td className={styles.rowActions}>
                            <button type="button" className={styles.linkButton} onClick={() => startEdit(b)}>
                              Изменить
                            </button>
                            <button type="button" className={styles.dangerButton} onClick={() => void handleDeleteBook(b.id)}>
                              Удалить
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <aside className={styles.splitAside} aria-label="Форма книги">
                <h3 className={styles.formTitle}>{editingId === null ? "Новая книга" : `Редактирование #${editingId}`}</h3>
                <form className={styles.formGrid} onSubmit={(e) => void handleSubmitBook(e)}>
                  <label className={styles.field}>
                    Название *
                    <input value={title} onChange={(e) => setTitle(e.target.value)} required className={styles.input} />
                  </label>
                  <label className={styles.field}>
                    Автор
                    <input value={author} onChange={(e) => setAuthor(e.target.value)} className={styles.input} />
                  </label>
                  <label className={styles.field}>
                    Категории (через запятую, как в БД)
                    <input value={category} onChange={(e) => setCategory(e.target.value)} className={styles.input} />
                    {categoryHint ? (
                      <span className={styles.fieldHint}>Пример имён: {categoryHint}</span>
                    ) : null}
                  </label>
                  <label className={styles.field}>
                    Цена *
                    <input value={price} onChange={(e) => setPrice(e.target.value)} inputMode="decimal" className={styles.input} />
                  </label>
                  <label className={styles.field}>
                    Остаток *
                    <input value={stock} onChange={(e) => setStock(e.target.value)} inputMode="numeric" className={styles.input} />
                  </label>
                  <label className={`${styles.field} ${styles.fieldWide}`}>
                    Описание
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className={styles.textarea} />
                  </label>
                  <label className={`${styles.field} ${styles.fieldWide}`}>
                    URL обложки
                    <input value={coverImageUrl} onChange={(e) => setCoverImageUrl(e.target.value)} className={styles.input} />
                  </label>
                  <div className={styles.formActions}>
                    {editingId !== null ? (
                      <button type="button" className={styles.secondaryButton} onClick={resetForm}>
                        Отмена
                      </button>
                    ) : null}
                    <button type="submit" className={styles.primaryButton} disabled={saving}>
                      {saving ? "Сохранение…" : editingId === null ? "Добавить" : "Сохранить"}
                    </button>
                  </div>
                </form>
              </aside>
            </div>
          </section>
        ) : null}

        {tab === "categories" ? (
          <section className={styles.section} aria-labelledby="admin-categories-heading">
            <div className={styles.sectionIntro}>
              <h2 id="admin-categories-heading" className={styles.sectionHeading}>
                Категории
              </h2>
              {catFormMessage ? <p className={styles.noticeSuccess}>{catFormMessage}</p> : null}
              {catFormError ? <p className={styles.noticeError}>{catFormError}</p> : null}
              {categoriesTabError ? <p className={styles.inlineError}>{categoriesTabError}</p> : null}
              {categoriesTabLoading ? <p className={styles.muted}>Загрузка…</p> : null}
            </div>

            <div className={styles.splitLayout}>
              <div className={styles.splitMain}>
                <div className={styles.tableWrap}>
                  <table className={styles.dataTable}>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Активна</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((c) => (
                        <tr key={c.id}>
                          <td>{c.id}</td>
                          <td>{c.name}</td>
                          <td>{c.isActive ? "да" : "нет"}</td>
                          <td className={styles.rowActions}>
                            <button type="button" className={styles.linkButton} onClick={() => startCatEdit(c)}>
                              Изменить
                            </button>
                            <button type="button" className={styles.dangerButton} onClick={() => void handleDeleteCategory(c.id)}>
                              Удалить
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <aside className={styles.splitAside} aria-label="Форма категории">
                <h3 className={styles.formTitle}>{catEditingId === null ? "Новая категория" : `Редактирование #${catEditingId}`}</h3>
                <form className={styles.formGrid} onSubmit={(e) => void handleSubmitCategory(e)}>
                  <label className={styles.field}>
                    Название *
                    <input value={catName} onChange={(e) => setCatName(e.target.value)} required className={styles.input} />
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" checked={catActive} onChange={(e) => setCatActive(e.target.checked)} />
                    Активна
                  </label>
                  <div className={styles.formActions}>
                    {catEditingId !== null ? (
                      <button type="button" className={styles.secondaryButton} onClick={resetCatForm}>
                        Отмена
                      </button>
                    ) : null}
                    <button type="submit" className={styles.primaryButton} disabled={catSaving}>
                      {catSaving ? "Сохранение…" : catEditingId === null ? "Добавить" : "Сохранить"}
                    </button>
                  </div>
                </form>
              </aside>
            </div>
          </section>
        ) : null}

        {tab === "reviews" ? (
          <section className={styles.section} aria-labelledby="admin-reviews-heading">
            <div className={styles.sectionIntro}>
              <h2 id="admin-reviews-heading" className={styles.sectionHeading}>
                Отзывы
              </h2>
              <p className={styles.sectionLead}>
                На странице книги видны только одобренные отзывы. Новые сначала остаются «на проверке».
              </p>
              {reviewsTabMessage ? <p className={styles.noticeSuccess}>{reviewsTabMessage}</p> : null}
              {reviewsTabError ? <p className={styles.noticeError}>{reviewsTabError}</p> : null}
              {reviewsError ? <p className={styles.inlineError}>{reviewsError}</p> : null}
              {reviewsLoading ? <p className={styles.muted}>Загрузка…</p> : null}
            </div>

            <div className={styles.splitFull}>
              <div className={styles.tableWrap}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Автор</th>
                    <th>Книга</th>
                    <th>Оценка</th>
                    <th>Текст</th>
                    <th>Статус</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((r) => (
                    <tr key={r.id}>
                      <td>{r.id}</td>
                      <td>{r.username}</td>
                      <td className={styles.cellMuted}>{r.bookTitle || `#${r.bookId}`}</td>
                      <td>{r.rating}</td>
                      <td className={styles.reviewTextCell}>{truncateText(r.text, 120)}</td>
                      <td>{r.isApproved ? "опубликован" : "на проверке"}</td>
                      <td className={styles.rowActions}>
                        {r.isApproved ? (
                          <button
                            type="button"
                            className={styles.linkButton}
                            onClick={() => void handleReviewSetApproval(r, false)}
                            disabled={reviewActionId === r.id}
                          >
                            Снять
                          </button>
                        ) : (
                          <button
                            type="button"
                            className={styles.linkButton}
                            onClick={() => void handleReviewSetApproval(r, true)}
                            disabled={reviewActionId === r.id}
                          >
                            Одобрить
                          </button>
                        )}
                        <button
                          type="button"
                          className={styles.dangerButton}
                          onClick={() => void handleReviewDelete(r)}
                          disabled={reviewActionId === r.id}
                        >
                          Удалить
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
          </section>
        ) : null}

        {tab === "orders" ? (
          <section className={styles.section} aria-labelledby="admin-orders-heading">
            <div className={styles.sectionIntro}>
              <h2 id="admin-orders-heading" className={styles.sectionHeading}>
                Все заказы
              </h2>
              {ordersTabMessage ? <p className={styles.noticeSuccess}>{ordersTabMessage}</p> : null}
              {ordersTabError ? <p className={styles.noticeError}>{ordersTabError}</p> : null}
              {ordersError ? <p className={styles.inlineError}>{ordersError}</p> : null}
              {ordersLoading ? <p className={styles.muted}>Загрузка…</p> : null}
            </div>

            <div className={styles.splitFull}>
              <div className={styles.tableWrap}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Пользователь</th>
                    <th>Дата</th>
                    <th>Сумма</th>
                    <th>Статус</th>
                    <th>Позиции</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id}>
                      <td>{o.id}</td>
                      <td>{o.userId}</td>
                      <td>{formatDate(o.orderDate)}</td>
                      <td>{o.total.toFixed(2)}</td>
                      <td>
                        <div className={styles.orderStatusControl}>
                          <select
                            className={styles.selectCompact}
                            value={String(orderStatusDrafts[o.id] ?? o.status)}
                            onChange={(e) =>
                              setOrderStatusDrafts((prev) => ({
                                ...prev,
                                [o.id]: Number(e.target.value),
                              }))
                            }
                            disabled={orderActionLoadingId === o.id}
                            aria-label={`Статус заказа ${o.id}`}
                          >
                            {ORDER_STATUS_OPTIONS.map((v) => (
                              <option key={v} value={String(v)}>
                                {orderStatusLabel(v)}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            className={styles.smallPrimaryButton}
                            onClick={() => void handleApplyOrderStatus(o)}
                            disabled={orderActionLoadingId === o.id}
                          >
                            OK
                          </button>
                        </div>
                      </td>
                      <td>
                        <details className={styles.orderDetails}>
                          <summary>{o.items.length}</summary>
                          <ul className={styles.orderItems}>
                            {o.items.map((it) => (
                              <li key={it.id}>
                                {it.bookInfo} × {it.quantity} — {it.price.toFixed(2)}
                              </li>
                            ))}
                          </ul>
                        </details>
                      </td>
                      <td className={styles.rowActions}>
                        <button
                          type="button"
                          className={styles.dangerButton}
                          onClick={() => void handleDeleteOrder(o)}
                          disabled={orderActionLoadingId === o.id}
                        >
                          Скрыть
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
          </section>
        ) : null}

        {tab === "users" ? (
          <section className={styles.section} aria-labelledby="admin-users-heading">
            <div className={styles.sectionIntro}>
              <h2 id="admin-users-heading" className={styles.sectionHeading}>
                Пользователи
              </h2>
              <p className={styles.sectionLead}>
                Редактирование данных и роли; «Отключить» — учётная запись не сможет войти (запись в БД сохраняется).
              </p>
              {usersTabMessage ? <p className={styles.noticeSuccess}>{usersTabMessage}</p> : null}
              {usersTabError ? <p className={styles.noticeError}>{usersTabError}</p> : null}
              {usersError ? <p className={styles.inlineError}>{usersError}</p> : null}
              {usersLoading ? <p className={styles.muted}>Загрузка…</p> : null}
            </div>

            <div className={styles.splitLayout}>
              <div className={styles.splitMain}>
                <div className={styles.tableWrap}>
                  <table className={styles.dataTable}>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Логин</th>
                        <th>Email</th>
                        <th>Роль</th>
                        <th>Регистрация</th>
                        <th>Активен</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.id}>
                          <td>{u.id}</td>
                          <td>{u.username}</td>
                          <td>{u.email}</td>
                          <td>{u.role}</td>
                          <td>{formatDate(u.registeredOn)}</td>
                          <td>{u.isActive ? "да" : "нет"}</td>
                          <td className={styles.rowActions}>
                            <button type="button" className={styles.linkButton} onClick={() => startUserEdit(u)}>
                              Изменить
                            </button>
                            {u.isActive ? (
                              <button
                                type="button"
                                className={styles.dangerButton}
                                onClick={() => void handleDeactivateUser(u)}
                                disabled={userActionLoadingId === u.id || currentUser?.id === u.id}
                              >
                                Отключить
                              </button>
                            ) : null}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <aside className={styles.splitAside} aria-label="Редактирование пользователя">
                <h3 className={styles.formTitle}>
                  {userEditingId === null ? "Выберите пользователя" : `Пользователь #${userEditingId}`}
                </h3>
                {userEditingId === null ? (
                  <p className={styles.muted}>Нажмите «Изменить» в таблице.</p>
                ) : (
                  <form className={styles.formGrid} onSubmit={(e) => void handleSubmitUser(e)}>
                    <label className={styles.field}>
                      Логин *
                      <input
                        className={styles.input}
                        value={userUsername}
                        onChange={(e) => setUserUsername(e.target.value)}
                        required
                        minLength={3}
                        maxLength={20}
                      />
                    </label>
                    <label className={styles.field}>
                      Email *
                      <input
                        type="email"
                        className={styles.input}
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        required
                        maxLength={30}
                      />
                    </label>
                    <label className={styles.field}>
                      Роль *
                      <select className={styles.input} value={userRole} onChange={(e) => setUserRole(e.target.value)}>
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </label>
                    <label className={styles.checkboxLabel}>
                      <input type="checkbox" checked={userIsActive} onChange={(e) => setUserIsActive(e.target.checked)} />
                      Активен (может войти)
                    </label>
                    <label className={styles.field}>
                      Новый пароль (необязательно)
                      <input
                        type="password"
                        className={styles.input}
                        value={userNewPassword}
                        onChange={(e) => setUserNewPassword(e.target.value)}
                        autoComplete="new-password"
                        placeholder="Оставьте пустым, чтобы не менять"
                      />
                    </label>
                    <div className={styles.formActions}>
                      <button type="button" className={styles.secondaryButton} onClick={resetUserForm}>
                        Отмена
                      </button>
                      <button type="submit" className={styles.primaryButton} disabled={userSaving}>
                        {userSaving ? "Сохранение…" : "Сохранить"}
                      </button>
                    </div>
                  </form>
                )}
              </aside>
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}

export default Admin;
