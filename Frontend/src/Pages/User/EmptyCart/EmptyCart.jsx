import { Link } from 'react-router-dom';
import { FaShoppingBag, FaArrowRight } from 'react-icons/fa';
import './EmptyCart.css';

const quickLinks = [
    { label: '🍎 Fruits', to: '/user/fruits' },
    { label: '🥦 Vegetables', to: '/user/vegetables' },
    { label: '🍫 Chocolates', to: '/user/chocolates' },
    { label: '🥤 Cold Drinks', to: '/user/coldrinks' },
    { label: '🍿 Snacks', to: '/user/snacks' },
    { label: '🛒 Grocery', to: '/user/grocery' },
];

const EmptyCart = () => (
    <div className="ec-page">
        <div className="ec-card">
            <div className="ec-icon-wrap">
                <div className="ec-icon">🛒</div>
                <div className="ec-ripple" />
            </div>
            <h2 className="ec-title">Your Cart is Empty!</h2>
            <p className="ec-sub">Looks like you haven&apos;t added anything yet. Start shopping fresh groceries!</p>

            <Link to="/" className="ec-shop-btn">
                <FaShoppingBag size={14} /> Start Shopping <FaArrowRight size={12} />
            </Link>

            <div className="ec-links-wrap">
                <p className="ec-links-label">Browse Categories</p>
                <div className="ec-links">
                    {quickLinks.map((l, i) => (
                        <Link key={i} to={l.to} className="ec-link">{l.label}</Link>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default EmptyCart;
