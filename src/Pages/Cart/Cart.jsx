import { useSelector, useDispatch } from 'react-redux';
import { increaseItem,decreaseItem, removeFromCart } from '../../Store/cartSlice';
import './Cart.css'; // You can add some custom CSS if needed
import { FaRegTrashAlt } from "react-icons/fa";

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
        <div className="container-fluid cart_container">
           <div className="row cart_top_row d-flex justify-content-center align-items-center ">
            <div className="col-12">
                    <h2 className="text-center mb-4 fw-bold">SHOPPING CART</h2>
            </div>
           </div>

            {cartItems.length === 0 ? (
                <p className="text-center fw-bold fs-3 my-5">Your cart is empty.</p>
            ) : (
                <>
                    <div className="row">
                        {/* Cart Items */}
                        <div className="col-lg-8">
                            {cartItems.map((item) => (
                                <div className="card mb-3" key={item.item_id}>
                                    <div className="row g-0">
                                        <div className="col-md-4 col-sm-4 cart_item_img d-flex justify-content-center align-items-center">
                                            <img src={item.imgSrc} className="img-fluid rounded-start"   />
                                        </div>
                                        <div className="col-md-8 col-sm-8">
                                            <div className="card-body cart_card_body">
                                                <h5 className="card-title">Name: {item.item_name}</h5>
                                                <p className="card-text">Price: {item.item_price} rs</p>
                                                <div className="d-flex justify-content-between align-items-center cart_add_remove">
                                                    <div className="d-flex justify-content-between align-items-center cart_inc_dec">
                                                        <button
                                                            className="btn btn-sm me-3"
                                                            onClick={() => handleDecreaseQuantity(item.item_id)}
                                                        >
                                                            -
                                                        </button>
                                                        <span className='fw-bold'>{item.quantity}</span>
                                                        <button
                                                            className="btn btn-sm  ms-3"
                                                            onClick={() => handleIncreaseQuantity(item)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <p className="card-text mt-3 fw-bolder">
                                                        Total :  {item.totalPrice} rs
                                                    </p>
                                                    <button
                                                        className="btn cart_remove_btn btn-sm"
                                                        onClick={() => handleRemoveFromCart(item.item_id)}
                                                    >
                                                        <FaRegTrashAlt />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Cart Summary */}
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Cart Summary</h5>
                                    <p>Total Items: {totalQuantity}</p>
                                    <p>Total Amount: {totalAmount} rs</p>
                                    <button className="btn btn-success w-100">Proceed to Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
