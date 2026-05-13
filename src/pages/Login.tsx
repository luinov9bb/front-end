import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Login.module.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(username, password);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Ошибка входа");
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <h1>Вход</h1>
        <p className={styles.subtitle}>Добро пожаловать в BookStore!</p>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Логин или email</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Имя пользователя или email"
              disabled={loading}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              disabled={loading}
              required
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" disabled={loading} className={styles.submitButton}>
            {loading ? "Загрузка..." : "Войти"}
          </button>
        </form>

        <div className={styles.testCredentials}>
          <p>Тестовые учетные данные (сид в appsettings):</p>
          <ul>
            <li>
              <strong>Админ:</strong> admin / Admin123!
            </li>
          </ul>
        </div>

        <p className={styles.registerLink}>
          Нет аккаунта? <a href="/register">Зарегистрируйтесь</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
