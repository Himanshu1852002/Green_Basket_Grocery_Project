import PropTypes from 'prop-types';
import './Featured_Product.css';
import apple_img from '../../assets/Images/Images/apple.png';
import strawberry from '../../assets/Images/Images/Strawberry.png';
import chocolate_img from '../../assets/Images/Images/Chocolate.png';
import popcorn_img from '../../assets/Images/Images/popcorn,png.png';
import tomato_img from '../../assets/Images/Images/tomato.png';
import coca_cola_img from '../../assets/Images/Images/coca-cola.png';
import termaric_img from '../../assets/Images/Images/termaric.png';
import rice_img from '../../assets/Images/Images/rice.png';


const Cards = ({ imgSrc, title, description }) => {
    return (
        <>
            <div className="col">
                <div className="card h-100 position-relative">
                    <img src={imgSrc} className="card-img-top" alt={`${title} Image`} />
                    <span className="badge position-absolute top-0 start-0 m-2">
                        Featured
                    </span>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <button className="btn"> See more</button>
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
    description: PropTypes.string.isRequired
};

const Featured_Product = () => {
    const cards = [
        { imgSrc: apple_img, title: "Apple", description: "This is a description for the first card." },
        { imgSrc: strawberry, title: "Strawberry", description: "This is a description for the second card." },
        { imgSrc: chocolate_img, title: "DairyMilk", description: "This is a description for the third card." },
        { imgSrc: popcorn_img, title: "Popcorn", description: "This is a description for the fourth card." },
        { imgSrc: tomato_img, title: "Tomato", description: "This is a description for the fifth card." },
        { imgSrc: coca_cola_img, title: "Coca-Cola", description: "This is a description for the sixth card." },
        { imgSrc: termaric_img, title: "Termaric", description: "This is a description for the seventh card." },
        { imgSrc: rice_img, title: "Rice", description: "This is a description for the eighth card." }
    ];

    return (
        <div className="feature_product container my-5">
            <h1>Featured <span>Products</span></h1>
            {/* First row of cards */}
            <div className="row row-cols-1 row-cols-s-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-4 mt-3">
                {cards.slice(0, 4).map((card, index) => (
                    <Cards key={index} imgSrc={card.imgSrc} title={card.title} description={card.description} />
                ))}
            </div>

            {/* Second row of cards */}
            <div className="row row-cols-1 row-cols-s-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-4 mt-4">
                {cards.slice(4).map((card, index) => (
                    <Cards key={index} imgSrc={card.imgSrc} title={card.title} description={card.description} />
                ))}
            </div>
        </div>
    );
};

export default Featured_Product;
