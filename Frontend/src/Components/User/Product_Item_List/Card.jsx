import PropTypes from "prop-types";
import { useState } from "react";
import { FaEye, FaHeart, FaRegHeart, FaTruck, FaShoppingCart, FaCheck, FaStar, FaLeaf } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlistAPI, removeFromWishlistAPI } from "../../../Store/wishlistSlice";
import { addToCartAPI } from "../../../Store/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Product_Item_List.css";

const Card = ({ _id, name, price, image, sellingPrice, unit, description }) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.cart.token);
    const wishlist = useSelector((state) => state.wishlist.items);
    const isWishlisted = wishlist[_id] !== undefined;

    const [showModal, setShowModal] = useState(false);
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
        if (!token) { toast.error("Please log in to add items to the cart.", { autoClose: 2000 }); return; }
        dispatch(addToCartAPI({ itemId: _id, token }));
        toast.success("Added to cart!", { autoClose: 2000 });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const discount = Math.round(((price - sellingPrice) / price) * 100);

    return (
        <>
            <div className="col-lg-3 col-md-4 col-6 mb-3">
                <div className="pc-card">

                    {/* Image */}
                    <div className="pc-img-wrap">
                        {discount > 0 && <span className="pc-badge">{discount}% OFF</span>}
                        <img src={image} className="pc-img" alt={name} />
                        <div className="pc-actions">
                            <button className="pc-action-btn" onClick={toggleWishlist} title="Wishlist">
                                {isWishlisted
                                    ? <FaHeart size={13} color="#e53935" />
                                    : <FaRegHeart size={13} color="#666" />}
                            </button>
                            <button className="pc-action-btn" onClick={() => setShowModal(true)} title="Quick View">
                                <FaEye size={13} color="#666" />
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
                        <button className={`pc-cart-btn${added ? ' pc-added' : ''}`} onClick={handleAddToCart}>
                            {added
                                ? <><FaCheck size={11} /> Added!</>
                                : <><FaShoppingCart size={11} /> Add to Cart</>}
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick View Modal */}
            {showModal && (
                <div className="pc-overlay" onClick={() => setShowModal(false)}>
                    <div className="pc-modal" onClick={(e) => e.stopPropagation()}>

                        {/* Left — image panel */}
                        <div className="pc-modal-left">
                            <img src={image} alt={name} className="pc-modal-img" />
                            <div className="pc-modal-thumbs">
                                {[1, 2, 3].map((i) => (
                                    <img key={i} src={image} alt={`${name} ${i}`} className="pc-modal-thumb" />
                                ))}
                            </div>
                        </div>

                        {/* Right — info panel */}
                        <div className="pc-modal-right">
                            <button className="pc-modal-close" onClick={() => setShowModal(false)}>
                                <MdClose size={16} />
                            </button>

                            <span className="pc-modal-tag"><FaLeaf size={10} /> Fresh Product</span>
                            <h4 className="pc-modal-name">{name}</h4>

                            <div className="pc-modal-stars">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <FaStar key={i} size={12} color={i < 4 ? "#f59e0b" : "rgba(255,255,255,0.3)"} />
                                ))}
                                <span>4.0</span>
                            </div>

                            <div className="pc-modal-price">
                                <span className="pc-modal-selling">₹{sellingPrice}</span>
                                <del className="pc-modal-original">₹{price}</del>
                                <span className="pc-modal-unit">/ {unit}</span>
                                {discount > 0 && <span className="pc-modal-disc">{discount}% OFF</span>}
                            </div>

                            <p className="pc-modal-desc">{description}</p>

                            <div className="pc-modal-badges">
                                <span className="pc-modal-badge"><FaTruck size={10} /> Free Shipping</span>
                                <span className="pc-modal-badge"><IoIosTime size={10} /> 24/7 Support</span>
                                <span className="pc-modal-badge"><FaMoneyBillTransfer size={10} /> Money Back</span>
                            </div>

                            <div className="pc-modal-actions">
                                <button className="pc-modal-close-btn" onClick={() => setShowModal(false)}>Close</button>
                                <button className="pc-modal-cart-btn" onClick={() => { handleAddToCart(); setShowModal(false); }}>
                                    <FaShoppingCart size={13} /> Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
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
};

export default Card;
