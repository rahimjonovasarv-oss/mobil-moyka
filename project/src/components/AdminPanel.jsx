import { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { PHONE_LINK } from '../services/translations';
import { getOrders, updateOrderStatus, deleteOrder } from '../services/api';

const STATUS_FLOW = ['new', 'accepted', 'in_progress', 'completed', 'cancelled'];

export default function AdminPanel() {
  const { t } = useApp();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getOrders();
      setOrders(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this order?')) return;
    try {
      await deleteOrder(id);
      setOrders((prev) => prev.filter((o) => o.id !== id));
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleString('ru-RU', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <div className="admin-panel">
      <div className="container">
        <div className="admin-header">
          <div>
            <h1 className="admin-title">{t.admin.title}</h1>
            <p className="admin-subtitle">{t.admin.subtitle}</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <a href="/" className="btn btn-outline btn-sm">← Home</a>
            <button className="btn btn-outline btn-sm" onClick={loadOrders} disabled={loading}>
              ↻ {t.admin.refresh}
            </button>
          </div>
        </div>

        {loading && <div className="admin-loading">{t.admin.loading}</div>}
        {error && <div className="admin-error">{error}</div>}

        {!loading && !error && orders.length === 0 && (
          <div className="admin-empty">{t.admin.empty}</div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>{t.admin.columns.name}</th>
                  <th>{t.admin.columns.phone}</th>
                  <th>{t.admin.columns.car}</th>
                  <th>{t.admin.columns.price}</th>
                  <th>{t.admin.columns.address}</th>
                  <th>{t.admin.columns.time}</th>
                  <th>{t.admin.columns.comment}</th>
                  <th>{t.admin.columns.status}</th>
                  <th>{t.admin.columns.date}</th>
                  <th>—</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td data-label={t.admin.columns.name}>{order.name}</td>
                    <td data-label={t.admin.columns.phone}>
                      <a href={PHONE_LINK}>{order.phone}</a>
                    </td>
                    <td data-label={t.admin.columns.car}>{order.car_model}</td>
                    <td data-label={t.admin.columns.price}>
                      {Number(order.price).toLocaleString('ru-RU')}
                    </td>
                    <td data-label={t.admin.columns.address}>{order.address}</td>
                    <td data-label={t.admin.columns.time}>{order.preferred_time || '—'}</td>
                    <td data-label={t.admin.columns.comment}>{order.comment || '—'}</td>
                    <td data-label={t.admin.columns.status}>
                      <select
                        className={`status-select status-${order.status}`}
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      >
                        {STATUS_FLOW.map((s) => (
                          <option key={s} value={s}>{t.admin.statuses[s]}</option>
                        ))}
                      </select>
                    </td>
                    <td data-label={t.admin.columns.date}>{formatDate(order.created_at)}</td>
                    <td>
                      <button className="admin-delete-btn" onClick={() => handleDelete(order.id)}>
                        🗑
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
