import { FaRegTrashAlt } from "react-icons/fa";
import shopping_bag from '../../assets/Images/Images/shopping_bag.png';
import './Cart.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchProductList,
    loadCartData,
    addToCartAPI,
    removeFromCartAPI,
} from '../../Store/cartSlice';
import { useEffect } from "react";

const Cart = () => {
    const dispatch = useDispatch();
    const { product_list, cartItems, token, totalCartAmount } = useSelector((state) => state.cart);
    const url = "http://localhost:3000";

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
            alert('Please log in to add items to your cart.');
        }
    };

    const handleRemoveFromCart = (itemId) => {
        if (cartItems[itemId] > 1) {
            dispatch(removeFromCartAPI({ itemId, token }));
        } else {
            dispatch(removeFromCartAPI({ itemId, token }));
        }
    };

    const calculateTotalQuantity = () => {
        return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
    };

    const isCartEmpty = Object.keys(cartItems).length === 0;

    return (
        <div className="container mt-5">
            <h3 className="heading_text">My Cart</h3>
            <hr />
            {isCartEmpty ? (
                <div className='d-flex justify-content-center align-items-center flex-column'>
                    <img className='bag' src={shopping_bag} alt="Cart is empty" />
                    <p className="text-center fw-bold fs-3">I am Empty!</p>
                    <Link to="/" className="btn mt-2">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="row">
                    {product_list.map((item) => (
                        cartItems[item._id] > 0 && (
                            <div key={item._id} className="col-12 mb-3 cart_column">
                                <div className="card p-3 d-flex flex-md-row flex-sm-row flex-column align-items-center shadow-sm cart-item-card">
                                    <img
                                        src={`${url}/uploads/${item.image}`}
                                        alt={item.name}
                                        className="img-fluid mb-3 mb-md-0 rounded"
                                        style={{ width: '80px', height: '80px' }}
                                    />
                                    <div className="ms-md-3 text-center text-md-start flex-grow-1">
                                        <h5 className="mb-1">{item.name}</h5>
                                        <p className="text-muted">Price: ₹{item.price}</p>
                                        <p className="text-muted">Subtotal: ₹{item.price * cartItems[item._id]}</p>
                                    </div>
                                    <div className="d-flex align-items-center quantity-controls">
                                        <button
                                            className="btn btn-outline-secondary btn-sm"
                                            onClick={() => handleRemoveFromCart(item._id)}
                                        >
                                            -
                                        </button>
                                        <span className="mx-2">{cartItems[item._id]}</span>
                                        <button
                                            className="btn btn-outline-secondary btn-sm"
                                            onClick={() => handleAddToCart(item._id)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        className="btn btn-danger ms-md-3 mt-2 mb-sm-2 mb-md-0 mt-md-0 remove_btn"
                                        onClick={() => handleRemoveFromCart(item._id)}
                                        title="Remove Item"
                                    >
                                        <FaRegTrashAlt />
                                    </button>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            )}

            {!isCartEmpty && (
                <div className="cart-summary mt-4 d-flex justify-content-between align-items-center border-top pt-3">
                    <h4 className="mb-0">Total: ₹{totalCartAmount}</h4>
                    <h4 className="mb-0">Items in Cart: {calculateTotalQuantity()}</h4>
                    <Link to={'/checkout'} className='btn'>Proceed to Checkout</Link>
                </div>
            )}
        </div>
       
    );
};

export default Cart;
