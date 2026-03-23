import axios from 'axios';
import { useEffect, useState, useMemo } from 'react';
import './Orders.css';
import { FaChevronDown, FaChevronUp, FaShoppingBag, FaSearch, FaRupeeSign } from 'react-icons/fa';
import { MdLocationOn, MdPhone, MdClose, MdRefresh } from 'react-icons/md';

const URL = 'https://green-basket-grocery-project.onrender.com';

const STATUS_COLORS = {
    Processing: { bg: '#fff3e0', color: '#e65100' },
    Shipped:    { bg: '#e3f2fd', color: '#1565c0' },
    Delivered:  { bg: '#e8f5e9', color: '#2e7d32' },
    Cancelled:  { bg: '#ffebee', color: '#c62828' },
};

const STATUSES = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const SkeletonCard = () => (
    <div className="or-card">
        <div className="or-sk-row">
            <div className="or-sk-block or-sk-w30" />
            <div className="or-sk-block or-sk-w20" />
            <div className="or-sk-block or-sk-w15" />
        </div>
    </div>
);

const Orders = () => {
    const [orders, setOrders]           = useState([]);
    const [loading, setLoading]         = useState(true);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [search, setSearch]           = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [dateFilter, setDateFilter]   = useState('');
    const [payFilter, setPayFilter]     = useState('All');

    const fetchAllOrders = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${URL}/api/orders/fetchAllOrders`);
            setOrders(res.data.data || []);
        } catch (e) { console.error(e); }
        setLoading(false);
    };

    const statusHandler = async (e, orderId) => {
        const newStatus = e.target.value;
        await axios.post(`${URL}/api/orders/updateStatus`, {
            orderId, orderStatus: newStatus,
            cancelReason: newStatus === 'Cancelled' ? 'Cancelled by Admin' : '',
            cancelledBy:  newStatus === 'Cancelled' ? 'Admin' : '',
        });
        fetchAllOrders();
    };

    useEffect(() => { fetchAllOrders(); }, []);

    /* ── Stats ── */
    const stats = useMemo(() => ({
        total:      orders.length,
        processing: orders.filter(o => o.orderStatus === 'Processing').length,
        shipped:    orders.filter(o => o.orderStatus === 'Shipped').length,
        delivered:  orders.filter(o => o.orderStatus === 'Delivered').length,
        cancelled:  orders.filter(o => o.orderStatus === 'Cancelled').length,
        revenue:    orders.filter(o => o.payment).reduce((s, o) => s + o.amount, 0),
    }), [orders]);

    /* ── Filtered ── */
    const filtered = useMemo(() => {
        return orders.filter(o => {
            const name = `${o.address?.firstName} ${o.address?.lastName}`.toLowerCase();
            const id   = o._id.toLowerCase();
            const matchSearch = !search.trim() || name.includes(search.toLowerCase()) || id.includes(search.toLowerCase());
            const matchStatus = statusFilter === 'All' || o.orderStatus === statusFilter;
            const matchPay    = payFilter === 'All' || (payFilter === 'Paid' ? o.payment : !o.payment);
            const matchDate   = !dateFilter || new Date(o.date).toDateString() === new Date(dateFilter).toDateString();
            return matchSearch && matchStatus && matchPay && matchDate;
        });
    }, [orders, search, statusFilter, payFilter, dateFilter]);

    const clearFilters = () => { setSearch(''); setStatusFilter('All'); setPayFilter('All'); setDateFilter(''); };
    const hasFilters = search || statusFilter !== 'All' || payFilter !== 'All' || dateFilter;

    return (
        <div className="or-page">

            {/* Header */}
            <div className="or-header">
                <div>
                    <h1 className="or-title"><FaShoppingBag size={18} /> Orders</h1>
                    <p className="or-sub">{filtered.length} of {orders.length} orders</p>
                </div>
                <button className="or-refresh" onClick={fetchAllOrders} title="Refresh">
                    <MdRefresh size={18} />
                </button>
            </div>

            {/* Stats Bar */}
            <div className="or-stats">
                {[
                    { label: 'Total',      value: stats.total,      color: '#1a4d2e', bg: '#e8f5e9' },
                    { label: 'Processing', value: stats.processing,  color: '#e65100', bg: '#fff3e0' },
                    { label: 'Shipped',    value: stats.shipped,     color: '#1565c0', bg: '#e3f2fd' },
                    { label: 'Delivered',  value: stats.delivered,   color: '#2e7d32', bg: '#e8f5e9' },
                    { label: 'Cancelled',  value: stats.cancelled,   color: '#c62828', bg: '#ffebee' },
                    { label: 'Revenue',    value: `₹${stats.revenue.toLocaleString('en-IN')}`, color: '#6a1b9a', bg: '#f3e5f5', icon: <FaRupeeSign size={10} /> },
                ].map((s, i) => (
                    <div key={i} className="or-stat-card" style={{ background: s.bg }}>
                        <span className="or-stat-val" style={{ color: s.color }}>{s.value}</span>
                        <span className="or-stat-label">{s.label}</span>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="or-filters">
                {/* Search */}
                <div className="or-search">
                    <FaSearch size={12} className="or-search-icon" />
                    <input
                        className="or-search-input"
                        placeholder="Search by name or order ID..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    {search && <button className="or-search-clear" onClick={() => setSearch('')}><MdClose size={14} /></button>}
                </div>

                {/* Status chips */}
                <div className="or-status-chips">
                    {STATUSES.map(s => (
                        <button key={s} className={`or-chip ${statusFilter === s ? 'or-chip-active' : ''}`} onClick={() => setStatusFilter(s)}>
                            {s}
                        </button>
                    ))}
                </div>

                {/* Payment + Date */}
                <div className="or-filter-row">
                    <select className="or-select" value={payFilter} onChange={e => setPayFilter(e.target.value)}>
                        <option value="All">All Payments</option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                    </select>
                    <input type="date" className="or-date-input" value={dateFilter} onChange={e => setDateFilter(e.target.value)} />
                    {hasFilters && (
                        <button className="or-clear-btn" onClick={clearFilters}>
                            <MdClose size={13} /> Clear
                        </button>
                    )}
                </div>
            </div>

            {/* Orders List */}
            <div className="or-list">
                {loading
                    ? Array(5).fill(0).map((_, i) => <SkeletonCard key={i} />)
                    : filtered.map(order => {
                        const sc = STATUS_COLORS[order.orderStatus] || STATUS_COLORS.Processing;
                        const isExpanded = expandedOrder === order._id;
                        return (
                            <div key={order._id} className="or-card">
                                {/* Top row */}
                                <div className="or-card-top">

                                    {/* Left — ID + customer */}
                                    <div className="or-card-left">
                                        <span className="or-id">#{order._id.slice(-8).toUpperCase()}</span>
                                        <span className="or-cname">{order.address?.firstName} {order.address?.lastName}</span>
                                        <span className="or-cmeta"><MdPhone size={11} /> {order.address?.phone}</span>
                                    </div>

                                    {/* Mid — amount + method */}
                                    <div className="or-card-mid">
                                        <span className="or-amount">₹{order.amount}</span>
                                        <span className={`or-pay-badge ${order.payment ? 'or-paid' : 'or-unpaid'}`}>
                                            {order.payment ? 'Paid' : 'Pending'}
                                        </span>
                                        <span className="or-pay-method">{order.paymentMethod}</span>
                                    </div>

                                    {/* Date */}
                                    <div className="or-card-date">
                                        {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
                                    </div>

                                    {/* Right — status + select */}
                                    <div className="or-card-right">
                                        <span className="or-status-badge" style={{ background: sc.bg, color: sc.color }}>
                                            {order.orderStatus}
                                        </span>
                                        {order.orderStatus !== 'Cancelled' ? (
                                            <select className="or-status-select" value={order.orderStatus} onChange={e => statusHandler(e, order._id)}>
                                                <option value="Processing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        ) : (
                                            <span className="or-cancelled-by">By: {order.cancelledBy}</span>
                                        )}
                                    </div>

                                    {/* Expand toggle */}
                                    <button className="or-toggle" onClick={() => setExpandedOrder(isExpanded ? null : order._id)}>
                                        {isExpanded ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                                    </button>
                                </div>

                                {/* Expanded body */}
                                {isExpanded && (
                                    <div className="or-card-body">
                                        <div className="or-body-grid">
                                            {/* Address */}
                                            <div className="or-address">
                                                <span className="or-section-label"><MdLocationOn size={13} /> Delivery Address</span>
                                                <p>{order.address?.street}, {order.address?.city}, {order.address?.state}, {order.address?.country} — {order.address?.pincode}</p>
                                            </div>

                                            {/* Cancel reason */}
                                            {order.orderStatus === 'Cancelled' && order.cancelReason && (
                                                <div className="or-cancel-reason">
                                                    ⚠️ <strong>Reason:</strong> {order.cancelReason}
                                                </div>
                                            )}
                                        </div>

                                        {/* Items */}
                                        <div className="or-section-label" style={{ marginBottom: 10 }}>
                                            Items Ordered ({order.items?.length})
                                        </div>
                                        <div className="or-items">
                                            {order.items?.map((item, i) => (
                                                <div key={i} className="or-item">
                                                    <img src={`${URL}/uploads/${item.image}`} alt={item.name} className="or-item-img" />
                                                    <div className="or-item-info">
                                                        <span className="or-item-name">{item.name}</span>
                                                        <span className="or-item-meta">Qty: {item.quantity} · ₹{item.price} each</span>
                                                    </div>
                                                    <span className="or-item-total">₹{item.price * item.quantity}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })
                }
                {!loading && filtered.length === 0 && (
                    <div className="or-empty">
                        <span>📦</span>
                        <p>No orders found</p>
                        {hasFilters && <button className="or-clear-btn" onClick={clearFilters}><MdClose size={13} /> Clear Filters</button>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
