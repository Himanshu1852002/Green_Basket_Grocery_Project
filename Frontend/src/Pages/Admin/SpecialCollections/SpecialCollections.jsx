import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaPlus, FaTrash, FaEdit, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import './SpecialCollections.css';

const URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const EMPTY_FORM = { title: '', subtitle: '', tag: '', bgColor: '#fff8e1', accentColor: '#f59e0b', productIds: [] };

const SpecialCollections = () => {
    const [collections, setCollections] = useState([]);
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState(EMPTY_FORM);
    const [editId, setEditId] = useState(null);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchCollections = async () => {
        const res = await axios.get(`${URL}/api/special-collections/all`);
        if (res.data.success) setCollections(res.data.data);
    };

    const fetchProducts = async () => {
        const res = await axios.get(`${URL}/api/product/list`);
        if (res.data.success) setProducts(res.data.data);
    };

    useEffect(() => { fetchCollections(); fetchProducts(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title) return toast.error('Title is required');
        setLoading(true);
        try {
            if (editId) {
                await axios.post(`${URL}/api/special-collections/update`, { id: editId, ...form });
                toast.success('Collection updated!');
            } else {
                await axios.post(`${URL}/api/special-collections/create`, form);
                toast.success('Collection created!');
            }
            setForm(EMPTY_FORM);
            setEditId(null);
            fetchCollections();
        } catch { toast.error('Something went wrong'); }
        setLoading(false);
    };

    const handleEdit = (col) => {
        setEditId(col._id);
        setForm({ title: col.title, subtitle: col.subtitle, tag: col.tag, bgColor: col.bgColor, accentColor: col.accentColor, productIds: col.productIds });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this collection?')) return;
        await axios.post(`${URL}/api/special-collections/delete`, { id });
        toast.info('Deleted');
        fetchCollections();
    };

    const handleToggle = async (col) => {
        await axios.post(`${URL}/api/special-collections/update`, { ...col, id: col._id, isActive: !col.isActive });
        fetchCollections();
    };

    const toggleProduct = (id) => {
        setForm(prev => ({
            ...prev,
            productIds: prev.productIds.includes(id)
                ? prev.productIds.filter(p => p !== id)
                : [...prev.productIds, id]
        }));
    };

    const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="sc-page">
            <h2 className="sc-title">🌟 Special Collections</h2>

            {/* Form */}
            <form className="sc-form" onSubmit={handleSubmit}>
                <h4>{editId ? 'Edit Collection' : 'Create New Collection'}</h4>
                <div className="sc-form-row">
                    <input className="sc-input" placeholder="Title (e.g. Summer Special ☀️)" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required />
                    <input className="sc-input" placeholder="Tag (e.g. Limited Edition)" value={form.tag} onChange={e => setForm(p => ({ ...p, tag: e.target.value }))} />
                </div>
                <input className="sc-input" placeholder="Subtitle (e.g. Beat the heat with our cool picks)" value={form.subtitle} onChange={e => setForm(p => ({ ...p, subtitle: e.target.value }))} />
                <div className="sc-form-row">
                    <label className="sc-color-label">Background Color
                        <input type="color" value={form.bgColor} onChange={e => setForm(p => ({ ...p, bgColor: e.target.value }))} />
                    </label>
                    <label className="sc-color-label">Accent Color
                        <input type="color" value={form.accentColor} onChange={e => setForm(p => ({ ...p, accentColor: e.target.value }))} />
                    </label>
                    <div className="sc-preview" style={{ background: form.bgColor, borderColor: form.accentColor }}>
                        <span style={{ color: form.accentColor }}>{form.title || 'Preview'}</span>
                    </div>
                </div>

                {/* Product selector */}
                <div className="sc-product-section">
                    <p className="sc-product-label">Select Products ({form.productIds.length} selected)</p>
                    <input className="sc-input sc-search" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
                    <div className="sc-product-grid">
                        {filtered.map(p => (
                            <div key={p._id} className={`sc-product-item ${form.productIds.includes(p._id) ? 'sc-selected' : ''}`} onClick={() => toggleProduct(p._id)}>
                                <img src={`${URL}/uploads/${p.image}`} alt={p.name} />
                                <span>{p.name}</span>
                                {form.productIds.includes(p._id) && <div className="sc-check">✓</div>}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="sc-form-actions">
                    <button type="submit" className="sc-btn-primary" disabled={loading}>
                        <FaPlus size={13} /> {editId ? 'Update' : 'Create'} Collection
                    </button>
                    {editId && <button type="button" className="sc-btn-cancel" onClick={() => { setForm(EMPTY_FORM); setEditId(null); }}>Cancel</button>}
                </div>
            </form>

            {/* Collections List */}
            <div className="sc-list">
                {collections.map(col => (
                    <div key={col._id} className="sc-item" style={{ borderLeft: `4px solid ${col.accentColor}`, background: col.bgColor }}>
                        <div className="sc-item-info">
                            <span className="sc-item-tag" style={{ color: col.accentColor }}>{col.tag}</span>
                            <h5>{col.title}</h5>
                            <p>{col.subtitle}</p>
                            <span className="sc-item-count">{col.productIds.length} products</span>
                        </div>
                        <div className="sc-item-actions">
                            <button className="sc-icon-btn" onClick={() => handleToggle(col)} title={col.isActive ? 'Deactivate' : 'Activate'}>
                                {col.isActive ? <FaToggleOn size={22} color="#059212" /> : <FaToggleOff size={22} color="#aaa" />}
                            </button>
                            <button className="sc-icon-btn" onClick={() => handleEdit(col)}><FaEdit size={16} color="#1a4d2e" /></button>
                            <button className="sc-icon-btn" onClick={() => handleDelete(col._id)}><FaTrash size={15} color="#e53935" /></button>
                        </div>
                    </div>
                ))}
                {collections.length === 0 && <p className="sc-empty">No collections yet. Create one above!</p>}
            </div>
        </div>
    );
};

export default SpecialCollections;
