import axios from "axios";
import { useEffect, useState } from "react";
import "./Orders.css";
import { FaArrowDown, FaArrowUp,} from "react-icons/fa";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [expandedOrder, setExpandedOrder] = useState(null); // Track the expanded order
    const url = "http://localhost:3000";

    const fetchAllOrders = async () => {
        axios.get(`${url}/api/orders/fetchAllOrders`)
            .then((response) => {
                setOrders(response.data.data);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
            });
    };

    const statusHandler = async (event, orderId) => {
        const newStatus = event.target.value;

        const response = await axios.post(`${url}/api/orders/updateStatus`, {
            orderId,
            orderStatus: newStatus,
            cancelReason: newStatus === "Cancelled" ? "Corrupt Order" : "",
            cancelledBy: newStatus === "Cancelled" ? "Admin" : "",
        });

        if (response.data.success) {
            await fetchAllOrders();
        }
    };

    const toggleOrderDetails = (orderId) => {
        setExpandedOrder(prev => (prev === orderId ? null : orderId)); // Toggle expanded state
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <div className="container d-flex justify-content-center align-items-center flex-column mt-5 my-5">
            <h1 className="text-center text-muted mt-5 mb-4">All Orders</h1>
            <div className="row w-75">
                {orders.map((order) => (
                    <div key={order._id} className="col-lg-12 mb-4">
                        <div className={`order-card card shadow-sm ${expandedOrder === order._id ? "expanded" : ""}`}>
                            <div className="order-card-body card-body">
                                <h5 className="card-title">User Name: {order.address.firstName} {order.address.lastName}</h5>
                                <h6 className="card-subtitle mb-3 text-muted">Order ID: {order._id}</h6>
                                <h6 className="mb-2">Phone No.: {order.address.phone}</h6>
                                <h6 className="mb-2">Amount: ₹{order.amount}</h6>
                                <h6 className="mb-2">Payment Status:
                                    <span className={`badge ${order.payment ? "bg-success" : "bg-warning"}`}>
                                        {order.paymentMethod}
                                    </span>
                                </h6>
                                <h6 className="mb-2">Order Status:
                                    <span className={`badge ${order.orderStatus === "Delivered" ? "bg-success" : "bg-info"}`}>
                                        {order.orderStatus}
                                    </span>
                                </h6>
                                <h6 className="mb-2">Estimated Delivery Time:
                                    <span className="badge bg-primary">
                                        {order.deliveryTime}
                                    </span>
                                </h6>

                                {/* Show cancel reason if the order is cancelled */}
                                {order.orderStatus === "Cancelled" && order.cancelReason && (
                                    <div className="alert alert-danger mt-3">
                                        <strong>Order Cancelled:</strong> {order.cancelReason}
                                        <br />
                                        <strong>Order Cancelled By:</strong> {order.cancelledBy}
                                    </div>
                                )}

                                {/* Status Change Dropdown */}
                                {order.orderStatus !== "Cancelled" ? (
                                    <div>
                                        <label htmlFor={`status-select-${order._id}`}>Change Status:</label>
                                        <select
                                            id={`status-select-${order._id}`}
                                            value={order.orderStatus}
                                            onChange={(event) => statusHandler(event, order._id)}
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                ) : (
                                    <div className="mt-2">
                                        <strong>Status:</strong> <span className="text-danger">Cancelled</span>
                                    </div>
                                )}

                                <h6 className="mb-3">Delivery Address:</h6>
                                <p>
                                    {order.address
                                        ? `${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.country} - ${order.address.pincode}`
                                        : "No Address Provided"}
                                </p>
                                <h6 className="mb-3">Items Ordered:</h6>
                                <div className="order-items">
                                    {Array.isArray(order.items) && order.items.map((item, index) => (
                                        <div key={index} className="d-flex align-items-center mb-3">
                                            <img
                                                src={`${url}/uploads/` + item.image}
                                                alt={item.name}
                                                className="img-thumbnail me-3"
                                            />
                                            <div>
                                                <h6 className="mb-1">{item.name}</h6>
                                                <p className="mb-0 text-muted">Quantity: {item.quantity}</p>
                                                <p className="mb-0 text-muted">Price: ₹{item.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Toggle Button to expand/collapse card */}
                            <button className="toggle-button" onClick={() => toggleOrderDetails(order._id)}>
                                {expandedOrder === order._id ? <FaArrowUp /> : <FaArrowDown />}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
