import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Register.module.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, isAuthenticated } = useAuth();
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

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    if (password.length < 8) {
      setError("Пароль должен быть не короче 8 символов.");
      return;
    }

    setLoading(true);
    const result = await register(username, email, password);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Ошибка при регистрации");
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <h1>Регистрация</h1>
        <p className={styles.subtitle}>Создайте аккаунт для начала покупок</p>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Имя пользователя</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Выберите имя пользователя"
              disabled={loading}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введите email"
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
              placeholder="Пароль (минимум 8 символов)"
              disabled={loading}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Подтвердите пароль</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Подтвердите пароль"
              disabled={loading}
              required
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" disabled={loading} className={styles.submitButton}>
            {loading ? "Загрузка..." : "Создать аккаунт"}
          </button>
        </form>

        <p className={styles.loginLink}>
          Уже есть аккаунт? <a href="/login">Войдите</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
