import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import no_order_img from "../../../assets/Images/Images/order_no.png";
import { fetchOrders, cancelOrder } from "../../../Store/orderSlice";
import { FaChevronDown, FaChevronUp, FaBoxOpen, FaShoppingBag, FaMapMarkerAlt, FaFilter } from "react-icons/fa";
import { MdCancel, MdPayment } from "react-icons/md";
import { toast } from "react-toastify";
import "./MyOrders.css";

const STATUS_CONFIG = {
    "Pending":          { color: "#f59e0b", bg: "#fffbeb", border: "#fde68a", emoji: "⏳" },
    "Processing":       { color: "#3b82f6", bg: "#eff6ff", border: "#bfdbfe", emoji: "⚙️" },
    "Out for Delivery": { color: "#8b5cf6", bg: "#f5f3ff", border: "#ddd6fe", emoji: "🚚" },
    "Delivered":        { color: "#059212", bg: "#f0faf0", border: "#c8e6c9", emoji: "✅" },
    "Cancelled":        { color: "#e53935", bg: "#fde8e8", border: "#ffcdd2", emoji: "❌" },
};

const FILTERS = ["All", "Processing", "Out for Delivery", "Delivered", "Cancelled"];

const OrderDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { orders } = useSelector((state) => state.order);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [cancelOrderId, setCancelOrderId] = useState(null);
    const [cancelReason, setCancelReason] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const role = localStorage.getItem("role");
    const url = import.meta.env.VITE_API_BASE_URL || "https://green-basket-grocery-project.onrender.com";

    useEffect(() => { dispatch(fetchOrders()); }, [dispatch]);

    const submitCancelReason = () => {
        if (!cancelReason.trim()) { toast.error("Please provide a cancellation reason."); return; }
        dispatch(cancelOrder({ orderId: cancelOrderId, cancelReason, cancelledBy: role }))
            .then(() => {
                setCancelOrderId(null);
                setCancelReason("");
                toast.success("Order cancelled successfully.");
            })
            .catch(() => toast.error("Failed to cancel order."));
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "—";
        return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
    };

    const getEstimatedDelivery = (orderDate) => {
        if (!orderDate) return '—';
        const d = new Date(orderDate);
        d.setDate(d.getDate() + 3);
        return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const filteredOrders = activeFilter === "All"
        ? orders
        : orders.filter(o => o.orderStatus === activeFilter);

    // Summary counts
    const counts = {
        total: orders.length,
        delivered: orders.filter(o => o.orderStatus === "Delivered").length,
        processing: orders.filter(o => o.orderStatus === "Processing" || o.orderStatus === "Out for Delivery").length,
        cancelled: orders.filter(o => o.orderStatus === "Cancelled").length,
    };

    return (
        <div className="mo-page">

            {/* Banner */}
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
                        <p className="mo-empty-sub">Looks like you haven&apos;t placed any orders yet.</p>
                        <button className="mo-shop-btn" onClick={() => navigate("/")}>
                            <FaShoppingBag size={14} /> Start Shopping
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Summary Stats */}
                        <div className="mo-stats">
                            <div className="mo-stat-card mo-stat-total">
                                <span className="mo-stat-val">{counts.total}</span>
                                <span className="mo-stat-label">Total Orders</span>
                            </div>
                            <div className="mo-stat-card mo-stat-delivered">
                                <span className="mo-stat-val">{counts.delivered}</span>
                                <span className="mo-stat-label">Delivered</span>
                            </div>
                            <div className="mo-stat-card mo-stat-active">
                                <span className="mo-stat-val">{counts.processing}</span>
                                <span className="mo-stat-label">In Progress</span>
                            </div>
                            <div className="mo-stat-card mo-stat-cancelled">
                                <span className="mo-stat-val">{counts.cancelled}</span>
                                <span className="mo-stat-label">Cancelled</span>
                            </div>
                        </div>

                        {/* Filter chips */}
                        <div className="mo-filters">
                            <FaFilter size={12} color="#888" />
                            {FILTERS.map(f => (
                                <button
                                    key={f}
                                    className={`mo-filter-chip${activeFilter === f ? ' mo-filter-active' : ''}`}
                                    onClick={() => setActiveFilter(f)}
                                >
                                    {f} {f !== "All" && <span className="mo-filter-count">{orders.filter(o => o.orderStatus === f).length}</span>}
                                </button>
                            ))}
                        </div>

                        {/* Orders list */}
                        {filteredOrders.length === 0 ? (
                            <div className="mo-no-filter">No orders with status &quot;{activeFilter}&quot;</div>
                        ) : (
                            <div className="mo-list">
                                {filteredOrders.map((order) => {
                                    const status = order.orderStatus || "Pending";
                                    const cfg = STATUS_CONFIG[status] || STATUS_CONFIG["Pending"];
                                    const isExpanded = expandedOrder === order._id;
                                    const isCancelled = status === "Cancelled";
                                    const isDelivered = status === "Delivered";
                                    const canCancel = !isCancelled && !isDelivered;
                                    const addr = order.address;

                                    return (
                                        <div key={order._id} className={`mo-card${isCancelled ? " mo-card-cancelled" : ""}`}>

                                            {/* Header */}
                                            <div className="mo-card-header">
                                                <div className="mo-card-left">
                                                    <div className="mo-order-icon">
                                                        <span className="mo-status-emoji">{cfg.emoji}</span>
                                                    </div>
                                                    <div>
                                                        <p className="mo-order-id">#{order._id.slice(-8).toUpperCase()}</p>
                                                        <p className="mo-order-date">{formatDate(order.date)} · {order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
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
                                                    <span key={i} className="mo-item-chip">{item.name} × {item.quantity}</span>
                                                ))}
                                            </div>

                                            {/* Payment + Toggle row */}
                                            <div className="mo-card-footer-row">
                                                <span className={`mo-pay-badge ${order.payment ? 'mo-paid' : 'mo-unpaid'}`}>
                                                    <MdPayment size={12} /> {order.payment ? 'Paid' : 'Unpaid'} · {order.paymentMethod || '—'}
                                                </span>
                                                <button className="mo-toggle-btn" onClick={() => setExpandedOrder(isExpanded ? null : order._id)}>
                                                    {isExpanded ? <><FaChevronUp size={11} /> Hide</> : <><FaChevronDown size={11} /> Details</>}
                                                </button>
                                            </div>

                                            {/* Expanded */}
                                            {isExpanded && (
                                                <div className="mo-expanded">

                                                    {/* Tracking */}
                                                    {!isCancelled && (
                                                        <div className="mo-tracking">
                                                            {['Processing', 'Out for Delivery', 'Delivered'].map((step, i) => {
                                                                const steps = ['Processing', 'Out for Delivery', 'Delivered'];
                                                                const currentIdx = steps.indexOf(status);
                                                                const isDone = i <= currentIdx;
                                                                const isActive = i === currentIdx;
                                                                return (
                                                                    <div key={step} className="mo-track-step">
                                                                        <div className={`mo-track-circle${isDone ? ' mo-track-done' : ''}${isActive ? ' mo-track-active' : ''}`}>
                                                                            {isDone ? '✓' : i + 1}
                                                                        </div>
                                                                        <span className={`mo-track-label${isActive ? ' mo-track-label-active' : ''}`}>{step}</span>
                                                                        {i < 2 && <div className={`mo-track-line${i < currentIdx ? ' mo-track-line-done' : ''}`} />}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    )}

                                                    {/* Estimated Delivery */}
                                                    {!isCancelled && !isDelivered && (
                                                        <div className="mo-est-delivery">
                                                            📦 Estimated Delivery: <strong>{getEstimatedDelivery(order.date)}</strong>
                                                        </div>
                                                    )}

                                                    {/* Items */}
                                                    <div className="mo-expanded-items">
                                                        {order.items.map((item, i) => (
                                                            <div key={i} className="mo-exp-item">
                                                                <div className="mo-exp-img-wrap">
                                                                    <img src={item.image?.startsWith('http') ? item.image : `${url}/uploads/${item.image}`} alt={item.name} className="mo-exp-img" />
                                                                </div>
                                                                <div className="mo-exp-info">
                                                                    <p className="mo-exp-name">{item.name}</p>
                                                                    <p className="mo-exp-meta">Qty: {item.quantity} · ₹{item.price} each</p>
                                                                </div>
                                                                <span className="mo-exp-total">₹{item.price * item.quantity}</span>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Footer info */}
                                                    <div className="mo-exp-footer">

                                                        {/* Delivery Address */}
                                                        {addr && (
                                                            <div className="mo-address-box">
                                                                <p className="mo-address-title"><FaMapMarkerAlt size={11} /> Delivery Address</p>
                                                                <p className="mo-address-text">
                                                                    {addr.firstName} {addr.lastName}, {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
                                                                    {addr.phone && ` · 📞 ${addr.phone}`}
                                                                </p>
                                                            </div>
                                                        )}

                                                        <div className="mo-exp-meta-row">
                                                            <span className="mo-exp-label">Payment Method</span>
                                                            <span className="mo-exp-val">{order.paymentMethod || "—"}</span>
                                                        </div>
                                                        <div className="mo-exp-meta-row">
                                                            <span className="mo-exp-label">Payment Status</span>
                                                            <span className={`mo-exp-val ${order.payment ? 'mo-exp-paid' : 'mo-exp-unpaid'}`}>
                                                                {order.payment ? '✓ Paid' : '✗ Unpaid'}
                                                            </span>
                                                        </div>
                                                        <div className="mo-exp-meta-row mo-total-row">
                                                            <span className="mo-exp-label">Order Total</span>
                                                            <span className="mo-exp-val mo-exp-total-amt">₹{order.amount}</span>
                                                        </div>

                                                        {canCancel && (
                                                            <button className="mo-cancel-btn" onClick={() => setCancelOrderId(order._id)}>
                                                                <MdCancel size={14} /> Cancel Order
                                                            </button>
                                                        )}
                                                        {isCancelled && order.cancelReason && order.cancelReason !== "Not cancelled" && (
                                                            <div className="mo-cancel-reason-box">
                                                                <span>❌ Cancelled</span>
                                                                <p>Reason: {order.cancelReason}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Cancel modal */}
            {cancelOrderId && (
                <div className="mo-overlay" onClick={() => setCancelOrderId(null)}>
                    <div className="mo-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="mo-modal-icon">🗑️</div>
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
