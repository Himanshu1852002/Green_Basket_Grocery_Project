import PropTypes from "prop-types";
import { useState } from "react";
import { FaEye, FaHeart, FaRegHeart, FaTruck, FaShoppingCart, FaCheck } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlistAPI, removeFromWishlistAPI } from "../../../Store/wishlistSlice";
import { addToCartAPI } from "../../../Store/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
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
        toast.success("Product added to cart!", { autoClose: 2000 });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const discount = Math.round(((price - sellingPrice) / price) * 100);

    return (
        <>
            <div className="col-lg-3 col-md-4 col-6 mb-2">
                <div className="product_card">

                    {/* Image */}
                    <div className="card-img-wrapper">
                        {discount > 0 && <span className="discount-badge">-{discount}%</span>}
                        <img src={image} className="product-img" alt={name} />
                        <div className="card-icons">
                            <span className="card-icon-btn" onClick={toggleWishlist}>
                                {isWishlisted ? <FaHeart color="#e53935" size={14} /> : <FaRegHeart color="#666" size={14} />}
                            </span>
                            <span className="card-icon-btn" onClick={() => setShowModal(true)}>
                                <FaEye color="#666" size={14} />
                            </span>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="card-info">
                        <h6 className="product-name">{name}</h6>
                        <p className="product-price">
                            <del>&#8377;{price}</del>
                            <span>&#8377;{sellingPrice}</span>
                            <small>/ {unit}</small>
                        </p>
                        <button className={`add-cart-btn${added ? ' added' : ''}`} onClick={handleAddToCart}>
                            {added
                                ? <><FaCheck size={12} />Added!</>
                                : <><FaShoppingCart size={12} />Add to Cart</>
                            }
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick View Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-box" onClick={(e) => e.stopPropagation()}>

                        {/* Left */}
                        <div className="modal-left">
                            <img src={image} alt={name} className="modal-main-img" />
                            <div className="modal-thumbs">
                                {[1, 2, 3].map((i) => (
                                    <img key={i} src={image} alt={`${name} ${i}`} className="modal-thumb" />
                                ))}
                            </div>
                        </div>

                        {/* Right */}
                        <div className="modal-right">
                            <button className="modal-close-btn ms-auto" onClick={() => setShowModal(false)}>
                                <MdClose size={17} />
                            </button>

                            <h5 className="modal-title">{name}</h5>

                            <div className="modal-price">
                                <del className="text-muted me-1" style={{ fontSize: '0.88rem' }}>&#8377;{price}</del>
                                <span className="fw-bold" style={{ color: '#059212', fontSize: '1.15rem' }}>&#8377;{sellingPrice}</span>
                                <span className="text-muted ms-1" style={{ fontSize: '0.82rem' }}>/ {unit}</span>
                                {discount > 0 && <span className="modal-discount-badge ms-1">{discount}% OFF</span>}
                            </div>

                            <p className="modal-desc">{description}</p>

                            <div className="modal-policies">
                                <span className="policy-badge"><FaTruck size={11} />&nbsp;Free Shipping</span>
                                <span className="policy-badge"><IoIosTime size={11} />&nbsp;24/7 Support</span>
                                <span className="policy-badge"><FaMoneyBillTransfer size={11} />&nbsp;Money Back</span>
                            </div>

                            <div className="modal-actions">
                                <button className="btn btn-outline-secondary flex-fill" onClick={() => setShowModal(false)}>Close</button>
                                <button className="btn btn-success flex-fill d-flex align-items-center justify-content-center gap-2"
                                    onClick={() => { handleAddToCart(); setShowModal(false); }}>
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
