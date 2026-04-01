import { useState } from 'react';
import axios from 'axios';
import { FaDownload, FaSearch, FaRupeeSign } from 'react-icons/fa';
import { MdBarChart } from 'react-icons/md';
import './SalesReport.css';

const URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const SalesReport = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const fetchReport = async () => {
        setLoading(true);
        const res = await axios.get(`${URL}/api/orders/salesReport`, { params: { from, to } });
        if (res.data.success) { setOrders(res.data.data); setSearched(true); }
        setLoading(false);
    };

    const totalRevenue = orders.reduce((s, o) => s + o.amount, 0);
    const totalOrders = orders.length;
    const avgOrder = totalOrders ? Math.round(totalRevenue / totalOrders) : 0;

    const exportCSV = () => {
        const headers = ['Order ID', 'Customer', 'Amount', 'Payment Method', 'Status', 'Date'];
        const rows = orders.map(o => [
            o._id,
            `${o.address?.firstName} ${o.address?.lastName}`,
            o.amount,
            o.paymentMethod,
            o.orderStatus,
            new Date(o.date).toLocaleDateString('en-IN')
        ]);
        const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `sales_report_${from || 'all'}_${to || 'all'}.csv`;
        a.click();
    };

    const exportInvoice = (order) => {
        const subtotal = order.items?.reduce((s, i) => s + i.price * i.quantity, 0) || 0;
        const deliveryFee = order.amount - subtotal;
        const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f7fbf7; color: #333; }
    .invoice { max-width: 720px; margin: 30px auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.10); }
    .inv-header { background: linear-gradient(135deg, #1a4d2e, #059212); padding: 32px 40px; display: flex; justify-content: space-between; align-items: center; }
    .inv-brand { color: #fff; }
    .inv-brand h1 { font-size: 1.8rem; font-weight: 900; letter-spacing: -0.5px; }
    .inv-brand p { font-size: 0.82rem; color: rgba(255,255,255,0.75); margin-top: 4px; }
    .inv-badge { background: rgba(255,255,255,0.15); border: 1.5px solid rgba(255,255,255,0.3); border-radius: 12px; padding: 12px 20px; text-align: right; color: #fff; }
    .inv-badge .inv-num { font-size: 1rem; font-weight: 800; }
    .inv-badge .inv-date { font-size: 0.78rem; color: rgba(255,255,255,0.75); margin-top: 4px; }
    .inv-body { padding: 32px 40px; }
    .inv-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 28px; }
    .inv-meta-box { background: #f7fbf7; border-radius: 12px; padding: 16px 18px; border: 1px solid #e8f5e9; }
    .inv-meta-box h4 { font-size: 0.7rem; font-weight: 700; color: #059212; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px; }
    .inv-meta-box p { font-size: 0.85rem; color: #444; line-height: 1.7; }
    .inv-meta-box strong { color: #1a1a1a; }
    .inv-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .inv-table thead tr { background: #1a4d2e; }
    .inv-table th { padding: 12px 14px; font-size: 0.75rem; font-weight: 700; color: #fff; text-align: left; text-transform: uppercase; letter-spacing: 0.05em; }
    .inv-table th:last-child { text-align: right; }
    .inv-table td { padding: 12px 14px; font-size: 0.85rem; border-bottom: 1px solid #f0f0f0; vertical-align: middle; }
    .inv-table td:last-child { text-align: right; font-weight: 700; color: #059212; }
    .inv-table tbody tr:nth-child(even) { background: #fafffe; }
    .inv-totals { margin-left: auto; width: 280px; }
    .inv-total-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 0.88rem; border-bottom: 1px solid #f0f0f0; }
    .inv-total-row span:first-child { color: #666; }
    .inv-total-row span:last-child { font-weight: 600; color: #333; }
    .inv-grand { display: flex; justify-content: space-between; padding: 14px 16px; background: linear-gradient(135deg, #1a4d2e, #059212); border-radius: 10px; margin-top: 8px; }
    .inv-grand span { color: #fff; font-weight: 800; font-size: 1rem; }
    .inv-pay-status { display: inline-block; padding: 4px 14px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; margin-top: 4px; }
    .inv-pay-status.paid { background: #e8f5e9; color: #2e7d32; }
    .inv-pay-status.pending { background: #fff3e0; color: #e65100; }
    .inv-footer { background: #f7fbf7; border-top: 1px solid #e8f5e9; padding: 20px 40px; text-align: center; }
    .inv-footer p { font-size: 0.78rem; color: #888; line-height: 1.7; }
    .inv-footer strong { color: #059212; }
    @media print {
        body { background: #fff; }
        .invoice { box-shadow: none; margin: 0; border-radius: 0; }
    }
</style>
</head><body>
<div class="invoice">
    <div class="inv-header">
        <div class="inv-brand">
            <h1>🌿 Green Basket</h1>
            <p>Fresh Groceries Delivered to Your Door</p>
        </div>
        <div class="inv-badge">
            <div class="inv-num">Invoice #${order._id.slice(-8).toUpperCase()}</div>
            <div class="inv-date">${new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
        </div>
    </div>
    <div class="inv-body">
        <div class="inv-meta">
            <div class="inv-meta-box">
                <h4>Bill To</h4>
                <p><strong>${order.address?.firstName} ${order.address?.lastName}</strong><br>
                ${order.address?.phone}<br>
                ${order.address?.email || ''}</p>
            </div>
            <div class="inv-meta-box">
                <h4>Delivery Address</h4>
                <p>${order.address?.street}<br>
                ${order.address?.city}, ${order.address?.state}<br>
                ${order.address?.country} — ${order.address?.pincode}</p>
            </div>
        </div>
        <table class="inv-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                ${order.items?.map((item, i) => `
                <tr>
                    <td style="color:#aaa">${i + 1}</td>
                    <td><strong>${item.name}</strong></td>
                    <td>${item.quantity}</td>
                    <td>₹${item.price}</td>
                    <td>₹${item.price * item.quantity}</td>
                </tr>`).join('')}
            </tbody>
        </table>
        <div class="inv-totals">
            <div class="inv-total-row"><span>Subtotal</span><span>₹${subtotal}</span></div>
            <div class="inv-total-row"><span>Delivery Fee</span><span>${deliveryFee <= 0 ? 'FREE' : '₹' + deliveryFee}</span></div>
            <div class="inv-total-row">
                <span>Payment</span>
                <span>${order.paymentMethod}<br>
                <span class="inv-pay-status ${order.payment ? 'paid' : 'pending'}">${order.payment ? '✓ PAID' : '⏳ PENDING'}</span></span>
            </div>
            <div class="inv-grand"><span>Grand Total</span><span>₹${order.amount}</span></div>
        </div>
    </div>
    <div class="inv-footer">
        <p>Thank you for shopping with <strong>Green Basket</strong>! 🌿<br>
        For support: <strong>greenbasket@gmail.com</strong> | +91 6266059961</p>
    </div>
</div>
</body></html>`;
        const w = window.open('', '_blank');
        w.document.write(html);
        w.document.close();
        setTimeout(() => w.print(), 500);
    };

    return (
        <div className="sr-page">
            <h2 className="sr-title"><MdBarChart size={22} /> Sales Report</h2>

            {/* Filters */}
            <div className="sr-filters">
                <div className="sr-field">
                    <label>From Date</label>
                    <input type="date" value={from} onChange={e => setFrom(e.target.value)} />
                </div>
                <div className="sr-field">
                    <label>To Date</label>
                    <input type="date" value={to} onChange={e => setTo(e.target.value)} />
                </div>
                <button className="sr-search-btn" onClick={fetchReport} disabled={loading}>
                    <FaSearch size={13} /> {loading ? 'Loading...' : 'Generate Report'}
                </button>
                {orders.length > 0 && (
                    <button className="sr-export-btn" onClick={exportCSV}>
                        <FaDownload size={13} /> Export CSV
                    </button>
                )}
            </div>

            {/* Stats */}
            {searched && (
                <div className="sr-stats">
                    <div className="sr-stat" style={{ background: '#e8f5e9' }}>
                        <span style={{ color: '#059212' }}>{totalOrders}</span>
                        <p>Total Orders</p>
                    </div>
                    <div className="sr-stat" style={{ background: '#f3e5f5' }}>
                        <span style={{ color: '#6a1b9a' }}>₹{totalRevenue.toLocaleString('en-IN')}</span>
                        <p>Total Revenue</p>
                    </div>
                    <div className="sr-stat" style={{ background: '#fff3e0' }}>
                        <span style={{ color: '#e65100' }}>₹{avgOrder}</span>
                        <p>Avg Order Value</p>
                    </div>
                </div>
            )}

            {/* Table */}
            {orders.length > 0 && (
                <div className="sr-table-wrap">
                    <table className="sr-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Amount</th>
                                <th>Method</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Invoice</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(o => (
                                <tr key={o._id}>
                                    <td className="sr-id">#{o._id.slice(-8).toUpperCase()}</td>
                                    <td>{o.address?.firstName} {o.address?.lastName}</td>
                                    <td><strong>₹{o.amount}</strong></td>
                                    <td>{o.paymentMethod}</td>
                                    <td><span className={`sr-status ${o.orderStatus.toLowerCase().replace(/ /g, '-')}`}>{o.orderStatus}</span></td>
                                    <td>{new Date(o.date).toLocaleDateString('en-IN')}</td>
                                    <td>
                                        <button className="sr-invoice-btn" onClick={() => exportInvoice(o)}>
                                            <FaDownload size={11} /> Invoice
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {searched && orders.length === 0 && (
                <div className="sr-empty"><FaRupeeSign size={32} color="#c8e6c9" /><p>No orders found for selected range</p></div>
            )}
        </div>
    );
};

export default SalesReport;
