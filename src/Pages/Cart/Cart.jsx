import { useSelector, useDispatch } from 'react-redux';
import { increaseItem, decreaseItem, removeFromCart } from '../../Store/cartSlice';
import { FaRegTrashAlt } from "react-icons/fa";
import shopping_bag from '../../assets/Images/Images/shopping_bag.png'
import './Cart.css'; // Optional: for additional styling
import { Link } from 'react-router-dom';

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const totalAmount = useSelector((state) => state.cart.totalAmount);

    const handleRemoveFromCart = (item_id) => {
        dispatch(removeFromCart(item_id));
    };

    const handleIncreaseQuantity = (item) => {
        dispatch(increaseItem(item));
    };

    const handleDecreaseQuantity = (item_id) => {
        dispatch(decreaseItem(item_id));
    };



    return (
        <div className="container mt-5">
            <h3 className="heading_text">My Cart</h3>

            <hr />

            {cartItems.length === 0 ? (
                <>
                    <div className='d-flex justify-content-center align-items-center flex-column'>
                        <img className='bag' src={shopping_bag} alt="/" />
                        <p className="text-center fw-bold fs-3">I am Empty! </p>
                        <Link to="/" className="btn mt-2">
                            Continue Shopping
                        </Link>
                    </div>
                </>
            ) : (
                <div className="row">
                    {cartItems.map((item) => (
                        <div key={item.id} className="col-12 mb-3">
                            <div className="card p-3 d-flex flex-md-row flex-column align-items-center shadow-sm cart-item-card">
                                <img src={item.imgSrc} alt={item.name} className="img-fluid mb-3 mb-md-0 rounded" style={{ width: '80px', height: '80px' }} />
                                <div className="ms-md-3 text-center text-md-start flex-grow-1">
                                    <h5 className="mb-1">{item.item_name}</h5>
                                    <p className="text-muted mb-2">Price: ₹{item.totalPrice}</p>
                                </div>
                                <div className="d-flex align-items-center quantity-controls">
                                    <button className="btn btn-outline-secondary btn-sm" onClick={() => handleDecreaseQuantity(item.item_id)}>-</button>
                                    <span className="mx-2">{item.quantity}</span>
                                    <button className="btn btn-outline-secondary btn-sm" onClick={() => handleIncreaseQuantity(item)}>+</button>
                                </div>
                                <button
                                    className="btn btn-danger ms-md-3 mt-2 mt-md-0"
                                    onClick={() => handleRemoveFromCart(item.item_id)}
                                    title="Remove Item"
                                >
                                    <FaRegTrashAlt />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="cart-summary mt-4 d-flex justify-content-between align-items-center border-top pt-3">
                <h4 className='mb-0'>Total Items: {totalQuantity}</h4>
                <h4 className="mb-0">Total: ₹{totalAmount}</h4>
                <button>Proceed to Checkout</button>
            </div>
        </div>
    );
};

export default Cart;