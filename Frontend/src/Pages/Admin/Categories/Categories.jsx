import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaPlus, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import './Categories.css';

const URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [emoji, setEmoji] = useState('🛒');
    const [loading, setLoading] = useState(false);

    const fetchCategories = async () => {
        const res = await axios.get(`${URL}/api/categories/all`);
        if (res.data.success) setCategories(res.data.data);
    };

    useEffect(() => { fetchCategories(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return toast.error('Category name is required');
        setLoading(true);
        const res = await axios.post(`${URL}/api/categories/create`, { name, emoji });
        if (res.data.success) { toast.success('Category created!'); setName(''); setEmoji('🛒'); fetchCategories(); }
        else toast.error(res.data.message);
        setLoading(false);
    };

    const handleToggle = async (id) => {
        await axios.post(`${URL}/api/categories/toggle`, { id });
        fetchCategories();
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this category?')) return;
        await axios.post(`${URL}/api/categories/delete`, { id });
        toast.info('Deleted');
        fetchCategories();
    };

    return (
        <div className="cat-page">
            <h2 className="cat-title"><MdCategory size={20} /> Category Management</h2>

            <form className="cat-form" onSubmit={handleSubmit}>
                <h4>Add New Category</h4>
                <div className="cat-form-row">
                    <div className="cat-field">
                        <label>Emoji</label>
                        <input value={emoji} onChange={e => setEmoji(e.target.value)} placeholder="🛒" maxLength={4} />
                    </div>
                    <div className="cat-field cat-field-grow">
                        <label>Category Name *</label>
                        <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Dairy, Bakery, Frozen" required />
                    </div>
                    <button type="submit" className="cat-btn" disabled={loading}>
                        <FaPlus size={13} /> {loading ? 'Adding...' : 'Add'}
                    </button>
                </div>
            </form>

            <div className="cat-grid">
                {categories.map(cat => (
                    <div key={cat._id} className={`cat-card ${!cat.isActive ? 'cat-inactive' : ''}`}>
                        <span className="cat-emoji">{cat.emoji}</span>
                        <span className="cat-name">{cat.name}</span>
                        <div className="cat-actions">
                            <button className="cat-toggle" onClick={() => handleToggle(cat._id)}>
                                {cat.isActive ? <FaToggleOn size={20} color="#059212" /> : <FaToggleOff size={20} color="#aaa" />}
                            </button>
                            <button className="cat-del" onClick={() => handleDelete(cat._id)}><FaTrash size={12} /></button>
                        </div>
                    </div>
                ))}
                {categories.length === 0 && <p className="cat-empty">No categories yet. Add one above!</p>}
            </div>
        </div>
    );
};

export default Categories;
