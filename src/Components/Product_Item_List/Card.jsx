import PropTypes from "prop-types";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlistAPI, removeFromWishlistAPI } from "../../Store/wishlistSlice";
import { addToCartAPI } from "../../Store/cartSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Card = ({ _id, name, price, image, unit }) => {

    const dispatch = useDispatch();
    const token = useSelector((state) => state.cart.token);
    const wishlist = useSelector((state) => state.wishlist.items);
    const isWishlisted = wishlist[_id] !== undefined;

    const toggleWishlist = () => {
        if (!token) {
            toast.error('Please log in to manage your wishlist.', { autoClose: 2000 });
            return;
        }

        if (isWishlisted) {
            dispatch(removeFromWishlistAPI({ token, itemId: _id }));
            toast.info('Removed from Wishlist', { autoClose: 2000 });
        } else {
            dispatch(addToWishlistAPI({ token, itemId: _id }));
            toast.success('Added to Wishlist', { autoClose: 2000 });
        }
    };

    const handleAddToCart = () => {
        if (token) {
            dispatch(addToCartAPI({ itemId: _id, token }));
            toast.success('Product added to cart!', { autoClose: 2000 });
        } else {
            toast.error('Please log in to add items to the cart.', { autoClose: 2000 });
        }
    };

    return (
        <div className="col-lg-3 col-md-6 col-sm-6 col-12 cards_top_div mb-3">
            <div className="card product_card position-relative">
                <img src={image} className="card-img-top" alt={name} />
                <span className="wishlist-icon position-absolute top-0 end-0 p-2" onClick={toggleWishlist}>
                    {isWishlisted ? (
                        <FaHeart className="text-danger" />
                    ) : (
                        <FaRegHeart className="text-dark" />
                    )}
                </span>
                <div className="card-body product_card_body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">&#8377;{price} /{unit}</p>
                    <button className="btn" onClick={handleAddToCart}>
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
}

Card.propTypes = {
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
};

export default Card;
