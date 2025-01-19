import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import {
    fetchProductList,
    loadCartData,
    addToCartAPI,
    removeFromCartAPI,
} from "../../../Store/cartSlice";
import "./CartSidebar.css";

const CartSidebar = ({ show, onClose }) => {
    const dispatch = useDispatch();
    const { product_list, cartItems, token, totalCartAmount } = useSelector(
        (state) => state.cart
    );

    useEffect(() => {
        dispatch(fetchProductList());
    }, [dispatch]);

    useEffect(() => {
        if (token) {
            dispatch(loadCartData(token));
        }
    }, [dispatch, token]);

    const handleAddToCart = (itemId) => {
        if (token) {
            dispatch(addToCartAPI({ itemId, token }));
        } else {
            alert("Please log in to add items to your cart.");
        }
    };

    const handleRemoveFromCart = (itemId) => {
        dispatch(removeFromCartAPI({ itemId, token }));
    };

    const calculateTotalQuantity = () => {
        return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
    };

    const isCartEmpty = Object.keys(cartItems).length === 0;

    useEffect(() => {
        if (show) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [show]);

    return (
        <>
            {show && (
                <div className="backdrop" onClick={onClose}></div>
            )}

            <div className={`cart-sidebar ${show ? "show" : ""}`}>
                <div className="cart-header">
                    <h5>My Cart ({calculateTotalQuantity()} Items)</h5>
                    <FaTimes size={30} onClick={onClose} style={{ cursor: "pointer",border:"2px solid white",padding:"5px",borderRadius:"10px" }} />
                </div>

                {isCartEmpty ? (
                    <div className="mt-5 d-flex justify-content-center align-items-center flex-column">
                        <p className="fs-5 fw-bold">Your cart is empty!</p>
                        <Link to="/fruits" className="btn-success btn" onClick={onClose}>
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="cart-items row mt-2 px-2">
                        {product_list.map(
                            (item) =>
                                cartItems[item._id] > 0 && (
                                    <div key={item._id} className="cart-item d-flex justify-content-evenly align-items-center py-2 position-relative border-2 border-bottom">
                                        <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                                            <img
                                                src={`http://localhost:3000/uploads/${item.image}`}
                                                alt={item.name}
                                                className="cart-item-img"
                                            />
                                            <h6>{item.name}</h6>
                                        </div>
                                        <div className="d-flex flex-column justify-content-center align-items-center">
                                            <p>Price: <del className="text-muted">₹{item.price}</del>-₹{item.sellingPrice}</p>
                                            <p>Subtotal: ₹{item.sellingPrice * cartItems[item._id]}</p>

                                            <div className="quantity-controls d-flex gap-3">
                                                <button
                                                    className="btn btn-sm"
                                                    onClick={() => handleRemoveFromCart(item._id)}
                                                >
                                                    -
                                                </button>
                                                <span className="mx-2">{cartItems[item._id]}</span>
                                                <button
                                                    className="btn btn-sm"
                                                    onClick={() => handleAddToCart(item._id)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <button
                                            className="remove-item-btn position-absolute top-0 end-0"
                                            onClick={() => handleRemoveFromCart(item._id)}
                                            title="Remove Item"
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                )
                        )}
                    </div>


                )}

                {!isCartEmpty && (
                    <div className="cart-footer">
                        <div className="d-flex justify-content-between mb-2">
                            <h6>Total:</h6>
                            <h6>₹{totalCartAmount}</h6>
                        </div>
                        <div className="d-flex justify-content-between mb-3 text-success">
                            <h6>You Save:</h6>
                            <h6>₹{Object.keys(cartItems).reduce((total, id) => {
                                const item = product_list.find((product) => product._id === id);
                                return item
                                    ? total + (item.price - item.sellingPrice) * cartItems[id]
                                    : total;
                            }, 0)}</h6>
                        </div>
                        <Link to="/user/checkout" className="footer-btn" onClick={onClose}>
                            Proceed to Checkout
                        </Link>
                    </div>


                )}
            </div>
        </>
    );
};

CartSidebar.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default CartSidebar;
