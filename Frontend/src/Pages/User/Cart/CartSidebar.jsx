import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaTimes, FaShoppingCart, FaTrash } from "react-icons/fa";
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

    useEffect(() => { dispatch(fetchProductList()); }, [dispatch]);

    useEffect(() => {
        if (token) dispatch(loadCartData(token));
    }, [dispatch, token]);

    const handleAdd = (itemId) => {
        if (token) dispatch(addToCartAPI({ itemId, token }));
        else alert("Please log in to add items to your cart.");
    };

    const handleRemove = (itemId) => dispatch(removeFromCartAPI({ itemId, token }));

    const totalQty = Object.values(cartItems).reduce((t, q) => t + q, 0);
    const isCartEmpty = Object.keys(cartItems).length === 0;

    const totalSavings = Object.keys(cartItems).reduce((total, id) => {
        const item = product_list.find((p) => p._id === id);
        return item ? total + (item.price - item.sellingPrice) * cartItems[id] : total;
    }, 0);

    useEffect(() => {
        document.body.style.overflow = show ? "hidden" : "auto";
        return () => { document.body.style.overflow = "auto"; };
    }, [show]);

    return (
        <>
            {show && <div className="cs-backdrop" onClick={onClose} />}

            <div className={`cs-sidebar${show ? " show" : ""}`}>

                {/* Header */}
                <div className="cs-header">
                    <div className="cs-header-left">
                        <FaShoppingCart size={18} />
                        <span>My Cart</span>
                        {totalQty > 0 && <span className="cs-badge">{totalQty}</span>}
                    </div>
                    <button className="cs-close-btn" onClick={onClose}>
                        <FaTimes size={15} />
                    </button>
                </div>

                {/* Empty state */}
                {isCartEmpty ? (
                    <div className="cs-empty">
                        <div className="cs-empty-icon">🛒</div>
                        <p className="cs-empty-title">Your cart is empty!</p>
                        <p className="cs-empty-sub">Add some fresh items to get started</p>
                        <Link to="/user/fruits" className="cs-shop-btn" onClick={onClose}>
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="cs-items">
                        {product_list.map((item) =>
                            cartItems[item._id] > 0 && (
                                <div key={item._id} className="cs-item">
                                    <div className="cs-item-img-wrap">
                                        <img
                                            src={`http://localhost:3000/uploads/${item.image}`}
                                            alt={item.name}
                                            className="cs-item-img"
                                        />
                                    </div>
                                    <div className="cs-item-info">
                                        <p className="cs-item-name">{item.name}</p>
                                        <div className="cs-item-price">
                                            <del className="cs-original">₹{item.price}</del>
                                            <span className="cs-selling">₹{item.sellingPrice}</span>
                                            <span className="cs-unit">/ {item.unit}</span>
                                        </div>
                                        <div className="cs-qty-row">
                                            <div className="cs-qty">
                                                <button className="cs-qty-btn" onClick={() => handleRemove(item._id)}>−</button>
                                                <span className="cs-qty-num">{cartItems[item._id]}</span>
                                                <button className="cs-qty-btn" onClick={() => handleAdd(item._id)}>+</button>
                                            </div>
                                            <span className="cs-subtotal">₹{item.sellingPrice * cartItems[item._id]}</span>
                                        </div>
                                    </div>
                                    <button className="cs-delete-btn" onClick={() => handleRemove(item._id)} title="Remove">
                                        <FaTrash size={11} />
                                    </button>
                                </div>
                            )
                        )}
                    </div>
                )}

                {/* Footer */}
                {!isCartEmpty && (
                    <div className="cs-footer">
                        {totalSavings > 0 && (
                            <div className="cs-savings">
                                🎉 You save <strong>₹{totalSavings}</strong> on this order!
                            </div>
                        )}
                        <div className="cs-total-row">
                            <span>Total Amount</span>
                            <span className="cs-total-amt">₹{totalCartAmount}</span>
                        </div>
                        <Link to="/user/checkout" className="cs-checkout-btn" onClick={onClose}>
                            Proceed to Checkout →
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
