import PropTypes from "prop-types";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useState } from "react";

const Card = ({ title, price, imageSrc }) => {

    const [isWishlisted, setIsWishlisted] = useState(false);

    const toggleWishlist = () => {
        setIsWishlisted(!isWishlisted);
    };

    return (
        <div className="col-lg-3 col-md-6 col-sm-6 col-12 mb-3">
            <div className="card product_card position-relative">
                <img src={imageSrc} className="card-img-top" alt={title} />
                <span className="wishlist-icon position-absolute top-0 end-0 p-2" onClick={toggleWishlist}>
                    {isWishlisted ? (
                        <FaHeart className="text-danger" />  // Filled red heart when wishlisted
                    ) : (
                        <FaRegHeart className="text-dark" />  // Empty heart when not wishlisted
                    )}
                </span>
                <div className="card-body product_card_body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{price}</p>
                    <button className="btn ">Add to cart</button>
                </div>
            </div>
        </div>
    );
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imageSrc: PropTypes.string.isRequired,
};



export default Card