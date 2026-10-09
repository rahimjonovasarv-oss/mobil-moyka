import { useApp } from '../context/AppContext';
import { PHONE_LINK, PHONE_NUMBER } from '../services/translations';

export default function OrderModal({ type, onClose }) {
  const { t } = useApp();
  const content = type === 'success' ? t.successModal : t.errorModal;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-scale" onClick={(e) => e.stopPropagation()}>
        <div className={`modal-icon ${type === 'success' ? 'modal-success' : 'modal-error'}`}>
          {type === 'success' ? '✅' : '⚠️'}
        </div>
        <h2 className="modal-title">{content.title}</h2>
        <p className="modal-message">{content.message}</p>

        {type === 'success' && (
          <div className="modal-urgent">
            <p>{content.urgent}</p>
            <a href={PHONE_LINK} className="modal-phone">{PHONE_NUMBER}</a>
          </div>
        )}

        <div className="modal-actions">
          {type === 'error' && (
            <button className="btn btn-outline" onClick={onClose}>
              {content.close}
            </button>
          )}
          <a href={PHONE_LINK} className="btn btn-primary">
            {content.callBtn}
          </a>
          {type === 'success' && (
            <button className="btn btn-outline" onClick={onClose}>
              {content.close}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
