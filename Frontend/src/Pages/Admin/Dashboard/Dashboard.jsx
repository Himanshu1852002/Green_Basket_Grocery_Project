import { Bar } from 'react-chartjs-2';
import { useEffect } from 'react';
import './Dashboard.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserCount, fetchProductCount, fetchOrderCount, fetchOrdersData, fetchLowStock } from '../../../Store/adminDashSlice';
import { FaUsers, FaBoxOpen, FaShoppingBag, FaRupeeSign, FaCalendarDay, FaExclamationTriangle } from 'react-icons/fa';
import { MdTrendingUp } from 'react-icons/md';
import {
    Chart as ChartJS, CategoryScale, LinearScale,
    BarElement, Title, Tooltip, Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const STATUS_COLORS = {
    Processing:         { bg: '#fff3e0', color: '#e65100' },
    Shipped:            { bg: '#e3f2fd', color: '#1565c0' },
    'Out for Delivery': { bg: '#f3e5f5', color: '#6a1b9a' },
    Delivered:          { bg: '#e8f5e9', color: '#2e7d32' },
    Cancelled:          { bg: '#ffebee', color: '#c62828' },
};

const Dashboard = () => {
    const dispatch = useDispatch();
    const { userCount, productCount, orderCount, totalRevenue, todayOrders, recentOrders, monthlyData, lowStock, status } = useSelector(s => s.dashboard);

    useEffect(() => {
        dispatch(fetchUserCount());
        dispatch(fetchProductCount());
        dispatch(fetchOrderCount());
        dispatch(fetchOrdersData());
        dispatch(fetchLowStock());
    }, [dispatch]);

    const stats = [
        { label: 'Total Users',    value: userCount,                          icon: <FaUsers size={20} />,       color: '#059212', bg: '#e8f5e9' },
        { label: 'Total Products', value: productCount,                       icon: <FaBoxOpen size={20} />,     color: '#1565c0', bg: '#e3f2fd' },
        { label: 'Total Orders',   value: orderCount,                         icon: <FaShoppingBag size={20} />, color: '#e65100', bg: '#fff3e0' },
        { label: 'Total Revenue',  value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: <FaRupeeSign size={20} />,   color: '#6a1b9a', bg: '#f3e5f5' },
        { label: "Today's Orders", value: todayOrders,                        icon: <FaCalendarDay size={20} />, color: '#00838f', bg: '#e0f7fa' },
    ];

    const chartLabels = Object.keys(monthlyData);
    const chartData = {
        labels: chartLabels,
        datasets: [
            {
                label: 'Orders',
                data: chartLabels.map(k => monthlyData[k]?.orders || 0),
                backgroundColor: 'rgba(5,146,18,0.75)',
                borderRadius: 6,
                yAxisID: 'y',
            },
            {
                label: 'Revenue (₹)',
                data: chartLabels.map(k => monthlyData[k]?.revenue || 0),
                backgroundColor: 'rgba(106,27,154,0.55)',
                borderRadius: 6,
                yAxisID: 'y1',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: { legend: { position: 'top' } },
        scales: {
            y:  { type: 'linear', position: 'left',  grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { stepSize: 1 } },
            y1: { type: 'linear', position: 'right', grid: { drawOnChartArea: false }, ticks: { callback: v => `₹${v}` } },
            x:  { grid: { display: false } },
        },
    };

    return (
        <div className="db-page">

            {/* Header */}
            <div className="db-header">
                <div>
                    <h1 className="db-title">Dashboard</h1>
                    <p className="db-sub">Welcome back, Admin 👋</p>
                </div>
                <span className="db-date">
                    {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
            </div>

            {/* Stat Cards */}
            <div className="db-cards">
                {stats.map((s, i) => (
                    <div className="db-card" key={i}>
                        <div className="db-card-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
                        <div className="db-card-info">
                            <span className="db-card-label">{s.label}</span>
                            <span className="db-card-value">
                                {status === 'loading' ? <span className="db-sk-val" /> : s.value}
                            </span>
                        </div>
                        <MdTrendingUp size={16} style={{ color: s.color, opacity: 0.4, flexShrink: 0 }} />
                    </div>
                ))}
            </div>

            {/* Chart — full width */}
            <div className="db-chart-wrap">
                <div className="db-section-header">
                    <h3 className="db-section-title">Orders & Revenue</h3>
                    <span className="db-section-sub">Last 6 months</span>
                </div>
                <div className="db-chart">
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </div>

            {/* Low Stock — full width grid */}
            {lowStock.length > 0 && (
                <div className="db-lowstock-wrap">
                    <div className="db-section-header">
                        <h3 className="db-section-title">
                            <FaExclamationTriangle size={14} color="#e65100" /> Low Stock Alert
                        </h3>
                        <span className="db-section-sub">{lowStock.length} items need restocking</span>
                    </div>
                    <div className="db-lowstock-grid">
                        {lowStock.map((p, i) => (
                            <div key={i} className="db-ls-card">
                                <img src={`${URL}/uploads/${p.image}`} alt={p.name} className="db-ls-img" />
                                <div className="db-ls-info">
                                    <span className="db-ls-name">{p.name}</span>
                                    <span className="db-ls-cat">{p.category}</span>
                                </div>
                                <span className={`db-ls-qty ${p.quantity <= 3 ? 'db-ls-critical' : 'db-ls-warn'}`}>
                                    {p.quantity} left
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Recent Orders */}
            <div className="db-recent-wrap">
                <div className="db-section-header">
                    <h3 className="db-section-title">Recent Orders</h3>
                    <span className="db-section-sub">Latest 5</span>
                </div>
                <div className="db-recent-table-wrap">
                    <table className="db-recent-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Amount</th>
                                <th>Payment</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((o, i) => {
                                const sc = STATUS_COLORS[o.orderStatus] || STATUS_COLORS.Processing;
                                return (
                                    <tr key={i}>
                                        <td className="db-order-id">#{o._id.slice(-8).toUpperCase()}</td>
                                        <td>{o.address?.firstName} {o.address?.lastName}</td>
                                        <td className="db-order-amt">₹{o.amount}</td>
                                        <td>
                                            <span className={`db-pay-badge ${o.payment ? 'db-paid' : 'db-unpaid'}`}>
                                                {o.payment ? 'Paid' : 'Pending'}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="db-status-badge" style={{ background: sc.bg, color: sc.color }}>
                                                {o.orderStatus}
                                            </span>
                                        </td>
                                        <td className="db-order-date">
                                            {new Date(o.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
                                        </td>
                                    </tr>
                                );
                            })}
                            {recentOrders.length === 0 && (
                                <tr><td colSpan={6} className="db-empty">No orders yet</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
