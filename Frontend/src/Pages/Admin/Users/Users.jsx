import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Users.css';
import { FaUsers, FaSearch, FaUserCheck, FaUserSlash, FaUserShield } from 'react-icons/fa';
import { MdClose, MdRefresh, MdBlock } from 'react-icons/md';

const URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const SkeletonRow = () => (
    <tr className="um-sk-row">
        {Array(5).fill(0).map((_, i) => <td key={i}><div className="um-sk-line" /></td>)}
    </tr>
);

const Users = () => {
    const [users, setUsers]       = useState([]);
    const [loading, setLoading]   = useState(true);
    const [search, setSearch]     = useState('');
    const [filter, setFilter]     = useState('All'); // All | Active | Blocked
    const [confirmUser, setConfirmUser] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${URL}/api/user/allUsers`);
            if (res.data.success) setUsers(res.data.data);
            else toast.error(res.data.message || 'Failed to fetch users');
        } catch (err) {
            console.error('Users fetch error:', err);
            toast.error(err.response?.data?.message || `Error: ${err.message}`);
        }
        setLoading(false);
    };

    useEffect(() => { fetchUsers(); }, []);

    const handleBlockToggle = async () => {
        if (!confirmUser) return;
        try {
            const res = await axios.patch(`${URL}/api/user/block/${confirmUser._id}`);
            if (res.data.success) {
                toast.success(res.data.message);
                setUsers(prev => prev.map(u => u._id === confirmUser._id ? { ...u, isBlocked: res.data.isBlocked } : u));
            }
        } catch { toast.error('Error updating user'); }
        setConfirmUser(null);
    };

    const stats = useMemo(() => ({
        total:   users.length,
        active:  users.filter(u => !u.isBlocked).length,
        blocked: users.filter(u => u.isBlocked).length,
    }), [users]);

    const filtered = useMemo(() => {
        return users.filter(u => {
            const matchSearch = !search.trim() ||
                u.name.toLowerCase().includes(search.toLowerCase()) ||
                u.email.toLowerCase().includes(search.toLowerCase());
            const matchFilter = filter === 'All' || (filter === 'Active' ? !u.isBlocked : u.isBlocked);
            return matchSearch && matchFilter;
        });
    }, [users, search, filter]);

    const getInitials = (name) => name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?';

    const avatarColors = ['#059212', '#1565c0', '#6a1b9a', '#e65100', '#00838f', '#c62828'];
    const getColor = (name) => avatarColors[name?.charCodeAt(0) % avatarColors.length] || '#059212';

    return (
        <div className="um-page">

            {/* Header */}
            <div className="um-header">
                <div>
                    <h1 className="um-title"><FaUsers size={18} /> User Management</h1>
                    <p className="um-sub">{filtered.length} of {users.length} users</p>
                </div>
                <button className="um-refresh" onClick={fetchUsers} title="Refresh">
                    <MdRefresh size={18} />
                </button>
            </div>

            {/* Stats */}
            <div className="um-stats">
                <div className="um-stat-card" style={{ background: '#e8f5e9' }}>
                    <FaUsers size={20} color="#059212" />
                    <div>
                        <span className="um-stat-val" style={{ color: '#059212' }}>{stats.total}</span>
                        <span className="um-stat-label">Total Users</span>
                    </div>
                </div>
                <div className="um-stat-card" style={{ background: '#e3f2fd' }}>
                    <FaUserCheck size={20} color="#1565c0" />
                    <div>
                        <span className="um-stat-val" style={{ color: '#1565c0' }}>{stats.active}</span>
                        <span className="um-stat-label">Active</span>
                    </div>
                </div>
                <div className="um-stat-card" style={{ background: '#ffebee' }}>
                    <FaUserSlash size={20} color="#c62828" />
                    <div>
                        <span className="um-stat-val" style={{ color: '#c62828' }}>{stats.blocked}</span>
                        <span className="um-stat-label">Blocked</span>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="um-filters">
                <div className="um-search">
                    <FaSearch size={12} className="um-search-icon" />
                    <input
                        className="um-search-input"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    {search && <button className="um-search-clear" onClick={() => setSearch('')}><MdClose size={14} /></button>}
                </div>
                <div className="um-chips">
                    {['All', 'Active', 'Blocked'].map(f => (
                        <button key={f} className={`um-chip ${filter === f ? 'um-chip-active' : ''}`} onClick={() => setFilter(f)}>
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="um-table-wrap">
                <table className="um-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Joined</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading
                            ? Array(6).fill(0).map((_, i) => <SkeletonRow key={i} />)
                            : filtered.map((user, i) => (
                                <tr key={user._id} className={user.isBlocked ? 'um-row-blocked' : ''}>
                                    <td className="um-num">{i + 1}</td>
                                    <td>
                                        <div className="um-user-cell">
                                            <div className="um-avatar" style={{ background: getColor(user.name) }}>
                                                {getInitials(user.name)}
                                            </div>
                                            <div className="um-user-info">
                                                <span className="um-name">{user.name}</span>
                                                <span className="um-role-badge">
                                                    <FaUserShield size={9} /> User
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="um-email">{user.email}</td>
                                    <td className="um-date">
                                        {user.createdAt
                                            ? new Date(user.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })
                                            : '—'}
                                    </td>
                                    <td>
                                        <span className={`um-status ${user.isBlocked ? 'um-blocked' : 'um-active'}`}>
                                            {user.isBlocked ? 'Blocked' : 'Active'}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className={`um-block-btn ${user.isBlocked ? 'um-unblock' : 'um-block'}`}
                                            onClick={() => setConfirmUser(user)}
                                        >
                                            <MdBlock size={14} />
                                            {user.isBlocked ? 'Unblock' : 'Block'}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {!loading && filtered.length === 0 && (
                    <div className="um-empty">
                        <span>👤</span>
                        <p>No users found</p>
                    </div>
                )}
            </div>

            {/* Confirm Modal */}
            {confirmUser && (
                <div className="um-overlay" onClick={() => setConfirmUser(null)}>
                    <div className="um-modal" onClick={e => e.stopPropagation()}>
                        <div className="um-modal-avatar" style={{ background: getColor(confirmUser.name) }}>
                            {getInitials(confirmUser.name)}
                        </div>
                        <h3 className="um-modal-title">
                            {confirmUser.isBlocked ? 'Unblock User?' : 'Block User?'}
                        </h3>
                        <p className="um-modal-name">{confirmUser.name}</p>
                        <p className="um-modal-email">{confirmUser.email}</p>
                        <p className="um-modal-sub">
                            {confirmUser.isBlocked
                                ? 'This user will be able to login again.'
                                : 'This user will not be able to login.'}
                        </p>
                        <div className="um-modal-btns">
                            <button
                                className={`um-modal-confirm ${confirmUser.isBlocked ? 'um-modal-unblock' : 'um-modal-block'}`}
                                onClick={handleBlockToggle}
                            >
                                {confirmUser.isBlocked ? 'Yes, Unblock' : 'Yes, Block'}
                            </button>
                            <button className="um-modal-cancel" onClick={() => setConfirmUser(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;
