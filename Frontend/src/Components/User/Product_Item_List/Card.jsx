import PropTypes from "prop-types";
import { useState } from "react";
import { FaHeart, FaRegHeart, FaShoppingCart, FaCheck, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlistAPI, removeFromWishlistAPI } from "../../../Store/wishlistSlice";
import { addToCartAPI } from "../../../Store/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./Product_Item_List.css";

const Card = ({ _id, name, price, image, sellingPrice, unit, description, quantity }) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.cart.token);
    const wishlist = useSelector((state) => state.wishlist.items);
    const isWishlisted = wishlist[_id] !== undefined;
    const isOutOfStock = quantity === 0;

    const [added, setAdded] = useState(false);

    const toggleWishlist = () => {
        if (!token) { toast.error("Please log in to manage your wishlist.", { autoClose: 2000 }); return; }
        if (isWishlisted) {
            dispatch(removeFromWishlistAPI({ token, itemId: _id }));
            toast.info("Removed from Wishlist", { autoClose: 2000 });
        } else {
            dispatch(addToWishlistAPI({ token, itemId: _id }));
            toast.success("Added to Wishlist", { autoClose: 2000 });
        }
    };

    const handleAddToCart = () => {
        if (isOutOfStock) return;
        if (!token) { toast.error("Please log in to add items to the cart.", { autoClose: 2000 }); return; }
        dispatch(addToCartAPI({ itemId: _id, token }));
        toast.success("Added to cart!", { autoClose: 2000 });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const discount = Math.round(((price - sellingPrice) / price) * 100);
    const navigate = useNavigate();

    const handleCardClick = (e) => {
        // buttons pe click hone par navigate mat karo
        if (e.target.closest('button')) return;
        navigate(`/user/product/${_id}`);
    };

    return (
        <>
            <div className="col-lg-3 col-md-4 col-6 mb-3">
                <div className={`pc-card${isOutOfStock ? ' pc-out-of-stock' : ''} pc-clickable`} onClick={handleCardClick}>

                    {/* Image */}
                    <div className="pc-img-wrap">
                        {isOutOfStock
                            ? <span className="pc-oos-badge">Out of Stock</span>
                            : discount > 0 && <span className="pc-badge">{discount}% OFF</span>
                        }
                        <img src={image} className="pc-img" alt={name} />
                        <div className="pc-actions">
                            <button className="pc-action-btn" onClick={toggleWishlist} title="Wishlist">
                                {isWishlisted
                                    ? <FaHeart size={13} color="#e53935" />
                                    : <FaRegHeart size={13} color="#666" />}
                            </button>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="pc-body">
                        <div className="pc-stars">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <FaStar key={i} size={10} color={i < 4 ? "#f59e0b" : "#e0e0e0"} />
                            ))}
                            <span className="pc-rating-count">(4.0)</span>
                        </div>
                        <h6 className="pc-name">{name}</h6>
                        <div className="pc-price-row">
                            <span className="pc-selling">₹{sellingPrice}</span>
                            <del className="pc-original">₹{price}</del>
                            <span className="pc-unit">/ {unit}</span>
                        </div>
                        <button className={`pc-cart-btn${added ? ' pc-added' : ''}${isOutOfStock ? ' pc-cart-btn-oos' : ''}`} onClick={handleAddToCart} disabled={isOutOfStock}>
                            {isOutOfStock
                                ? <>Out of Stock</>
                                : added
                                    ? <><FaCheck size={11} /> Added!</>
                                    : <><FaShoppingCart size={11} /> Add to Cart</>
                            }
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
};

Card.propTypes = {
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.string.isRequired,
    sellingPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    unit: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    quantity: PropTypes.number,
};

export default Card;
