import PropTypes from "prop-types";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Store/cartSlice';

const Card = ({ item_id, title, price, imageSrc }) => {

    const [isWishlisted, setIsWishlisted] = useState(false);
    const dispatch = useDispatch();

    const toggleWishlist = () => {
        setIsWishlisted(!isWishlisted);
    };

    const handleAddToCart = () => {
        // Dispatch the addToCart action with the item details
        dispatch(addToCart({
            item_id,       // Unique ID of the product
            item_name: title,
            item_price: price,
            imgSrc: imageSrc,
        }));
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
                    <p className="card-text">{price} - rs</p>
                    <button className="btn " onClick={handleAddToCart}
                    >Add to cart</button>
                </div>
            </div>
        </div>
    );
}

Card.propTypes = {
    item_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imageSrc: PropTypes.string.isRequired,
};



export default Card