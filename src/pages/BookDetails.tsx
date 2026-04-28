import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import {
  addReview,
  findBookById,
  findReviewsByBookId,
} from "../mock/mockDB";
import type { Review } from "../mock/mockDB";
import styles from "./BookDetails.module.css";

function BookDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { currentUser, isAuthenticated } = useAuth();
  const book = useMemo(() => (id ? findBookById(id) : undefined), [id]);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [formError, setFormError] = useState("");
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const [reviewFormOpen, setReviewFormOpen] = useState(false);

  useEffect(() => {
    if (id) {
      setReviews(findReviewsByBookId(id));
      setReviewFormOpen(false);
    }
  }, [id]);

  const averageRating = useMemo(() => {
    if (!reviews.length) {
      return 0;
    }
    return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  }, [reviews]);

  const handleAddToCart = () => {
    addToCart({
      id: book!.id,
      name: book!.title,
      price: book!.price,
      image: book!.coverImage,
      quantity: 1,
    });
  };

  const handleSubmitReview = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isAuthenticated) {
      setFormError("Чтобы оставить отзыв, нужно войти в аккаунт.");
      return;
    }

    if (!comment.trim()) {
      setFormError("Напишите, пожалуйста, свой отзыв.");
      return;
    }

    if (!book) {
      return;
    }

    addReview({
      id: 0,
      book_id: book.id,
      user_id: currentUser?.id ?? 0,
      user_name: currentUser?.username ?? "Гость",
      rating,
      comment: comment.trim(),
      created_at: new Date().toISOString(),
    });

    setReviews(findReviewsByBookId(book.id));
    setComment("");
    setRating(5);
    setFormError("");
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

  return (
    <section className={styles.page}>
      <div className={styles.panel}>
        <div className={styles.grid}>
          <div className={styles.coverFrame}>
            <img className={styles.cover} src={book.coverImage} alt={book.title} />
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
              {book.author} • {book.genres.join(", ")} • {book.year}
            </p>
            <p className={styles.description}>{book.annotation}</p>
            <p className={styles.meta}>{book.pages} страниц</p>

            <div className={styles.bottom}>
              <p className={styles.price}>{book.price} лей</p>
              <button
                type="button"
                className={styles.button}
                onClick={handleAddToCart}
              >
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

                    <div className={styles.reviewList}>
                      {reviews.length === 0 ? (
                        <p className={styles.emptyMessage}>
                          Никто еще не оставил отзыв. Станьте первым!
                        </p>
                      ) : (
                        reviews
                          .slice()
                          .reverse()
                          .map((review) => (
                            <article key={review.id} className={styles.reviewItem}>
                              <div className={styles.reviewHeader}>
                                <div className={styles.reviewAuthor}>{review.user_name}</div>
                                <div className={styles.starsRow}>
                                  {renderStars(review.rating)}
                                </div>
                              </div>
                              <p className={styles.reviewComment}>{review.comment}</p>
                              <p className={styles.reviewMeta}>{new Date(review.created_at).toLocaleDateString()}</p>
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
                                      >★</span>
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
