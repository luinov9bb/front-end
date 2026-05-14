import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchOrdersByUser } from "../api/orders";
import type { OrderDto } from "../api/types/orderApi";
import styles from "./Profile.module.css";

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

function formatDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "—" : d.toLocaleString("ru-RU");
}

function Profile() {
  const { isAuthenticated, currentUser } = useAuth();
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated || !currentUser) {
      setOrders([]);
      return;
    }
    let cancelled = false;
    void (async () => {
      await Promise.resolve();
      if (cancelled) {
        return;
      }
      setLoading(true);
      setError("");
      try {
        const list = await fetchOrdersByUser(currentUser.id);
        if (!cancelled) {
          setOrders(list);
        }
      } catch {
        if (!cancelled) {
          setError("Не удалось загрузить заказы.");
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
  }, [isAuthenticated, currentUser]);

  if (!isAuthenticated || !currentUser) {
    return (
      <div className={styles.wrap}>
        <section className={styles.guestCard}>
          <h1 className={styles.title}>Профиль</h1>
          <p className={styles.lead}>Войдите, чтобы видеть заказы и данные аккаунта.</p>
          <div className={styles.actions}>
            <Link to="/login" className={styles.primaryBtn}>
              Вход
            </Link>
            <Link to="/register" className={styles.secondaryBtn}>
              Регистрация
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const roleLabel = currentUser.role === "admin" ? "Администратор" : "Пользователь";

  return (
    <div className={styles.wrap}>
      <section className={styles.card}>
        <h1 className={styles.title}>Профиль</h1>
        <dl className={styles.dl}>
          <div className={styles.dlRow}>
            <dt>Логин</dt>
            <dd>{currentUser.username}</dd>
          </div>
          <div className={styles.dlRow}>
            <dt>Email</dt>
            <dd>{currentUser.email}</dd>
          </div>
          <div className={styles.dlRow}>
            <dt>Роль</dt>
            <dd>{roleLabel}</dd>
          </div>
          <div className={styles.dlRow}>
            <dt>Регистрация</dt>
            <dd>{formatDate(currentUser.registeredOn)}</dd>
          </div>
          <div className={styles.dlRow}>
            <dt>Аккаунт</dt>
            <dd>{currentUser.isActive ? "Активен" : "Отключён"}</dd>
          </div>
        </dl>
      </section>

      <section className={styles.card}>
        <h2 className={styles.sectionTitle}>Мои заказы</h2>
        {loading && <p className={styles.muted}>Загрузка…</p>}
        {error && <p className={styles.error}>{error}</p>}
        {!loading && !error && orders.length === 0 && (
          <p className={styles.muted}>Пока нет заказов.</p>
        )}
        {!loading && orders.length > 0 && (
          <ul className={styles.orderList}>
            {orders.map((order) => (
              <li key={order.id} className={styles.orderCard}>
                <div className={styles.orderHead}>
                  <span className={styles.orderId}>Заказ №{order.id}</span>
                  <span className={styles.orderMeta}>
                    {formatDate(order.orderDate)} · {orderStatusLabel(order.status)}
                  </span>
                </div>
                <ul className={styles.itemList}>
                  {order.items.map((line) => (
                    <li key={line.id} className={styles.itemRow}>
                      <span className={styles.itemInfo}>{line.bookInfo}</span>
                      <span className={styles.itemQty}>×{line.quantity}</span>
                      <span className={styles.itemPrice}>{Number(line.price) * line.quantity} лей</span>
                    </li>
                  ))}
                </ul>
                <div className={styles.orderTotal}>
                  <span>Итого</span>
                  <strong>{order.total} лей</strong>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Profile;
