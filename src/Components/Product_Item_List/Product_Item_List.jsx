// Import necessary libraries and assets

import PropTypes from "prop-types";
import './Product_Item_List.css';
// Reusable Card component
const Card = ({ title, price, imageSrc }) => {
    return (
        <div className="col-lg-3 col-md-6 col-sm-6 col-12 mb-3">
            <div className="card product_card">
                <img src={imageSrc} className="card-img-top" alt={title} />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{price}</p>
                    <button className="btn ">Add to cart</button>
                </div>
            </div>
        </div>
    );
};

Card.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imageSrc: PropTypes.string.isRequired,
};

// Main component
const Product_Item_List = ({ items }) => {
    const rows = [];
    for (let i = 0; i < items.length; i += 4) {
        rows.push(items.slice(i, i + 4));
    }

    return (
        <div className="container">
            {rows.map((row, rowIndex) => (
                <div className="row" key={rowIndex}>
                    {row.map((card, index) => (
                        <Card key={index} title={card.item_name} price={card.item_price} imageSrc={card.imgSrc} />
                    ))}
                </div>
            ))}
        </div>
    );
};

Product_Item_List.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            item_name: PropTypes.string.isRequired,
            item_price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            imgSrc: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Product_Item_List;
