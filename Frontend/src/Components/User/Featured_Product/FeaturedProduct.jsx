import PropTypes from 'prop-types';
import './FeaturedProduct.css';
import appleimg from '../../../assets/Images/Images/apple.png';
import strawberry from '../../../assets/Images/Images/Strawberry.png';
import chocolateimg from '../../../assets/Images/Images/chocolate.png';
import popcornimg from '../../../assets/Images/Images/popcorn,png.png';
import tomatoimg from '../../../assets/Images/Vegetables_Images/Tomato.png';
import cocacolaimg from '../../../assets/Images/Images/coca-cola.png';
import termaricimg from '../../../assets/Images/Images/termaric.png';
import riceimg from '../../../assets/Images/Images/rice.png';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { FaLeaf } from 'react-icons/fa';

const cards = [
    { imgSrc: appleimg, title: "Apple", category: "Fruits", description: "An apple a day keeps the doctor away! Apples are packed with fiber, antioxidants, and vitamins that support your overall health. Their natural sweetness makes them a satisfying snack while their low calorie count ensures they fit perfectly into any diet plan." },
    { imgSrc: strawberry, title: "Strawberry", category: "Fruits", description: "Strawberries are not only delicious but also packed with vitamin C and antioxidants. Their sweet and tangy flavor makes them a favorite in smoothies, desserts, or as a refreshing snack. Low in calories and high in fiber." },
    { imgSrc: chocolateimg, title: "Dairy Milk", category: "Chocolates", description: "Indulge in the rich, velvety taste of chocolate — a timeless treat loved by all! Packed with antioxidants and a hint of sweetness, chocolate not only satisfies your cravings but also uplifts your mood." },
    { imgSrc: popcornimg, title: "Popcorn", category: "Snacks", description: "Popcorn is a light and crunchy snack perfect for movie nights or anytime you need a quick, satisfying bite. High in fiber and low in calories, it's a healthier snack choice compared to other processed treats." },
    { imgSrc: tomatoimg, title: "Tomato", category: "Vegetables", description: "Tomatoes are a vibrant and versatile ingredient, packed with vitamins, minerals, and antioxidants. Whether fresh in salads, blended into sauces, or roasted to perfection, tomatoes add a burst of flavor to any dish." },
    { imgSrc: cocacolaimg, title: "Coca-Cola", category: "Drinks", description: "Quench your thirst with the fizzy delight of cold drinks! Perfect for hot days or lively gatherings, these refreshing beverages add a sparkling touch to any moment. Every sip is a burst of coolness and flavor." },
    { imgSrc: termaricimg, title: "Turmeric", category: "Grocery", description: "Turmeric, the golden spice, is celebrated for its powerful anti-inflammatory and antioxidant properties. Its active compound curcumin promotes healthy digestion, improves skin health, and boosts immunity." },
    { imgSrc: riceimg, title: "Rice", category: "Grocery", description: "Rice is a staple food in many cultures around the world. Packed with carbohydrates, it provides a quick energy boost. Whether white, brown, or wild, rice is a versatile ingredient used in countless dishes." },
];

const FeaturedCard = ({ imgSrc, title, category, description, onSeeMore }) => (
    <div className="fp-card" onClick={onSeeMore}>
        <span className="fp-badge"><FaLeaf size={9} /> {category}</span>
        <div className="fp-img-wrap">
            <img src={imgSrc} alt={title} className="fp-img" />
        </div>
        <div className="fp-info">
            <h5 className="fp-title">{title}</h5>
            <p className="fp-desc">{description}</p>
            <button className="fp-btn">See More →</button>
        </div>
    </div>
);

FeaturedCard.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onSeeMore: PropTypes.func.isRequired,
};

const Featured_Product = () => {
    const [popupData, setPopupData] = useState(null);

    return (
        <div className="fp-section">
            <div className="fp-header">
                <span className="fp-tag"><FaLeaf size={12} /> Featured</span>
                <h2 className="fp-section-title">Featured <span>Products</span></h2>
                <p className="fp-section-sub">Handpicked fresh items just for you</p>
            </div>

            <div className="fp-grid">
                {cards.map((card, i) => (
                    <FeaturedCard key={i} {...card} onSeeMore={() => setPopupData(card)} />
                ))}
            </div>

            {/* Popup */}
            {popupData && (
                <div className="fp-overlay" onClick={() => setPopupData(null)}>
                    <div className="fp-popup" onClick={(e) => e.stopPropagation()}>

                        {/* Left */}
                        <div className="fp-popup-left">
                            <img src={popupData.imgSrc} alt={popupData.title} className="fp-popup-main-img" />
                            <div className="fp-popup-thumbs">
                                {[1, 2, 3].map((i) => (
                                    <img key={i} src={popupData.imgSrc} alt={`${popupData.title} ${i}`} className="fp-popup-thumb" />
                                ))}
                            </div>
                        </div>

                        {/* Right */}
                        <div className="fp-popup-right">
                            <button className="fp-popup-close" onClick={() => setPopupData(null)}>
                                <MdClose size={18} />
                            </button>
                            <span className="fp-popup-category"><FaLeaf size={11} /> {popupData.category}</span>
                            <h2 className="fp-popup-title">{popupData.title}</h2>
                            <p className="fp-popup-desc">{popupData.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Featured_Product;
