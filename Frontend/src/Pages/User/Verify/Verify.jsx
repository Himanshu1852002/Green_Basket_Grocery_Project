import './Verify.css';
import { useNavigate } from 'react-router-dom';
import { FaShoppingBag, FaHome } from 'react-icons/fa';

const Verify = () => {
    const navigate = useNavigate();

    return (
        <div className="vf-page">
            <div className="vf-card">

                {/* Animated checkmark */}
                <div className="vf-check-wrap">
                    <div className="vf-check-circle">
                        <svg className="vf-checkmark" viewBox="0 0 52 52">
                            <circle className="vf-check-bg" cx="26" cy="26" r="25" />
                            <path className="vf-check-tick" d="M14 27 l8 8 l16 -16" />
                        </svg>
                    </div>
                    <div className="vf-ripple" />
                </div>

                <h1 className="vf-title">Thank You! 🎉</h1>
                <p className="vf-subtitle">Your order has been placed successfully</p>
                <p className="vf-desc">
                    We're preparing your fresh items for delivery. You'll receive a confirmation shortly.
                </p>

                {/* Info badges */}
                <div className="vf-badges">
                    <div className="vf-badge">🚚 Delivery in 2–3 days</div>
                    <div className="vf-badge">📦 Order being prepared</div>
                    <div className="vf-badge">💚 Fresh & quality assured</div>
                </div>

                {/* Actions */}
                <div className="vf-actions">
                    <button className="vf-btn-primary" onClick={() => navigate('/user/myorders')}>
                        <FaShoppingBag size={14} /> Track My Order
                    </button>
                    <button className="vf-btn-secondary" onClick={() => navigate('/')}>
                        <FaHome size={14} /> Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Verify;
