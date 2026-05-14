import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { fetchBookById } from "../api/books";
import { createReview, fetchReviewsByBookId } from "../api/reviews";
import type { Book, Review } from "../types/catalog";
import styles from "./BookDetails.module.css";

function formatSafeDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "—" : d.toLocaleDateString();
}

function BookDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { currentUser, isAuthenticated } = useAuth();

  const [book, setBook] = useState<Book | null | undefined>(undefined);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [formError, setFormError] = useState("");
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const [reviewFormOpen, setReviewFormOpen] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const numericId = useMemo(() => {
    if (!id) {
      return NaN;
    }
    const n = Number(id);
    return Number.isFinite(n) ? n : NaN;
  }, [id]);

  const reloadReviews = useCallback(async (bookId: number) => {
    const list = await fetchReviewsByBookId(bookId);
    setReviews(list);
  }, []);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      await Promise.resolve();
      if (cancelled) {
        return;
      }

      if (!id || Number.isNaN(numericId) || numericId <= 0) {
        setBook(null);
        setReviews([]);
        setLoadError(null);
        return;
      }

      setLoadError(null);
      setBook(undefined);

      try {
        const b = await fetchBookById(numericId);
        if (!cancelled) {
          setBook(b);
        }
      } catch {
        if (!cancelled) {
          setLoadError("Не удалось загрузить книгу.");
          setBook(null);
        }
      }

      try {
        await reloadReviews(numericId);
      } catch {
        if (!cancelled) {
          setReviews([]);
        }
      }

      if (!cancelled) {
        setReviewFormOpen(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id, numericId, reloadReviews]);

  const averageRating = useMemo(() => {
    if (!reviews.length) {
      return 0;
    }
    return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  }, [reviews]);

  const handleAddToCart = () => {
    if (!book) {
      return;
    }
    addToCart({
      id: book.id,
      name: book.title,
      price: book.price,
      image: book.coverImageUrl?.trim() ?? "",
      quantity: 1,
    });
  };

  const handleSubmitReview = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isAuthenticated) {
      setFormError("Чтобы оставить отзыв, нужно войти в аккаунт.");
      return;
    }

    if (!comment.trim()) {
      setFormError("Напишите, пожалуйста, свой отзыв.");
      return;
    }

    if (comment.trim().length < 10) {
      setFormError("Отзыв должен быть не короче 10 символов.");
      return;
    }

    if (!book) {
      setFormError("Некорректная книга.");
      return;
    }

    const uid = currentUser?.id;
    if (!uid) {
      setFormError("Не удалось определить пользователя.");
      return;
    }

    setFormError("");
    try {
      const res = await createReview({
        userId: uid,
        bookId: book.id,
        rating,
        text: comment.trim(),
      });
      if (!res.isSuccess) {
        setFormError(res.message || "Не удалось отправить отзыв.");
        return;
      }
      await reloadReviews(Number(book.id));
      setComment("");
      setRating(5);
      setReviewFormOpen(false);
    } catch {
      setFormError("Не удалось отправить отзыв.");
    }
  };

  const renderStars = (value: number) => {
    const roundedValue = Math.round(value);

    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`${styles.star} ${index < roundedValue ? styles.starFilled : ""}`}
        aria-hidden="true"
      >
        ★
      </span>
    ));
  };

  if (loadError) {
    return (
      <section className={styles.notFound}>
        <h1 className={styles.notFoundTitle}>Ошибка загрузки</h1>
        <p className={styles.notFoundText}>{loadError}</p>
      </section>
    );
  }

  if (book === undefined) {
    return (
      <section className={styles.notFound}>
        <h1 className={styles.notFoundTitle}>Загрузка…</h1>
      </section>
    );
  }

  if (!book) {
    return (
      <section className={styles.notFound}>
        <h1 className={styles.notFoundTitle}>Книга не найдена</h1>
        <p className={styles.notFoundText}>
          Похоже, этой книги нет в каталоге или ссылка больше неактуальна.
        </p>
      </section>
    );
  }

  const categoryLine = book.category.trim() || "—";
  const coverSrc = book.coverImageUrl?.trim() ?? "";

  return (
    <section className={styles.page}>
      <div className={styles.panel}>
        <div className={styles.grid}>
          <div className={styles.coverFrame}>
            {coverSrc ? (
              <img className={styles.cover} src={coverSrc} alt={book.title} />
            ) : (
              <div className={styles.coverPlaceholder}>Нет обложки</div>
            )}
          </div>

          <div className={styles.details}>
            <h1 className={styles.title}>{book.title}</h1>
            <div className={styles.ratingRow}>
              <div className={styles.starsRow}>{renderStars(averageRating)}</div>
              <span className={styles.ratingInfo}>
                {reviews.length > 0
                  ? `${averageRating.toFixed(1)} из 5 (${reviews.length} отзывов)`
                  : "Пока нет оценок"}
              </span>
            </div>
            <p className={styles.meta}>
              {book.author} • {categoryLine}
            </p>
            <p className={styles.description}>{book.description}</p>
            <p className={styles.meta}>На складе: {book.stock} шт.</p>

            <div className={styles.bottom}>
              <p className={styles.price}>{book.price} лей</p>
              <button type="button" className={styles.button} onClick={handleAddToCart}>
                В корзину
              </button>
            </div>

            <div className={styles.tabPanel}>
              <div className={styles.tabs}>
                <button
                  type="button"
                  className={`${styles.tab} ${reviewsOpen ? styles.tabActive : styles.tabClosed}`}
                  aria-expanded={reviewsOpen}
                  onClick={() => setReviewsOpen((open) => !open)}
                >
                  Отзывы
                  <span className={styles.tabIcon}>{reviewsOpen ? "▲" : "▼"}</span>
                </button>
              </div>

              <div className={styles.tabContent}>
                {reviewsOpen && (
                  <div className={styles.reviewsSection}>
                    <div className={styles.reviewSummary}>
                      <div className={styles.reviewSummaryInfo}>
                        <div className={styles.starsRow}>{renderStars(averageRating)}</div>
                        <div className={styles.reviewCounter}>
                          {reviews.length > 0
                            ? `${reviews.length} отзыв${reviews.length === 1 ? "" : "ов"}`
                            : "Пока нет отзывов"}
                        </div>
                      </div>

                      {!reviewFormOpen && (
                        <button
                          type="button"
                          className={styles.reviewFormToggle}
                          onClick={() => setReviewFormOpen(true)}
                        >
                          Оставить отзыв
                        </button>
                      )}
                    </div>

                    <p className={styles.reviewModerationHint}>
                      Отзывы на странице книги показываются после одобрения администратором.
                    </p>

                    <div className={styles.reviewList}>
                      {reviews.length === 0 ? (
                        <p className={styles.emptyMessage}>Никто еще не оставил отзыв. Станьте первым!</p>
                      ) : (
                        reviews
                          .slice()
                          .reverse()
                          .map((review) => (
                            <article key={review.id} className={styles.reviewItem}>
                              <div className={styles.reviewHeader}>
                                <div className={styles.reviewAuthor}>{review.username}</div>
                                <div className={styles.starsRow}>{renderStars(review.rating)}</div>
                              </div>
                              <p className={styles.reviewComment}>{review.text}</p>
                              <p className={styles.reviewMeta}>
                                {formatSafeDate(review.createdAt)}
                                {!review.isApproved ? " · на модерации" : ""}
                              </p>
                            </article>
                          ))
                      )}
                    </div>

                    {reviewFormOpen && (
                      <div className={styles.reviewFormWrapper}>
                        <h2 className={styles.reviewFormTitle}>Оставить отзыв</h2>
                        {isAuthenticated ? (
                          <form className={styles.reviewForm} onSubmit={handleSubmitReview}>
                            <div className={styles.reviewField}>
                              <label className={styles.fieldLabel}>Оценка</label>
                              <div className={styles.ratingInputs}>
                                {Array.from({ length: 5 }, (_, index) => {
                                  const value = index + 1;
                                  return (
                                    <label key={value} className={styles.ratingLabel}>
                                      <input
                                        type="radio"
                                        name="rating"
                                        value={value}
                                        checked={rating === value}
                                        onChange={() => setRating(value)}
                                        className={styles.ratingInput}
                                      />
                                      <span
                                        className={`${styles.ratingStar} ${
                                          value <= rating ? styles.ratingStarActive : ""
                                        }`}
                                      >
                                        ★
                                      </span>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>
                            <div className={styles.reviewField}>
                              <label className={styles.fieldLabel} htmlFor="reviewComment">
                                Текст отзыва
                              </label>
                              <textarea
                                id="reviewComment"
                                value={comment}
                                onChange={(event) => setComment(event.target.value)}
                                className={styles.textarea}
                                placeholder="Напишите, что вам понравилось в книге"
                                rows={5}
                              />
                            </div>
                            {formError && <p className={styles.formError}>{formError}</p>}
                            <button type="submit" className={styles.submitButton}>
                              Отправить отзыв
                            </button>
                          </form>
                        ) : (
                          <p className={styles.loginPrompt}>
                            <Link to="/login" className={styles.loginLink}>
                              Войдите
                            </Link>{" "}
                            в аккаунт, чтобы оставить отзыв.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookDetails;
