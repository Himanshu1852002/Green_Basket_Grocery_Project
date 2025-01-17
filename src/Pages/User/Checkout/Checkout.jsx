import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';
import { useDispatch, useSelector } from 'react-redux';

const Checkout = () => {

    const dispatch = useDispatch();
    const { product_list, cartItems, totalCartAmount } = useSelector((state) => state.cart)
    const [deliveryFee, setDeliveryFee] = useState(25);
    const [orderDetails, setOrderDetails] = useState(null);
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        phone: "",
    });
    const url = "http://localhost:3000"
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handlePlaceOrder = async () => {

        if (!data.firstName || !data.lastName || !data.street || !data.city || !data.state || !data.pincode || !data.country || !data.phone) {
            alert('Please fill in all the required address fields.');
            return;
        }

        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        console.log(data);
        const itemsWithDetails = Object.entries(cartItems).map(([id, quantity]) => {
            const item = product_list.find(product => product._id === id);
            return {
                image:item?.image || "image.png",
                name: item?.name || "Unknown",
                price: item?.price || 0,
                quantity
            };
        });

        const totalAmount = totalCartAmount + deliveryFee;

        try {
            const response = await fetch(`${url}/api/orders/createOrder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId,
                    items: itemsWithDetails,
                    amount: totalAmount,
                    address: data,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                setOrderDetails(result.data);
                handlePayment(result.data);
            } else {
                alert(result.message || 'Failed to place order');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Something went wrong. Please try again.');
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
                console.log(response)
                try {
                    const verificationResponse = await fetch(`${url}/api/orders/verifyOrder`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                        body: JSON.stringify(
                            {
                                order_id: order.id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            }
                        ),
                    });

                    const result = await verificationResponse.json();

                    if (verificationResponse.ok) {
                        navigate('/verify',);
                        console.log(orderDetails)
                    } else {
                        alert(result.message || 'Payment verification failed.');
                    }
                } catch (error) {
                    console.error('Error verifying payment:', error);
                    alert('Something went wrong. Please try again.');
                }
            },
            prefill: {
                name: `${data.firstName} ${data.lastName}`,
                email: data.email,
                contact: data.phone,
            },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.on('payment.failed', (response) => {
            console.error('Payment failed:', response);
            alert('Payment failed! Please try again.');
        });
        razorpay.open();
    };


    useEffect(() => {
        if (totalCartAmount > 200) {
            setDeliveryFee(0);
        } else {
            setDeliveryFee(25);
        }
    }, [dispatch, totalCartAmount,]);

    return (
        <div className="container checkout-container">
            <div className="row checkout-row">
                <div className="col-lg-6 address-col">
                    <h2 className="fw-bold mb-3">Delivery Information</h2>
                    <div className="d-flex flex-column gap-2 mt-3 mb-3">
                        <div className="d-flex gap-2">
                            <input
                                name="firstName"
                                onChange={onChangeHandler}
                                value={data.firstName}
                                className="w-50 p-2"
                                type="text"
                                placeholder="First name"
                            />
                            <input
                                name="lastName"
                                onChange={onChangeHandler}
                                value={data.lastName}
                                className="w-50 p-2"
                                type="text"
                                placeholder="Last name"
                            />
                        </div>
                        <input
                            name="email"
                            onChange={onChangeHandler}
                            value={data.email}
                            className="p-2"
                            type="email"
                            placeholder="Email address"
                        />
                        <input
                            name="street"
                            onChange={onChangeHandler}
                            value={data.street}
                            className="p-2"
                            type="text"
                            placeholder="Street"
                        />
                        <div className="d-flex gap-2">
                            <input
                                name="city"
                                onChange={onChangeHandler}
                                value={data.city}
                                className="w-50 p-2"
                                type="text"
                                placeholder="City"
                            />
                            <input
                                name="state"
                                onChange={onChangeHandler}
                                value={data.state}
                                className="w-50 p-2"
                                type="text"
                                placeholder="State"
                            />
                        </div>
                        <div className="d-flex gap-2">
                            <input
                                name="pincode"
                                onChange={onChangeHandler}
                                value={data.pincode}
                                className="w-50 p-2"
                                type="text"
                                placeholder="Pin Code"
                            />
                            <input
                                name="country"
                                onChange={onChangeHandler}
                                value={data.country}
                                className="w-50 p-2"
                                type="text"
                                placeholder="Country"
                            />
                        </div>
                        <input
                            name="phone"
                            onChange={onChangeHandler}
                            value={data.phone}
                            className="w-100 p-2"
                            type="number"
                            placeholder="Phone no."
                        />
                    </div>
                </div>
                <div className="col-lg-6 mt-sm-5 mt-lg-0">
                    <h2 className="fw-bold mb-3">Cart Total</h2>
                    <div className="d-flex justify-content-between border-bottom border-3">
                        <p className="fw-bold">Subtotal</p>
                        <p>₹{totalCartAmount}</p>
                    </div>
                    <div className="d-flex justify-content-between border-bottom border-3">
                        <p className="fw-bold">Delivery Fee</p>
                        <p>₹{deliveryFee > 0 ? deliveryFee : 'Free ₹0'}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p className="fw-bold">Total</p>
                        <p>₹{totalCartAmount + deliveryFee}</p>
                    </div>
                    <button
                        onClick={handlePlaceOrder}
                        className="mt-2 w-md-50 w-sm-100 btn"
                    >
                        Proceed To Payment
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Checkout;
