import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import no_order_img from "../../../assets/Images/Images/order_no.png";
import { fetchOrders, cancelOrder } from "../../../Store/orderSlice";
import { FaChevronDown, FaChevronUp, FaBoxOpen, FaShoppingBag } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import "./MyOrders.css";

const STATUS_CONFIG = {
    "Pending":       { color: "#f59e0b", bg: "#fffbeb", border: "#fde68a" },
    "Processing":    { color: "#3b82f6", bg: "#eff6ff", border: "#bfdbfe" },
    "Out for Delivery": { color: "#8b5cf6", bg: "#f5f3ff", border: "#ddd6fe" },
    "Delivered":     { color: "#059212", bg: "#f0faf0", border: "#c8e6c9" },
    "Cancelled":     { color: "#e53935", bg: "#fde8e8", border: "#ffcdd2" },
};

const OrderDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { orders } = useSelector((state) => state.order);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [cancelOrderId, setCancelOrderId] = useState(null);
    const [cancelReason, setCancelReason] = useState("");
    const role = localStorage.getItem("role");
    const url = "https://green-basket-grocery-project.onrender.com";

    useEffect(() => { dispatch(fetchOrders()); }, [dispatch]);

    const submitCancelReason = () => {
        if (!cancelReason.trim()) { alert("Please provide a cancellation reason."); return; }
        dispatch(cancelOrder({ orderId: cancelOrderId, cancelReason, cancelledBy: role }))
            .then(() => { setCancelOrderId(null); setCancelReason(""); })
            .catch((err) => console.error("Failed to cancel order:", err));
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "—";
        return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
    };

    return (
        <div className="mo-page">

            {/* Hero banner */}
            <div className="mo-banner">
                <p className="mo-breadcrumb">Home › My Orders</p>
                <h1 className="mo-banner-title">My Orders</h1>
                <p className="mo-banner-sub">Track and manage all your orders</p>
            </div>

            <div className="mo-container">
                {orders.length === 0 ? (
                    <div className="mo-empty">
                        <img src={no_order_img} alt="No Orders" className="mo-empty-img" />
                        <h3 className="mo-empty-title">No Orders Yet!</h3>
                        <p className="mo-empty-sub">Looks like you haven't placed any orders yet.</p>
                        <button className="mo-shop-btn" onClick={() => navigate("/")}>
                            <FaShoppingBag size={14} /> Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="mo-list">
                        {orders.map((order) => {
                            const status = order.orderStatus || "Pending";
                            const cfg = STATUS_CONFIG[status] || STATUS_CONFIG["Pending"];
                            const isExpanded = expandedOrder === order._id;
                            const isCancelled = status === "Cancelled";

                            return (
                                <div key={order._id} className={`mo-card${isCancelled ? " mo-card-cancelled" : ""}`}>

                                    {/* Card header */}
                                    <div className="mo-card-header">
                                        <div className="mo-card-left">
                                            <div className="mo-order-icon">
                                                <FaBoxOpen size={16} />
                                            </div>
                                            <div>
                                                <p className="mo-order-id">#{order._id.slice(-8).toUpperCase()}</p>
                                                <p className="mo-order-date">{formatDate(order.date)}</p>
                                            </div>
                                        </div>
                                        <div className="mo-card-right">
                                            <span className="mo-status-badge" style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}>
                                                {status}
                                            </span>
                                            <span className="mo-amount">₹{order.amount}</span>
                                        </div>
                                    </div>

                                    {/* Items preview */}
                                    <div className="mo-items-preview">
                                        {order.items.map((item, i) => (
                                            <span key={i} className="mo-item-chip">
                                                {item.name} × {item.quantity}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Toggle button */}
                                    <button className="mo-toggle-btn" onClick={() => setExpandedOrder(isExpanded ? null : order._id)}>
                                        {isExpanded ? <><FaChevronUp size={12} /> Hide Details</> : <><FaChevronDown size={12} /> View Details</>}
                                    </button>

                                    {/* Expanded details */}
                                    {isExpanded && (
                                        <div className="mo-expanded">
                                            <div className="mo-expanded-items">
                                                {order.items.map((item, i) => (
                                                    <div key={i} className="mo-exp-item">
                                                        <div className="mo-exp-img-wrap">
                                                            <img src={`${url}/uploads/${item.image}`} alt={item.name} className="mo-exp-img" />
                                                        </div>
                                                        <div className="mo-exp-info">
                                                            <p className="mo-exp-name">{item.name}</p>
                                                            <p className="mo-exp-meta">Qty: {item.quantity} · ₹{item.price} each</p>
                                                        </div>
                                                        <span className="mo-exp-total">₹{item.price * item.quantity}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mo-exp-footer">
                                                <div className="mo-exp-meta-row">
                                                    <span className="mo-exp-label">Payment</span>
                                                    <span className="mo-exp-val">{order.paymentMethod || "—"}</span>
                                                </div>
                                                <div className="mo-exp-meta-row">
                                                    <span className="mo-exp-label">Total</span>
                                                    <span className="mo-exp-val mo-exp-total-amt">₹{order.amount}</span>
                                                </div>
                                                {!isCancelled && (
                                                    <button className="mo-cancel-btn" onClick={() => setCancelOrderId(order._id)}>
                                                        <MdCancel size={14} /> Cancel Order
                                                    </button>
                                                )}
                                                {isCancelled && order.cancelReason && (
                                                    <p className="mo-cancel-reason">Reason: {order.cancelReason}</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Cancel modal */}
            {cancelOrderId && (
                <div className="mo-overlay" onClick={() => setCancelOrderId(null)}>
                    <div className="mo-modal" onClick={(e) => e.stopPropagation()}>
                        <h5 className="mo-modal-title">Cancel Order</h5>
                        <p className="mo-modal-sub">Please tell us why you want to cancel this order.</p>
                        <textarea
                            className="mo-modal-textarea"
                            rows={4}
                            placeholder="Enter cancellation reason..."
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                        />
                        <div className="mo-modal-actions">
                            <button className="mo-modal-close" onClick={() => setCancelOrderId(null)}>Go Back</button>
                            <button className="mo-modal-confirm" onClick={submitCancelReason}>Confirm Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderDetails;
