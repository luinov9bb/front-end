import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./Admin.module.css";

function Admin() {
  const { isAdmin, currentUser } = useAuth();
  const navigate = useNavigate();

  if (!isAdmin) {
    return (
      <div className={styles.container}>
        <div className={styles.errorBox}>
          <h1>Доступ запрещён</h1>
          <p>Только администраторы могут получить доступ к этой странице.</p>
          <button onClick={() => navigate("/")} className={styles.backButton}>
            Вернуться на главную
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.adminPanel}>
        <h1>Админ-панель</h1>
        <p className={styles.welcome}>Добро пожаловать, {currentUser?.username}!</p>

        <div className={styles.section}>
          <h2>Управление</h2>
          <div className={styles.menuGrid}>
            <div className={styles.menuItem}>
              <h3>📚 Книги</h3>
              <p>Добавление, редактирование и удаление книг из каталога</p>
              <button disabled className={styles.comingSoon}>
                В разработке
              </button>
            </div>

            <div className={styles.menuItem}>
              <h3>👥 Пользователи</h3>
              <p>Управление пользователями и их ролями</p>
              <button disabled className={styles.comingSoon}>
                В разработке
              </button>
            </div>

            <div className={styles.menuItem}>
              <h3>📦 Заказы</h3>
              <p>Просмотр и управление заказами</p>
              <button disabled className={styles.comingSoon}>
                В разработке
              </button>
            </div>

            <div className={styles.menuItem}>
              <h3>⭐ Отзывы</h3>
              <p>Модерация отзывов и рецензий</p>
              <button disabled className={styles.comingSoon}>
                В разработке
              </button>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Статистика</h2>
          <div className={styles.stats}>
            <p>В разработке...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
