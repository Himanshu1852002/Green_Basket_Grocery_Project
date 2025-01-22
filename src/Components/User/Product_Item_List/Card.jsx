import PropTypes from "prop-types";
import { useState } from "react";
import { FaEye, FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlistAPI, removeFromWishlistAPI } from "../../../Store/wishlistSlice";
import { addToCartAPI } from "../../../Store/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Card = ({ _id, name, price, image, sellingPrice, unit, description }) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.cart.token);
    const wishlist = useSelector((state) => state.wishlist.items);
    const isWishlisted = wishlist[_id] !== undefined;

    const [showTooltip, setShowTooltip] = useState(false);
    const [showViewTooltip, setShowViewTooltip] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const toggleWishlist = () => {
        if (!token) {
            toast.error("Please log in to manage your wishlist.", { autoClose: 2000 });
            return;
        }

        if (isWishlisted) {
            dispatch(removeFromWishlistAPI({ token, itemId: _id }));
            toast.info("Removed from Wishlist", { autoClose: 2000 });
        } else {
            dispatch(addToWishlistAPI({ token, itemId: _id }));
            toast.success("Added to Wishlist", { autoClose: 2000 });
        }
    };

    const handleAddToCart = () => {
        if (token) {
            dispatch(addToCartAPI({ itemId: _id, token }));
            toast.success("Product added to cart!", { autoClose: 2000 });
        } else {
            toast.error("Please log in to add items to the cart.", { autoClose: 2000 });
        }
    };

    return (
        <>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12 cards_top_div mb-3">
                <div className="card product_card position-relative">
                    <img src={image} className="card-img-top" alt={name} />
                    <div className="position-absolute top-0 end-0 p-2 d-flex justify-content-center flex-column align-items-center">
                        {/* Wishlist Icon */}
                        <span
                            className="wishlist-icon me-2 position-relative"
                            onClick={toggleWishlist}
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                        >
                            {isWishlisted ? (
                                <FaHeart className="text-danger" />
                            ) : (
                                <FaRegHeart className="text-dark" />
                            )}
                            {showTooltip && (
                                <span className="wishlist-tooltip">Add to Wishlist</span>
                            )}
                        </span>

                        {/* View Icon */}
                        <span
                            className="view-icon me-2 position-relative"
                            onClick={() => setShowModal(true)}
                            onMouseEnter={() => setShowViewTooltip(true)}
                            onMouseLeave={() => setShowViewTooltip(false)}
                        >
                            <FaEye size={25} className="text-info text-muted" />
                            {showViewTooltip && (
                                <span className="view-tooltip">View Details</span>
                            )}
                        </span>
                    </div>

                    <div className="card-body product_card_body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">
                            <del className="text-muted">&#8377;{price}</del> - &#8377;{sellingPrice} / {unit}
                        </p>
                        <button className="btn btn-success" onClick={handleAddToCart}>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal for Product Details */}
            {showModal && (
                <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    role="dialog"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-success text-white">
                                <h5 className="modal-title">{name}</h5>
                                <button
                                    type="button"
                                    className="btn-close btn-close-white mt-2 me-2"
                                    onClick={() => setShowModal(false)}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6 text-center">
                                        <img
                                            src={image}
                                            alt={name}
                                            className="img-fluid rounded mb-3"
                                            style={{ maxHeight: "300px", objectFit: "contain" }}
                                        />
                                        <div className="d-flex justify-content-center gap-2">
                                            <img
                                                src={image}
                                                alt={`${name} thumbnail`}
                                                className="img-thumbnail"
                                                style={{ width: "60px", height: "60px", cursor: "pointer" }}
                                               
                                            />
                                            <img
                                                src={image}
                                                alt={`${name} thumbnail 2`}
                                                className="img-thumbnail"
                                                style={{ width: "60px", height: "60px", cursor: "pointer" }}
                                                
                                            />
                                            <img
                                                src={image}
                                                alt={`${name} thumbnail 3`}
                                                className="img-thumbnail"
                                                style={{ width: "60px", height: "60px", cursor: "pointer" }}
                                               
                                            />
                                        </div>
                                    </div>

                                    {/* Right Column*/}
                                    <div className="col-md-6">
                                        <h4>{name}</h4>
                                        <p>
                                            <strong>Price:</strong>{" "}
                                            <del className="text-muted">&#8377;{price}</del> -{" "}
                                            <span className="text-success">
                                                &#8377;{sellingPrice} / {unit}
                                            </span>
                                        </p>
                                        <p>
                                            <strong>Description:</strong> {description}
                                        </p>
                                        <div className="d-flex gap-2 mt-4">
                                            <button
                                                type="button"
                                                className="btn btn-secondary flex-fill"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Close
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-success flex-fill"
                                                onClick={handleAddToCart}
                                            >
                                                <i className="bi bi-cart-plus"></i> Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer bg-light">
                                <p className="mb-0 text-muted text-center">
                                    Discover more products like this!
                                </p>
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
