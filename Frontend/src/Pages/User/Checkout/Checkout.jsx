import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Checkout.css';
import { useSelector, useDispatch } from 'react-redux';
import { addToCartAPI, removeFromCartAPI, clearCartData } from '../../../Store/cartSlice';
import {
    FaMapMarkerAlt, FaShoppingBag, FaTruck, FaMoneyBillWave,
    FaCreditCard, FaTag, FaCheck, FaSpinner, FaTrash, FaUser
} from 'react-icons/fa';
import { MdStickyNote2 } from 'react-icons/md';

const Field = ({ name, type = 'text', placeholder, value, error, onChange }) => (
    <div className="co-field">
        <input
            className={`co-input${error ? ' co-input-error' : ''}`}
            name={name} type={type} value={value}
            onChange={onChange} placeholder={placeholder}
        />
        {error && <span className="co-error">{error}</span>}
    </div>
);

const COUPONS = {
    FRESH10: { type: 'percent', value: 10, label: '10% off' },
    SAVE20: { type: 'flat', value: 20, label: '₹20 off' },
    GREEN50: { type: 'flat', value: 50, label: '₹50 off' },
};

const STEPS = ['Cart', 'Delivery', 'Payment', 'Confirm'];

const Checkout = () => {
    const dispatch = useDispatch();
    const { product_list, cartItems, totalCartAmount, token } = useSelector((state) => state.cart);
    const navigate = useNavigate();

    const [deliveryFee, setDeliveryFee] = useState(25);
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [loading, setLoading] = useState(false);
    const [orderNote, setOrderNote] = useState('');
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [couponError, setCouponError] = useState('');
    const [errors, setErrors] = useState({});

    const [data, setData] = useState({
        firstName: '', lastName: '', email: '', street: '',
        city: '', state: '', pincode: '', country: '', phone: '',
    });

    const url = 'https://green-basket-grocery-project.onrender.com';

    // Redirect if not logged in
    useEffect(() => {
        if (!token) navigate('/login');
    }, [token, navigate]);

    useEffect(() => {
        setDeliveryFee(totalCartAmount > 200 ? 0 : 25);
    }, [totalCartAmount]);

    // Auto-fill email from localStorage
    useEffect(() => {
        const savedEmail = localStorage.getItem('email');
        const savedName = localStorage.getItem('name');
        if (savedEmail) setData((prev) => ({ ...prev, email: savedEmail }));
        if (savedName) setData((prev) => ({ ...prev, firstName: savedName }));
    }, []);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const required = ['firstName', 'lastName', 'email', 'street', 'city', 'state', 'pincode', 'country', 'phone'];
        const newErrors = {};
        required.forEach((field) => {
            if (!data[field].trim()) newErrors[field] = 'This field is required';
        });
        if (data.email && !/\S+@\S+\.\S+/.test(data.email)) newErrors.email = 'Enter a valid email';
        if (data.phone && !/^\d{10}$/.test(data.phone)) newErrors.phone = 'Enter a valid 10-digit phone number';
        if (data.pincode && !/^\d{6}$/.test(data.pincode)) newErrors.pincode = 'Enter a valid 6-digit pincode';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const applyCoupon = () => {
        const code = couponCode.trim().toUpperCase();
        if (COUPONS[code]) {
            setAppliedCoupon({ code, ...COUPONS[code] });
            setCouponError('');
        } else {
            setCouponError('Invalid coupon code');
            setAppliedCoupon(null);
        }
    };

    const removeCoupon = () => {
        setAppliedCoupon(null);
        setCouponCode('');
        setCouponError('');
    };

    const getDiscount = () => {
        if (!appliedCoupon) return 0;
        if (appliedCoupon.type === 'percent') return Math.round(totalCartAmount * appliedCoupon.value / 100);
        return appliedCoupon.value;
    };

    const finalTotal = totalCartAmount + deliveryFee - getDiscount();

    const getEstimatedDelivery = () => {
        const date = new Date();
        date.setDate(date.getDate() + 3);
        return date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
    };

    const handlePlaceOrder = async () => {
        if (!validate()) return;
        setLoading(true);
        const userId = localStorage.getItem('userId');
        const storedToken = localStorage.getItem('token');
        const itemsWithDetails = Object.entries(cartItems).map(([id, quantity]) => {
            const item = product_list.find((p) => p._id === id);
            return { image: item?.image || 'image.png', name: item?.name || 'Unknown', price: item?.sellingPrice || 0, quantity };
        });

        try {
            const response = await fetch(`${url}/api/orders/createOrder`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${storedToken}` },
                body: JSON.stringify({
                    userId, items: itemsWithDetails, amount: finalTotal, address: data,
                    paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit/Debit Card',
                    note: orderNote,
                }),
            });
            const result = await response.json();
            if (response.ok) {
                if (paymentMethod === 'cod') {
                    dispatch(clearCartData());
                    navigate('/user/verify');
                } else {
                    handlePayment(result.data);
                }
            } else {
                alert(result.message || 'Failed to place order.');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = (order) => {
        const options = {
            key: 'rzp_test_8gC9zCCVpPxjF1',
            amount: order.amount * 100,
            currency: 'INR',
            name: 'Green Basket',
            description: 'Order Payment',
            order_id: order.id,
            handler: async (response) => {
                try {
                    const verificationResponse = await fetch(`${url}/api/orders/verifyOrder`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
                        body: JSON.stringify({
                            order_id: order.id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        }),
                    });
                    const result = await verificationResponse.json();
                    if (verificationResponse.ok) {
                        dispatch(clearCartData());
                        navigate('/user/verify');
                    } else alert(result.message || 'Payment verification failed.');
                } catch (error) {
                    console.error('Error verifying payment:', error);
                    alert('Something went wrong. Please try again.');
                }
            },
            prefill: { name: `${data.firstName} ${data.lastName}`, email: data.email, contact: data.phone },
        };
        const razorpay = new window.Razorpay(options);
        razorpay.on('payment.failed', () => alert('Payment failed! Please try again.'));
        razorpay.open();
    };

    const cartProductList = Object.entries(cartItems).map(([id, qty]) => {
        const item = product_list.find((p) => p._id === id);
        return item ? { ...item, qty } : null;
    }).filter(Boolean);

    return (
        <div className="co-page">

            {/* Step indicator */}
            <div className="co-steps">
                {STEPS.map((step, i) => (
                    <div key={step} className={`co-step${i === 1 ? ' active' : i < 1 ? ' done' : ''}`}>
                        <div className="co-step-circle">{i < 1 ? <FaCheck size={10} /> : i + 1}</div>
                        <span className="co-step-label">{step}</span>
                        {i < STEPS.length - 1 && <div className={`co-step-line${i < 1 ? ' done' : ''}`} />}
                    </div>
                ))}
            </div>

            <div className="co-wrapper">

                {/* LEFT — Delivery + Note */}
                <div className="co-left">

                    {/* Login info */}
                    <div className="co-login-info">
                        <FaUser size={13} />
                        <span>Logged in &nbsp;·&nbsp;</span>
                        <Link to="/user/myorders" className="co-orders-link">View My Orders</Link>
                    </div>

                    <div className="co-section-title">
                        <FaMapMarkerAlt size={15} />
                        <span>Delivery Information</span>
                    </div>

                    <div className="co-form">
                        <div className="co-row">
                            <Field name="firstName" placeholder="First Name" value={data.firstName} error={errors.firstName} onChange={onChangeHandler} />
                            <Field name="lastName" placeholder="Last Name" value={data.lastName} error={errors.lastName} onChange={onChangeHandler} />
                        </div>
                        <Field name="email" type="email" placeholder="Email Address" value={data.email} error={errors.email} onChange={onChangeHandler} />
                        <Field name="street" placeholder="Street Address" value={data.street} error={errors.street} onChange={onChangeHandler} />
                        <div className="co-row">
                            <Field name="city" placeholder="City" value={data.city} error={errors.city} onChange={onChangeHandler} />
                            <Field name="state" placeholder="State" value={data.state} error={errors.state} onChange={onChangeHandler} />
                        </div>
                        <div className="co-row">
                            <Field name="pincode" placeholder="Pin Code" value={data.pincode} error={errors.pincode} onChange={onChangeHandler} />
                            <Field name="country" placeholder="Country" value={data.country} error={errors.country} onChange={onChangeHandler} />
                        </div>
                        <Field name="phone" type="number" placeholder="Phone Number (10 digits)" value={data.phone} error={errors.phone} onChange={onChangeHandler} />
                    </div>

                    {/* Estimated delivery */}
                    <div className="co-delivery-est">
                        <FaTruck size={13} />
                        <span>Estimated Delivery: <strong>{getEstimatedDelivery()}</strong></span>
                    </div>

                    {/* Order note */}
                    <div className="co-note-section">
                        <div className="co-section-title" style={{ marginTop: '20px' }}>
                            <MdStickyNote2 size={16} />
                            <span>Order Note <span className="co-optional">(optional)</span></span>
                        </div>
                        <textarea
                            className="co-textarea"
                            rows={3}
                            placeholder="e.g. Leave at door, Call before delivery..."
                            value={orderNote}
                            onChange={(e) => setOrderNote(e.target.value)}
                        />
                    </div>
                </div>

                {/* RIGHT — Order Summary */}
                <div className="co-right">

                    <div className="co-section-title">
                        <FaShoppingBag size={15} />
                        <span>Order Summary ({cartProductList.length} items)</span>
                    </div>

                    {/* Editable cart items */}
                    <div className="co-items">
                        {cartProductList.map((item) => (
                            <div key={item._id} className="co-item">
                                <div className="co-item-img-wrap">
                                    <img src={`${url}/uploads/${item.image}`} alt={item.name} className="co-item-img" />
                                </div>
                                <div className="co-item-info">
                                    <p className="co-item-name">{item.name}</p>
                                    <p className="co-item-meta">₹{item.sellingPrice} / {item.unit}</p>
                                    <div className="co-item-qty">
                                        <button className="co-qty-btn" onClick={() => dispatch(removeFromCartAPI({ itemId: item._id, token }))}>−</button>
                                        <span className="co-qty-num">{item.qty}</span>
                                        <button className="co-qty-btn" onClick={() => dispatch(addToCartAPI({ itemId: item._id, token }))}>+</button>
                                    </div>
                                </div>
                                <div className="co-item-right">
                                    <span className="co-item-total">₹{item.sellingPrice * item.qty}</span>
                                    <button className="co-item-del" onClick={() => {
                                        for (let i = 0; i < item.qty; i++) dispatch(removeFromCartAPI({ itemId: item._id, token }));
                                    }} title="Remove item">
                                        <FaTrash size={10} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Coupon */}
                    <div className="co-coupon">
                        <div className="co-section-title" style={{ marginBottom: '10px' }}>
                            <FaTag size={13} />
                            <span>Coupon Code</span>
                        </div>
                        {appliedCoupon ? (
                            <div className="co-coupon-applied">
                                <span>🎉 <strong>{appliedCoupon.code}</strong> — {appliedCoupon.label} applied!</span>
                                <button className="co-coupon-remove" onClick={removeCoupon}>Remove</button>
                            </div>
                        ) : (
                            <div className="co-coupon-row">
                                <input
                                    className="co-input co-coupon-input"
                                    placeholder="Enter coupon code"
                                    value={couponCode}
                                    onChange={(e) => { setCouponCode(e.target.value); setCouponError(''); }}
                                    onKeyDown={(e) => e.key === 'Enter' && applyCoupon()}
                                />
                                <button className="co-coupon-btn" onClick={applyCoupon}>Apply</button>
                            </div>
                        )}
                        {couponError && <span className="co-error">{couponError}</span>}
                        <p className="co-coupon-hint">Try: FRESH10 · SAVE20 · GREEN50</p>
                    </div>

                    {/* Price summary */}
                    <div className="co-summary">
                        <div className="co-summary-row">
                            <span>Subtotal</span>
                            <span>₹{totalCartAmount}</span>
                        </div>
                        <div className="co-summary-row">
                            <span className="co-delivery-label"><FaTruck size={11} /> Delivery Fee</span>
                            {deliveryFee === 0 ? <span className="co-free">FREE</span> : <span>₹{deliveryFee}</span>}
                        </div>
                        {deliveryFee === 0 && <p className="co-free-note">🎉 Free delivery on orders above ₹200!</p>}
                        {appliedCoupon && (
                            <div className="co-summary-row co-discount-row">
                                <span>Discount ({appliedCoupon.code})</span>
                                <span>− ₹{getDiscount()}</span>
                            </div>
                        )}
                        <div className="co-summary-row co-total-row">
                            <span>Total</span>
                            <span className="co-total-amt">₹{finalTotal}</span>
                        </div>
                    </div>

                    {/* Payment method */}
                    <div className="co-payment">
                        <p className="co-payment-label">Payment Method</p>
                        <div className="co-payment-options">
                            <label className={`co-pay-option${paymentMethod === 'cod' ? ' active' : ''}`}>
                                <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                                <FaMoneyBillWave size={15} />
                                <span>Cash on Delivery</span>
                            </label>
                            <label className={`co-pay-option${paymentMethod === 'card' ? ' active' : ''}`}>
                                <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                                <FaCreditCard size={15} />
                                <span>Credit / Debit Card</span>
                            </label>
                        </div>
                    </div>

                    <button className="co-place-btn" onClick={handlePlaceOrder} disabled={loading}>
                        {loading
                            ? <><FaSpinner className="co-spinner" size={14} /> Placing Order...</>
                            : <>{paymentMethod === 'cod' ? 'Place Order' : 'Proceed to Payment'} →</>
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
