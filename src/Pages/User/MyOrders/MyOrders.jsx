import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import no_order_img from "../../../assets/Images/Images/order_no.png";
import { fetchOrders } from "../../../Store/orderSlice";
import "./MyOrders.css";

const OrderDetails = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state.order);
    const [expandedOrder, setExpandedOrder] = useState(null); // Track the expanded order ID

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const toggleOrderDetails = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    return (
        <>
            <div className="container-fluid py-3" style={{ backgroundColor: "#263d2f", color: "#fff" }}>
                <div className="d-flex justify-content-center align-items-center flex-column">
                    <p className="text-white">Home &gt; My Orders</p>
                    <h1 className="text-center text-white fw-bold">My Orders</h1>
                </div>
            </div>

            <div className="order-details container py-5" style={{ marginTop: "40px" }}>
                <div className="order-list">
                    {orders.length === 0 ? (
                        <div className="d-flex flex-column align-items-center justify-content-center py-5">
                            <img
                                src={no_order_img}
                                alt="No Orders"
                                className="img-fluid order-no-img"
                            />
                            <h2 className="text-center">No Orders Found!</h2>
                        </div>
                    ) : (
                        orders.map((order) => (
                            <div key={order._id} className="order-card border rounded mb-4 p-3 shadow-sm">
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-6 mb-2 mb-md-0">
                                        <p className="mb-1 text-muted">
                                            <strong>Items:</strong>
                                        </p>
                                        <p className="mb-0">
                                            {order.items.map((item, i) => (
                                                <span key={i} className="d-block">
                                                    <strong>{item.name}</strong> x {item.quantity} = &#8377;
                                                    {item.price * item.quantity}
                                                </span>
                                            ))}
                                        </p>
                                    </div>
                                    <div className="col-6 col-md-3 text-center">
                                        <p className="mb-1 text-muted">
                                            <strong>Total Amount:</strong>
                                        </p>
                                        <p className="mb-0">&#8377;{order.amount}</p>
                                    </div>
                                    <div className="col-6 col-md-3 text-center">
                                        <button
                                            className="btn btn-success w-100"
                                            onClick={() => toggleOrderDetails(order._id)}
                                        >
                                            {expandedOrder === order._id ? "Hide Details" : "View Order"}
                                        </button>
                                    </div>
                                </div>

                                {expandedOrder === order._id && (
                                    <div className="order-details-popup mt-3 p-3 border rounded bg-light">
                                        <h5 className="mb-3">Order Details</h5>
                                        <p className="mb-1 text-muted">
                                            <strong>Order ID:</strong> {order._id}
                                        </p>
                                        <p className="mb-1 text-muted">
                                            <strong>Order Status:</strong> {order.orderStatus}
                                        </p>
                                        <p className="mb-3 text-muted">
                                            <strong>Placed On:</strong> {order.date}
                                        </p>
                                        <div>
                                            <p className="mb-1 text-muted">
                                                <strong>Items:</strong>
                                            </p>
                                            {order.items.map((item, i) => (
                                                <div key={i} className="d-flex align-items-center mb-2">
                                                    <img
                                                        src={`http://localhost:3000/uploads/${item.image}`} // Fallback image if no image found
                                                        alt={item.name}
                                                        className="img-thumbnail me-2"
                                                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                                    />
                                                    <p className="mb-0">
                                                        {item.name} - Quantity: {item.quantity}, Price: &#8377;{item.price}
                                                    </p>
                                                </div>
                                            ))}

                                        </div>
                                        <button className="btn btn-danger mt-3">Cancel Order</button>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default OrderDetails;
