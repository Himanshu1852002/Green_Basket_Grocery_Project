import { Link, useNavigate } from 'react-router-dom';
import './NotFound.css';

const quickLinks = [
    { label: '🏠 Home', to: '/' },
    { label: '🍎 Fruits', to: '/user/fruits' },
    { label: '🥦 Vegetables', to: '/user/vegetables' },
    { label: '🛒 Grocery', to: '/user/grocery' },
];

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="nf-page">
            <div className="nf-blob nf-blob-1" />
            <div className="nf-blob nf-blob-2" />
            <div className="nf-blob nf-blob-3" />

            <div className="nf-card">
                <div className="nf-code-wrap">
                    <span className="nf-four">4</span>
                    <div className="nf-basket">
                        <div className="nf-basket-body">
                            <span className="nf-basket-emoji">🛒</span>
                        </div>
                        <div className="nf-basket-base" />
                    </div>
                    <span className="nf-four">4</span>
                </div>

                <h1 className="nf-title">Oops! Page Not Found</h1>
                <p className="nf-desc">
                    Looks like this page went out of stock! The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>

                <div className="nf-btns">
                    <Link to="/" className="nf-btn-primary">🏠 Go to Home</Link>
                    <button className="nf-btn-secondary" onClick={() => navigate(-1)}>← Go Back</button>
                </div>

                <div className="nf-links-wrap">
                    <p className="nf-links-label">Or explore these pages:</p>
                    <div className="nf-links">
                        {quickLinks.map((l, i) => (
                            <Link key={i} to={l.to} className="nf-link">{l.label}</Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
