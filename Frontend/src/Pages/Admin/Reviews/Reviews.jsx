import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaStar, FaTrash, FaSearch } from 'react-icons/fa';
import { MdClose, MdRefresh, MdRateReview } from 'react-icons/md';
import './Reviews.css';

const URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const SkeletonRow = () => (
    <tr className="rv-sk-row">
        {Array(5).fill(0).map((_, i) => <td key={i}><div className="rv-sk-line" /></td>)}
    </tr>
);

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [ratingFilter, setRatingFilter] = useState(0); // 0 = All
    const [deleteId, setDeleteId] = useState(null);

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${URL}/api/reviews/all`);
            if (res.data.success) setReviews(res.data.reviews);
        } catch { toast.error('Failed to fetch reviews'); }
        setLoading(false);
    };

    useEffect(() => { fetchReviews(); }, []);

    const doDelete = async () => {
        try {
            const res = await axios.delete(`${URL}/api/reviews/${deleteId}`);
            if (res.data.success) {
                toast.success('Review deleted');
                setReviews(prev => prev.filter(r => r._id !== deleteId));
            }
        } catch { toast.error('Failed to delete review'); }
        setDeleteId(null);
    };

    const filtered = useMemo(() => reviews.filter(r => {
        const matchSearch = !search.trim() ||
            r.userName?.toLowerCase().includes(search.toLowerCase()) ||
            r.comment?.toLowerCase().includes(search.toLowerCase());
        const matchRating = ratingFilter === 0 || r.rating === ratingFilter;
        return matchSearch && matchRating;
    }), [reviews, search, ratingFilter]);

    const stats = useMemo(() => ({
        total: reviews.length,
        avg: reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : 0,
        five: reviews.filter(r => r.rating === 5).length,
        low: reviews.filter(r => r.rating <= 2).length,
    }), [reviews]);

    const StarRow = ({ rating }) => (
        <div className="rv-stars">
            {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} size={13} color={i < rating ? '#f59e0b' : '#e0e0e0'} />
            ))}
        </div>
    );

    return (
        <div className="rv-page">
            <div className="rv-header">
                <div>
                    <h1 className="rv-title"><MdRateReview size={20} /> Reviews</h1>
                    <p className="rv-sub">{filtered.length} of {reviews.length} reviews</p>
                </div>
                <button className="rv-refresh" onClick={fetchReviews}><MdRefresh size={18} /></button>
            </div>

            {/* Stats */}
            <div className="rv-stats">
                <div className="rv-stat" style={{ background: '#e8f5e9' }}>
                    <span className="rv-stat-val" style={{ color: '#059212' }}>{stats.total}</span>
                    <span className="rv-stat-label">Total Reviews</span>
                </div>
                <div className="rv-stat" style={{ background: '#fff8e1' }}>
                    <span className="rv-stat-val" style={{ color: '#f59e0b' }}>⭐ {stats.avg}</span>
                    <span className="rv-stat-label">Avg Rating</span>
                </div>
                <div className="rv-stat" style={{ background: '#e3f2fd' }}>
                    <span className="rv-stat-val" style={{ color: '#1565c0' }}>{stats.five}</span>
                    <span className="rv-stat-label">5-Star Reviews</span>
                </div>
                <div className="rv-stat" style={{ background: '#ffebee' }}>
                    <span className="rv-stat-val" style={{ color: '#c62828' }}>{stats.low}</span>
                    <span className="rv-stat-label">Low Ratings (≤2)</span>
                </div>
            </div>

            {/* Filters */}
            <div className="rv-filters">
                <div className="rv-search">
                    <FaSearch size={12} className="rv-search-icon" />
                    <input className="rv-search-input" placeholder="Search by user or comment..." value={search} onChange={e => setSearch(e.target.value)} />
                    {search && <button className="rv-search-clear" onClick={() => setSearch('')}><MdClose size={14} /></button>}
                </div>
                <div className="rv-chips">
                    {[0, 5, 4, 3, 2, 1].map(r => (
                        <button key={r} className={`rv-chip ${ratingFilter === r ? 'rv-chip-active' : ''}`} onClick={() => setRatingFilter(r)}>
                            {r === 0 ? 'All' : `${r} ★`}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="rv-table-wrap">
                <table className="rv-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Product</th>
                            <th>Rating</th>
                            <th>Comment</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading
                            ? Array(6).fill(0).map((_, i) => <SkeletonRow key={i} />)
                            : filtered.map((r, i) => (
                                <tr key={r._id} className={r.rating <= 2 ? 'rv-row-low' : ''}>
                                    <td className="rv-num">{i + 1}</td>
                                    <td>
                                        <div className="rv-user-cell">
                                            <div className="rv-avatar">{r.userName?.charAt(0).toUpperCase()}</div>
                                            <span className="rv-username">{r.userName}</span>
                                        </div>
                                    </td>
                                    <td className="rv-product">{r.productId}</td>
                                    <td><StarRow rating={r.rating} /></td>
                                    <td className="rv-comment">{r.comment || '—'}</td>
                                    <td className="rv-date">
                                        {new Date(r.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
                                    </td>
                                    <td>
                                        <button className="rv-del-btn" onClick={() => setDeleteId(r._id)} title="Delete">
                                            <FaTrash size={13} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {!loading && filtered.length === 0 && (
                    <div className="rv-empty"><span>⭐</span><p>No reviews found</p></div>
                )}
            </div>

            {/* Delete Modal */}
            {deleteId && (
                <div className="rv-overlay" onClick={() => setDeleteId(null)}>
                    <div className="rv-modal" onClick={e => e.stopPropagation()}>
                        <div className="rv-modal-icon">🗑️</div>
                        <h3 className="rv-modal-title">Delete Review?</h3>
                        <p className="rv-modal-sub">This action cannot be undone.</p>
                        <div className="rv-modal-btns">
                            <button className="rv-modal-yes" onClick={doDelete}>Yes, Delete</button>
                            <button className="rv-modal-no" onClick={() => setDeleteId(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reviews;
