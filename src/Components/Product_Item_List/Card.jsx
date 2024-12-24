import PropTypes from "prop-types";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../Store/cartSlice';
import { addToWishlist, removeFromWishlist } from "../../Store/wishlistSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Card = ({ _id, name, price, image, unit }) => {

    const dispatch = useDispatch();

    const wishlist = useSelector((state) => state.wishlist.items);
    const isWishlisted = wishlist.some((item) => item._id === _id);

    const toggleWishlist = () => {
        if (isWishlisted) {
            dispatch(removeFromWishlist(_id));
            toast.info('Removed from Wishlist', { autoClose: 2000 });
        }
        else {
            dispatch(addToWishlist({
                _id,
                name,
                price,
                image,
                unit,
            }));
            toast.success('Added to Wishlist', { autoClose: 2000 });
        }
    };

    const handleAddToCart = () => {
        dispatch(addToCart({
            _id: _id,
            name: name,
            price: price,
            image: image,
            unit: unit,
        }));

        toast.success('Product Added Successfully!', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

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
                    <button className="btn" onClick={handleAddToCart}
                    >Add to cart</button>
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

export default Card