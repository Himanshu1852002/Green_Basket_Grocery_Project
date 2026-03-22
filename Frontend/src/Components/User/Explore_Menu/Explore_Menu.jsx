import { useCallback } from 'react';
import './Explore_Menu.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

/* ── SVG Icons ── */
const FruitsSVG = () => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Apple */}
        <circle cx="32" cy="36" r="18" fill="#e53935" />
        <ellipse cx="25" cy="28" rx="5" ry="8" fill="#ef9a9a" opacity="0.45" transform="rotate(-25 25 28)" />
        {/* Stem */}
        <path d="M32 18 Q33 10 38 8" stroke="#4caf50" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Leaf */}
        <path d="M34 14 Q42 8 44 16 Q38 18 34 14Z" fill="#66bb6a" />
        {/* Shine */}
        <ellipse cx="26" cy="30" rx="3" ry="5" fill="#fff" opacity="0.25" transform="rotate(-20 26 30)" />
        {/* Small orange beside */}
        <circle cx="50" cy="44" r="9" fill="#fb8c00" />
        <ellipse cx="47" cy="41" rx="2" ry="3" fill="#ffcc80" opacity="0.4" transform="rotate(-15 47 41)" />
        <path d="M50 35 Q51 31 53 32" stroke="#4caf50" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* Small grape */}
        <circle cx="16" cy="46" r="5" fill="#7b1fa2" />
        <circle cx="22" cy="44" r="5" fill="#8e24aa" />
        <circle cx="19" cy="51" r="5" fill="#9c27b0" />
        <path d="M19 39 Q20 35 22 36" stroke="#4caf50" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
);

const VegetablesSVG = () => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Carrot */}
        <path d="M28 18 Q34 28 30 46 Q26 28 28 18Z" fill="#ff7043" />
        <path d="M28 18 Q22 28 26 46 Q28 28 28 18Z" fill="#ff5722" opacity="0.6" />
        {/* Carrot lines */}
        <path d="M25 28 Q31 28 31 28" stroke="#e64a19" strokeWidth="1" opacity="0.5" />
        <path d="M24 34 Q32 34 32 34" stroke="#e64a19" strokeWidth="1" opacity="0.5" />
        <path d="M25 40 Q31 40 31 40" stroke="#e64a19" strokeWidth="1" opacity="0.5" />
        {/* Carrot leaves */}
        <path d="M25 18 Q18 8 22 6 Q24 12 25 18Z" fill="#4caf50" />
        <path d="M28 17 Q28 6 32 5 Q30 11 28 17Z" fill="#66bb6a" />
        <path d="M31 18 Q38 8 36 6 Q32 12 31 18Z" fill="#4caf50" />
        {/* Broccoli right */}
        <rect x="44" y="42" width="8" height="14" rx="3" fill="#558b2f" />
        <circle cx="48" cy="40" r="9" fill="#388e3c" />
        <circle cx="41" cy="43" r="7" fill="#43a047" />
        <circle cx="55" cy="43" r="7" fill="#43a047" />
        <circle cx="44" cy="34" r="6" fill="#4caf50" />
        <circle cx="52" cy="34" r="6" fill="#4caf50" />
        <circle cx="48" cy="30" r="5" fill="#66bb6a" />
        {/* Tomato left */}
        <circle cx="14" cy="44" r="10" fill="#e53935" />
        <path d="M10 34 Q12 28 14 30" stroke="#4caf50" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M14 33 Q14 27 16 28" stroke="#4caf50" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M18 34 Q20 28 18 30" stroke="#4caf50" strokeWidth="2" strokeLinecap="round" fill="none" />
        <ellipse cx="11" cy="40" rx="2.5" ry="4" fill="#ef9a9a" opacity="0.35" transform="rotate(-20 11 40)" />
    </svg>
);

const ChocolatesSVG = () => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Wrapper */}
        <rect x="10" y="14" width="44" height="30" rx="6" fill="#6d4c41" />
        <rect x="10" y="14" width="44" height="30" rx="6" fill="url(#chocGrad)" />
        <defs>
            <linearGradient id="chocGrad" x1="10" y1="14" x2="54" y2="44" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#8d6e63" />
                <stop offset="100%" stopColor="#4e342e" />
            </linearGradient>
        </defs>
        {/* Grid lines */}
        <line x1="25" y1="14" x2="25" y2="44" stroke="#5d4037" strokeWidth="1.5" />
        <line x1="39" y1="14" x2="39" y2="44" stroke="#5d4037" strokeWidth="1.5" />
        <line x1="10" y1="25" x2="54" y2="25" stroke="#5d4037" strokeWidth="1.5" />
        <line x1="10" y1="35" x2="54" y2="35" stroke="#5d4037" strokeWidth="1.5" />
        {/* Shine */}
        <rect x="12" y="16" width="10" height="7" rx="2" fill="#a1887f" opacity="0.35" />
        {/* Wrapper foil top */}
        <path d="M10 14 Q32 8 54 14" fill="#ffd54f" opacity="0.9" />
        <path d="M10 14 Q32 10 54 14 Q32 12 10 14Z" fill="#ffca28" />
        {/* Foil folds */}
        <path d="M18 14 Q20 9 22 14" stroke="#f9a825" strokeWidth="1" fill="none" />
        <path d="M30 14 Q32 8 34 14" stroke="#f9a825" strokeWidth="1" fill="none" />
        <path d="M42 14 Q44 9 46 14" stroke="#f9a825" strokeWidth="1" fill="none" />
        {/* Bottom label */}
        <rect x="10" y="44" width="44" height="8" rx="4" fill="#795548" />
        <rect x="16" y="46" width="32" height="4" rx="2" fill="#a1887f" opacity="0.4" />
        {/* Melted drip */}
        <path d="M20 44 Q22 52 20 56" stroke="#4e342e" strokeWidth="3" strokeLinecap="round" fill="none" />
        <circle cx="20" cy="57" r="3" fill="#4e342e" />
    </svg>
);

const ColddrinksSVG = () => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Can body */}
        <rect x="18" y="16" width="28" height="38" rx="8" fill="url(#canGrad)" />
        <defs>
            <linearGradient id="canGrad" x1="18" y1="16" x2="46" y2="54" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#e53935" />
                <stop offset="100%" stopColor="#b71c1c" />
            </linearGradient>
        </defs>
        {/* Can shine */}
        <rect x="22" y="18" width="6" height="34" rx="3" fill="#fff" opacity="0.12" />
        {/* Can top */}
        <ellipse cx="32" cy="16" rx="14" ry="4" fill="#bdbdbd" />
        <ellipse cx="32" cy="16" rx="10" ry="2.5" fill="#9e9e9e" />
        {/* Pull tab */}
        <ellipse cx="32" cy="14" rx="5" ry="1.5" fill="#757575" />
        <path d="M32 12 Q36 9 37 12" stroke="#616161" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Can bottom */}
        <ellipse cx="32" cy="54" rx="14" ry="4" fill="#b71c1c" />
        {/* Label band */}
        <rect x="18" y="28" width="28" height="14" fill="#fff" opacity="0.1" />
        {/* Bubbles */}
        <circle cx="27" cy="33" r="2" fill="#fff" opacity="0.25" />
        <circle cx="33" cy="29" r="1.5" fill="#fff" opacity="0.2" />
        <circle cx="38" cy="35" r="2.5" fill="#fff" opacity="0.2" />
        <circle cx="30" cy="38" r="1.5" fill="#fff" opacity="0.18" />
        {/* Straw */}
        <rect x="38" y="6" width="4" height="28" rx="2" fill="#fdd835" />
        <rect x="38" y="6" width="2" height="28" rx="1" fill="#f9a825" opacity="0.5" />
    </svg>
);

const SnacksSVG = () => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Bag body */}
        <path d="M14 22 Q12 18 16 16 L48 16 Q52 18 50 22 L46 52 Q45 56 40 56 L24 56 Q19 56 18 52 Z" fill="url(#bagGrad)" />
        <defs>
            <linearGradient id="bagGrad" x1="14" y1="16" x2="50" y2="56" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ff7043" />
                <stop offset="100%" stopColor="#e64a19" />
            </linearGradient>
        </defs>
        {/* Bag shine */}
        <path d="M18 22 Q17 19 20 18 L28 18 Q26 22 24 38 Q20 38 18 22Z" fill="#fff" opacity="0.12" />
        {/* Bag top seal */}
        <path d="M14 22 Q12 18 16 16 L48 16 Q52 18 50 22" fill="#bf360c" opacity="0.6" />
        {/* Chips inside */}
        <ellipse cx="28" cy="36" rx="8" ry="5" fill="#fdd835" transform="rotate(-15 28 36)" />
        <ellipse cx="28" cy="36" rx="8" ry="5" fill="none" stroke="#f9a825" strokeWidth="1" transform="rotate(-15 28 36)" opacity="0.6" />
        <ellipse cx="38" cy="40" rx="7" ry="4.5" fill="#fdd835" transform="rotate(10 38 40)" />
        <ellipse cx="38" cy="40" rx="7" ry="4.5" fill="none" stroke="#f9a825" strokeWidth="1" transform="rotate(10 38 40)" opacity="0.6" />
        <ellipse cx="30" cy="46" rx="7" ry="4" fill="#ffe082" transform="rotate(-5 30 46)" />
        {/* Dots on bag */}
        <circle cx="22" cy="28" r="1.5" fill="#fff" opacity="0.2" />
        <circle cx="42" cy="26" r="1.5" fill="#fff" opacity="0.2" />
        <circle cx="44" cy="34" r="1" fill="#fff" opacity="0.2" />
    </svg>
);

const GrocerySVG = () => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Basket body */}
        <path d="M10 28 Q9 50 32 52 Q55 50 54 28 Z" fill="#a0522d" />
        {/* Weave horizontal */}
        <path d="M11 34 Q32 37 53 34" stroke="#8b4513" strokeWidth="1.5" fill="none" opacity="0.6" />
        <path d="M12 40 Q32 44 52 40" stroke="#8b4513" strokeWidth="1.5" fill="none" opacity="0.6" />
        <path d="M13 46 Q32 50 51 46" stroke="#8b4513" strokeWidth="1.5" fill="none" opacity="0.6" />
        {/* Weave vertical */}
        <path d="M20 28 Q19 48 21 51" stroke="#8b4513" strokeWidth="1.2" fill="none" opacity="0.5" />
        <path d="M32 28 Q32 50 32 52" stroke="#8b4513" strokeWidth="1.2" fill="none" opacity="0.5" />
        <path d="M44 28 Q45 48 43 51" stroke="#8b4513" strokeWidth="1.2" fill="none" opacity="0.5" />
        {/* Rim */}
        <ellipse cx="32" cy="28" rx="22" ry="5" fill="#cd853f" />
        <ellipse cx="32" cy="28" rx="22" ry="5" fill="none" stroke="#a0522d" strokeWidth="1.5" />
        {/* Handle */}
        <path d="M18 27 Q18 14 32 12 Q46 14 46 27" stroke="#8b4513" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M18 27 Q18 14 32 12 Q46 14 46 27" stroke="#cd853f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Items in basket */}
        {/* Apple */}
        <circle cx="26" cy="22" r="7" fill="#e53935" />
        <path d="M26 15 Q27 11 30 12" stroke="#4caf50" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        {/* Bread / bun */}
        <ellipse cx="38" cy="22" rx="8" ry="6" fill="#ffb74d" />
        <ellipse cx="38" cy="20" rx="6" ry="3" fill="#ffa726" opacity="0.5" />
        {/* Milk carton peek */}
        <rect x="28" y="14" width="8" height="10" rx="1" fill="#fff" opacity="0.85" />
        <path d="M28 14 L32 10 L36 14" fill="#e3f2fd" />
        <rect x="29" y="17" width="6" height="2" rx="1" fill="#1565c0" opacity="0.5" />
    </svg>
);

const CATEGORY_ICONS = {
    Fruits: FruitsSVG,
    Vegetables: VegetablesSVG,
    Chocolates: ChocolatesSVG,
    Coldrinks: ColddrinksSVG,
    Snacks: SnacksSVG,
    Grocery: GrocerySVG,
};

const menuItems = [
    { menu_name: 'Fruits' },
    { menu_name: 'Vegetables' },
    { menu_name: 'Chocolates' },
    { menu_name: 'Coldrinks' },
    { menu_name: 'Snacks' },
    { menu_name: 'Grocery' },
];

const ExploreMenu = ({ category, setCategory }) => {
    const navigate = useNavigate();

    const handleCategoryClick = useCallback((menu_name) => {
        if (menu_name === category) return;
        setCategory(menu_name);
        navigate(`/user/${menu_name.toLowerCase()}`);
    }, [navigate, category, setCategory]);

    return (
        <section className="em-section">
            <div className="em-header">
                <span className="em-tag">🛒 Categories</span>
                <h2 className="em-title">Explore Our <span>Menu</span></h2>
                <p className="em-sub">Fresh picks across all categories — choose what you love</p>
            </div>
            <div className="em-grid">
                {menuItems.map((item, index) => {
                    const Icon = CATEGORY_ICONS[item.menu_name];
                    return (
                        <div
                            key={index}
                            className={`em-card ${category === item.menu_name ? 'em-active' : ''}`}
                            onClick={() => handleCategoryClick(item.menu_name)}
                        >
                            <div className="em-img-wrap">
                                <Icon />
                            </div>
                            <p className="em-name">{item.menu_name}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

ExploreMenu.propTypes = {
    category: PropTypes.string.isRequired,
    setCategory: PropTypes.func.isRequired,
};

export default ExploreMenu;
