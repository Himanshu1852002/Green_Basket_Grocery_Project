import { useNavigate } from 'react-router-dom';
import './CategoryCards.css';

import vegeImg   from '../../../assets/Images/Vegetables_Images/Brocolli.png';
import fruitImg  from '../../../assets/Images/Fruits_Images/Mango.png';
import nutsImg   from '../../../assets/Images/Grocery_Item_Images/Pista_Nuts.png';
import coffeeImg from '../../../assets/Images/Grocery_Item_Images/Bru_gold_coffee.png';
import juiceImg  from '../../../assets/Images/Coldrinks_Images/Strawberry_Juice.png';
import juice2Img from '../../../assets/Images/Coldrinks_Images/Fresh-Juice.png';

const categories = [
    {
        id: 1,
        title: 'Fresh Organic Vegetables',
        desc: 'Farm-fresh veggies delivered straight to your door. Crisp, clean & chemical-free.',
        tag: 'Vegetables',
        route: '/user/vegetables',
        bg: '#f0faf0',
        accent: '#059212',
        tagBg: '#c8e6c9',
        tagColor: '#1a4d2e',
        images: [vegeImg],
        badge: '100% Organic',
    },
    {
        id: 2,
        title: 'Fresh Fruits & Nuts',
        desc: 'Handpicked seasonal fruits and premium dry fruits packed with natural goodness.',
        tag: 'Fruits',
        route: '/user/fruits',
        bg: '#fff8e1',
        accent: '#f59e0b',
        tagBg: '#fde68a',
        tagColor: '#92400e',
        images: [fruitImg, nutsImg],
        badge: 'Seasonal Picks',
    },
    {
        id: 3,
        title: 'Coffee & Hot Drinks',
        desc: 'Start your morning right with our premium coffee blends and hot beverage range.',
        tag: 'Grocery',
        route: '/user/grocery',
        bg: '#fdf4f0',
        accent: '#d97706',
        tagBg: '#fed7aa',
        tagColor: '#7c2d12',
        images: [coffeeImg],
        badge: 'Best Seller',
    },
    {
        id: 4,
        title: 'Healthy Juices & Drinks',
        desc: 'Refreshing natural juices and cold drinks to keep you hydrated all day long.',
        tag: 'Cold Drinks',
        route: '/user/coldrinks',
        bg: '#fdf0f8',
        accent: '#ec4899',
        tagBg: '#fbcfe8',
        tagColor: '#831843',
        images: [juiceImg, juice2Img],
        badge: 'No Preservatives',
    },
];

const CategoryCard = ({ card, onClick }) => (
    <div className="cc-card" style={{ background: card.bg }} onClick={onClick}>

        {/* Left content */}
        <div className="cc-content">
            <span className="cc-tag" style={{ background: card.tagBg, color: card.tagColor }}>
                {card.tag}
            </span>
            <h3 className="cc-title">{card.title}</h3>
            <p className="cc-desc">{card.desc}</p>
            <div className="cc-footer">
                <button className="cc-btn" style={{ background: card.accent }}>
                    Shop Now →
                </button>
                <span className="cc-badge" style={{ color: card.accent }}>✦ {card.badge}</span>
            </div>
        </div>

        {/* Right images */}
        <div className={`cc-imgs cc-imgs-${card.images.length > 1 ? 'multi' : 'single'}`}>
            {card.images.map((img, i) => (
                <div key={i} className="cc-img-wrap">
                    <img src={img} alt={card.title} className="cc-img" />
                </div>
            ))}
        </div>

        {/* Decorative circle */}
        <div className="cc-circle" style={{ background: card.accent }} />
    </div>
);

const CategoryCards = () => {
    const navigate = useNavigate();

    return (
        <section className="cc-section">
            <div className="cc-header">
                <span className="cc-section-tag">🌿 Shop by Category</span>
                <h2 className="cc-section-title">Fresh Picks <span>For You</span></h2>
                <p className="cc-section-sub">Explore our top categories — fresh, healthy & delivered fast</p>
            </div>

            <div className="cc-grid">
                {categories.map(card => (
                    <CategoryCard
                        key={card.id}
                        card={card}
                        onClick={() => navigate(card.route)}
                    />
                ))}
            </div>
        </section>
    );
};

export default CategoryCards;
