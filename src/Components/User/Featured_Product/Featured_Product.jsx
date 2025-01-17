import PropTypes from 'prop-types';
import './Featured_Product.css';
import apple_img from '../../../assets/Images/Images/apple.png';
import strawberry from '../../../assets/Images/Images/Strawberry.png';
import chocolate_img from '../../../assets/Images/Images/Chocolate.png';
import popcorn_img from '../../../assets/Images/Images/popcorn,png.png';
import tomato_img from '../../../assets/Images/Vegetables_Images/Tomato.png';
import coca_cola_img from '../../../assets/Images/Images/coca-cola.png';
import termaric_img from '../../../assets/Images/Images/termaric.png';
import rice_img from '../../../assets/Images/Images/rice.png';
import { useState } from 'react';


const Cards = ({ imgSrc, title, description, onSeeMore }) => {
    return (
        <>
            <div className="col">
                <div className="card d-flex flex-column justify-content-center align-items-center cursor-pointer rounded-3 position-relative">
                    <img src={imgSrc} className="card-img-top" alt={`${title} Image`} />
                    <span className="badge position-absolute top-0 start-0 m-2">
                        Featured
                    </span>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <button className="btn btn-success" onClick={onSeeMore}>See more</button>
                    </div>
                </div>
            </div>

        </>
    );
};

// PropTypes for validation
Cards.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onSeeMore: PropTypes.func.isRequired,
};

const Featured_Product = () => {

    const [popupData, setPopupData] = useState(null);

    const cards = [
        { imgSrc: apple_img, title: "Apple", description: "An apple a day keeps the doctor away is not just an old saying rooted  truth Apples are packed with fiber antioxidants and awealth of vitamins that support your overall health Their naturalsweetness makes them a satisfying snack while their low calorie count ensures they fit perfectly into any diet plan " },
        { imgSrc: strawberry, title: "Strawberry", description: "Strawberries are not only delicious but also packed with vitamin C and antioxidants.Their sweet and tangy flavor makes them a favorite in smoothies, desserts, or as a refreshing snack.Low in calories and high in fiber, strawberries offer numerous health benefits while satisfying your taste buds." },
        { imgSrc: chocolate_img, title: "DairyMilk", description: "Indulge in the rich, velvety taste of chocolate—a timeless treat loved by all! Packed with antioxidants and a hint of sweetness, chocolate not only satisfies your cravings but also uplifts your mood. Whether it's a creamy milk chocolate bar or decadent dark chocolate, this delicacy is perfect for every occasion. A bite of joy in every piece!" },
        { imgSrc: popcorn_img, title: "Popcorn", description: "Popcorn is a light and crunchy snack that is perfect for movie nights or anytime you need a quick, satisfying bite. High in fiber and low in calories, it's a healthier snack choice compared to other processed treats. Whether flavored with butter, cheese, or spices, popcorn is a versatile snack that everyone can enjoy." },
        { imgSrc: tomato_img, title: "Tomato", description: "Tomatoes are a vibrant and versatile ingredient, packed with vitamins, minerals, and antioxidants. Whether fresh in salads, blended into sauces, or roasted to perfection, tomatoes add a burst of flavor and a healthy boost to any dish. Their rich red color is a sign of their nutritious value, making them an essential part of a balanced diet." },
        { imgSrc: coca_cola_img, title: "Coca-Cola", description: "Quench your thirst with the fizzy delight of cold drinks! Perfect for hot days or lively gatherings, these refreshing beverages add a sparkling touch to any moment.From classic cola to fruity flavors, every sip is a burst of coolness and flavor that leaves you wanting more.Chill out and enjoy the effervescence" },
        { imgSrc: termaric_img, title: "Termaric", description: "Turmeric, often referred to as 'golden spice,' is celebrated for its powerful anti-inflammatory and antioxidant properties. Used in cooking, medicine, and beauty treatments, turmeric adds a warm, earthy flavor to dishes and supports overall health. Its active compound, curcumin, is believed to promote healthy digestion, improve skin health, and boost immunity." },
        { imgSrc: rice_img, title: "Rice", description: "Rice is a staple food in many cultures around the world. Packed with carbohydrates, it provides a quick energy boost. Whether white, brown, or wild, rice is a versatile ingredient used in countless dishes. Brown rice, in particular, offers more fiber and nutrients, making it a healthier option for those looking to maintain a balanced diet." }
    ];

    const handleSeeMore = (card) => {
        setPopupData(card);
    }
    const closePopup = () => {
        setPopupData(null);
    }

    

    return (
        <div className="feature_product container my-5">
            <h1>Featured <span>Products</span></h1>
            {/* First row of cards */}
            <div className="row row-cols-1 row-cols-s-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-4 mt-3">
                {cards.slice(0, 4).map((card, index) => (
                    <Cards key={index} imgSrc={card.imgSrc} title={card.title} description={card.description} onSeeMore={() => handleSeeMore(card)} />
                ))}
            </div>

            {/* Second row of cards */}
            <div className="row row-cols-1 row-cols-s-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-4 mt-4">
                {cards.slice(4).map((card, index) => (
                    <Cards key={index} imgSrc={card.imgSrc} title={card.title} description={card.description} onSeeMore={() => handleSeeMore(card)} />
                ))}
            </div>


            {/* Popup modal */}
            {popupData && (
                <div className="popup-overlay">
                    <div className="popup-content row">
                        {/* Close Button */}
                        <button className="btn-close" aria-label="Close" onClick={closePopup}>
                            &times;
                        </button>
                        <div className="popup-left">
                            {/* Main Image */}
                            <img className='main_img' src={popupData.imgSrc} alt={`${popupData.title} Main`} />
                            <div className="collage-row">
                                <img src={popupData.imgSrc} alt={`${popupData.title} Collage 1`} />
                                <img src={popupData.imgSrc} alt={`${popupData.title} Collage 2`} />
                                <img src={popupData.imgSrc} alt={`${popupData.title} Collage 3`} />
                            </div>
                        </div>
                        <div className="popup-right">
                            <h2>{popupData.title}</h2>
                            <p>{popupData.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Featured_Product;
