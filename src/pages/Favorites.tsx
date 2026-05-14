import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";
import { fetchBooks } from "../api/books";
import { deleteFavoriteRequest, fetchFavoritesByUser, type FavoriteDto } from "../api/favorites";
import type { Book } from "../types/catalog";
import styles from "./Favorites.module.css";

function Favorites() {
  const { isAuthenticated, currentUser } = useAuth();
  const { favoriteIds, refreshFavorites } = useFavorites();
  const [rows, setRows] = useState<FavoriteDto[]>([]);
  const [guestBooks, setGuestBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      let cancelled = false;
      void (async () => {
        await Promise.resolve();
        if (cancelled) {
          return;
        }
        setLoading(true);
        setError("");
        setGuestBooks([]);
        try {
          const list = await fetchFavoritesByUser(currentUser.id);
          if (!cancelled) {
            setRows(list);
          }
        } catch {
          if (!cancelled) {
            setError("Не удалось загрузить избранное.");
          }
        } finally {
          if (!cancelled) {
            setLoading(false);
          }
        }
      })();
      return () => {
        cancelled = true;
      };
    }

    let cancelled = false;
    void (async () => {
      await Promise.resolve();
      if (cancelled || favoriteIds.size === 0) {
        if (!cancelled) {
          setGuestBooks([]);
          setRows([]);
        }
        return;
      }
      setLoading(true);
      setRows([]);
      try {
        const all = await fetchBooks();
        const set = new Set([...favoriteIds].map((id) => String(id)));
        const filtered = all.filter((b) => set.has(String(b.id)));
        if (!cancelled) {
          setGuestBooks(filtered);
        }
      } catch {
        if (!cancelled) {
          setGuestBooks([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, currentUser, favoriteIds]);

  const handleRemoveAuth = (favoriteId: number) => {
    void (async () => {
      try {
        const res = await deleteFavoriteRequest(favoriteId);
        if (res.isSuccess && currentUser) {
          setRows(await fetchFavoritesByUser(currentUser.id));
          await refreshFavorites();
        }
      } catch {
        if (currentUser) {
          setRows(await fetchFavoritesByUser(currentUser.id));
          await refreshFavorites();
        }
      }
    })();
  };

  const renderBookCard = (book: Book, extra?: { favoriteId?: number }) => (
    <article key={book.id} className={styles.card}>
      <Link to={`/books/${book.id}`} className={styles.coverLink}>
        <img src={book.coverImageUrl ?? ""} alt="" className={styles.cover} />
      </Link>
      <div className={styles.body}>
        <Link to={`/books/${book.id}`} className={styles.titleLink}>
          <h2 className={styles.bookTitle}>{book.title}</h2>
        </Link>
        <p className={styles.author}>{book.author}</p>
        <p className={styles.price}>{book.price} лей</p>
        {extra?.favoriteId != null && (
          <button type="button" className={styles.removeBtn} onClick={() => handleRemoveAuth(extra.favoriteId!)}>
            Убрать из избранного
          </button>
        )}
      </div>
    </article>
  );

  if (isAuthenticated) {
    const items = rows
      .map((r) => {
        const b = r.book;
        if (!b) {
          return null;
        }
        return { favoriteId: r.id, book: b };
      })
      .filter((x): x is { favoriteId: number; book: Book } => x !== null);

    return (
      <div className={styles.page}>
        <h1 className={styles.pageTitle}>Избранное</h1>
        {loading && <p className={styles.muted}>Загрузка…</p>}
        {error && <p className={styles.error}>{error}</p>}
        {!loading && !error && items.length === 0 && <p className={styles.muted}>Список пуст.</p>}
        {!loading && items.length > 0 && (
          <div className={styles.grid}>{items.map(({ book, favoriteId }) => renderBookCard(book, { favoriteId }))}</div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Избранное</h1>
      {favoriteIds.size === 0 ? (
        <p className={styles.muted}>Вы ещё ничего не добавили в избранное.</p>
      ) : (
        <>
          <p className={styles.hint}>Сохранено локально в этом браузере. После входа список берётся с сервера.</p>
          {loading && <p className={styles.muted}>Загрузка…</p>}
          {!loading && guestBooks.length === 0 && <p className={styles.muted}>Книги не найдены в каталоге.</p>}
          {!loading && guestBooks.length > 0 && (
            <div className={styles.grid}>{guestBooks.map((b) => renderBookCard(b))}</div>
          )}
        </>
      )}
      <p className={styles.loginHint}>
        <Link to="/login">Войти</Link>, чтобы синхронизировать избранное с аккаунтом.
      </p>
    </div>
  );
}

export default Favorites;
