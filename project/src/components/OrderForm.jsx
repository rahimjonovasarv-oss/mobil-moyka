import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { CAR_PRICES } from '../services/translations';
import { createOrder } from '../services/api';
import OrderModal from './OrderModal';

export default function OrderForm({ initialModel, onSubmitted, onClose }) {
  const { t } = useApp();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    carModel: initialModel || '',
    address: '',
    comment: '',
    preferredTime: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [modalState, setModalState] = useState(null); // 'success' | 'error' | null
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (initialModel) setForm((f) => ({ ...f, carModel: initialModel }));
  }, [initialModel]);

  useEffect(() => {
    if (firstInputRef.current) firstInputRef.current.focus();
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = t.orderForm.errors.name;
    if (!form.phone.trim()) e.phone = t.orderForm.errors.phone;
    if (!form.carModel) e.carModel = t.orderForm.errors.carModel;
    if (!form.address.trim()) e.address = t.orderForm.errors.address;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await createOrder(form);
      setModalState('success');
      setForm({ name: '', phone: '', carModel: '', address: '', comment: '', preferredTime: '' });
    } catch (err) {
      setModalState('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="order" className="order-form-section">
      <div className="container">
        <div className="order-form-card animate-scale">
          <button className="order-form-close" onClick={onClose} aria-label="Close">×</button>
          <div className="section-header" style={{ marginBottom: 'var(--sp-3)' }}>
            <span className="section-badge">{t.orderForm.title}</span>
            <h2 className="section-title">{t.orderForm.title}</h2>
            <p className="section-subtitle">{t.orderForm.subtitle}</p>
          </div>

          <form className="order-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">{t.orderForm.name}</label>
                <input
                  ref={firstInputRef}
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder={t.orderForm.namePlaceholder}
                  className={errors.name ? 'input-error' : ''}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">{t.orderForm.phone}</label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder={t.orderForm.phonePlaceholder}
                  className={errors.phone ? 'input-error' : ''}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="carModel">{t.orderForm.carModel}</label>
                <select
                  id="carModel"
                  value={form.carModel}
                  onChange={(e) => handleChange('carModel', e.target.value)}
                  className={errors.carModel ? 'input-error' : ''}
                >
                  <option value="">{t.orderForm.carModelPlaceholder}</option>
                  {CAR_PRICES.map((car) => (
                    <option key={car.model} value={car.model}>
                      {car.model} — {car.price.toLocaleString('ru-RU')} {t.pricing.currency}
                    </option>
                  ))}
                </select>
                {errors.carModel && <span className="error-text">{errors.carModel}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="preferredTime">{t.orderForm.preferredTime}</label>
                <input
                  id="preferredTime"
                  type="text"
                  value={form.preferredTime}
                  onChange={(e) => handleChange('preferredTime', e.target.value)}
                  placeholder={t.orderForm.preferredTimePlaceholder}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">{t.orderForm.address}</label>
              <input
                id="address"
                type="text"
                value={form.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder={t.orderForm.addressPlaceholder}
                className={errors.address ? 'input-error' : ''}
              />
              {errors.address && <span className="error-text">{errors.address}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="comment">{t.orderForm.comment}</label>
              <textarea
                id="comment"
                rows="3"
                value={form.comment}
                onChange={(e) => handleChange('comment', e.target.value)}
                placeholder={t.orderForm.commentPlaceholder}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg order-submit-btn" disabled={submitting}>
              {submitting ? t.orderForm.submitting : t.orderForm.submit}
            </button>
          </form>
        </div>
      </div>

      {modalState && (
        <OrderModal
          type={modalState}
          onClose={() => {
            setModalState(null);
            if (modalState === 'success' && onSubmitted) onSubmitted();
          }}
        />
      )}
    </section>
  );
}
