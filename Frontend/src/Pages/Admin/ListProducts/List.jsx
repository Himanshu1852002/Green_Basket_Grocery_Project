import { useState, useEffect, useMemo } from 'react';
import './List.css';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import axios from 'axios';
import { MdDeleteForever, MdClose, MdInventory } from 'react-icons/md';
import { FaEdit, FaListAlt, FaSearch, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';

const CATEGORIES = ['', 'Fruits', 'Vegetables', 'Chocolates', 'Snacks', 'Coldrinks', 'Grocery'];

const List = ({ url }) => {
    const [list, setList]                     = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [search, setSearch]                 = useState('');
    const [editingProduct, setEditingProduct] = useState(null);
    const [updatedProduct, setUpdatedProduct] = useState({});
    const [newImage, setNewImage]             = useState(null);
    const [selectedIds, setSelectedIds]       = useState([]);
    const [deleteConfirm, setDeleteConfirm]   = useState(null); // single id or 'bulk'
    const [stockEdit, setStockEdit]           = useState({}); // { [id]: qty }
    const [loading, setLoading]               = useState(false);

    const fetchList = async () => {
        setLoading(true);
        const res = await axios.get(`${url}/api/product/list?category=${selectedCategory}`);
        if (res.data.success) setList(res.data.data);
        else toast.error('Error fetching products');
        setLoading(false);
    };

    useEffect(() => { fetchList(); }, [selectedCategory]);

    // filtered list
    const filtered = useMemo(() => {
        if (!search.trim()) return list;
        return list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }, [list, search]);

    /* ── Delete ── */
    const confirmDelete = (id) => setDeleteConfirm(id);

    const doDelete = async () => {
        if (deleteConfirm === 'bulk') {
            await Promise.all(selectedIds.map(id => axios.post(`${url}/api/product/remove`, { id })));
            toast.success(`${selectedIds.length} products deleted`);
            setSelectedIds([]);
        } else {
            await axios.post(`${url}/api/product/remove`, { id: deleteConfirm });
            toast.success('Product deleted');
        }
        setDeleteConfirm(null);
        fetchList();
    };

    /* ── Select ── */
    const toggleSelect = (id) =>
        setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

    const toggleSelectAll = () =>
        setSelectedIds(selectedIds.length === filtered.length ? [] : filtered.map(p => p._id));

    /* ── Stock quick update ── */
    const handleStockChange = (id, val) => setStockEdit(prev => ({ ...prev, [id]: val }));

    const saveStock = async (item) => {
        const qty = Number(stockEdit[item._id]);
        if (isNaN(qty) || qty < 0) return toast.error('Invalid quantity');
        const formData = new FormData();
        formData.append('id', item._id);
        formData.append('name', item.name);
        formData.append('price', item.price);
        formData.append('sellingPrice', item.sellingPrice);
        formData.append('category', item.category);
        formData.append('quantity', qty);
        const res = await axios.post(`${url}/api/product/update`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        if (res.data.success) { toast.success('Stock updated'); fetchList(); setStockEdit(prev => { const n = { ...prev }; delete n[item._id]; return n; }); }
        else toast.error('Error updating stock');
    };

    /* ── Out of stock toggle ── */
    const toggleOutOfStock = async (item) => {
        const newQty = item.quantity > 0 ? 0 : 10;
        const formData = new FormData();
        formData.append('id', item._id);
        formData.append('name', item.name);
        formData.append('price', item.price);
        formData.append('sellingPrice', item.sellingPrice);
        formData.append('category', item.category);
        formData.append('quantity', newQty);
        const res = await axios.post(`${url}/api/product/update`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        if (res.data.success) { toast.success(newQty === 0 ? 'Marked out of stock' : 'Marked in stock'); fetchList(); }
    };

    /* ── Edit ── */
    const startEditing = (product) => { setEditingProduct(product._id); setUpdatedProduct(product); setNewImage(null); };

    const updateProduct = async () => {
        const formData = new FormData();
        ['_id', 'name', 'price', 'sellingPrice', 'quantity', 'category'].forEach(k =>
            formData.append(k === '_id' ? 'id' : k, updatedProduct[k])
        );
        if (newImage) formData.append('image', newImage);
        try {
            const res = await axios.post(`${url}/api/product/update`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            if (res.data.success) { toast.success('Product updated!'); setEditingProduct(null); fetchList(); }
            else toast.error('Error updating product');
        } catch { toast.error('Error updating product'); }
    };

    const discount = (p, sp) => p > sp ? Math.round(((p - sp) / p) * 100) : 0;

    return (
        <div className="lp-page">

            {/* Header */}
            <div className="lp-header">
                <div>
                    <h1 className="lp-title"><FaListAlt size={18} /> Products</h1>
                    <p className="lp-sub">{filtered.length} of {list.length} products</p>
                </div>
                <div className="lp-header-right">
                    {/* Search */}
                    <div className="lp-search">
                        <FaSearch size={13} className="lp-search-icon" />
                        <input
                            placeholder="Search products..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="lp-search-input"
                        />
                        {search && <button className="lp-search-clear" onClick={() => setSearch('')}><MdClose size={14} /></button>}
                    </div>
                    {/* Bulk delete */}
                    {selectedIds.length > 0 && (
                        <button className="lp-bulk-del" onClick={() => confirmDelete('bulk')}>
                            <FaTrash size={12} /> Delete ({selectedIds.length})
                        </button>
                    )}
                </div>
            </div>

            {/* Category Filter */}
            <div className="lp-filters">
                {CATEGORIES.map(c => (
                    <button key={c} className={`lp-chip ${selectedCategory === c ? 'lp-chip-active' : ''}`} onClick={() => setSelectedCategory(c)}>
                        {c || 'All'}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="lp-table-wrap">
                {loading ? (
                    <div className="lp-loading">
                        {Array(5).fill(0).map((_, i) => <div key={i} className="lp-sk-row"><div className="lp-sk-line" /></div>)}
                    </div>
                ) : (
                    <table className="lp-table">
                        <thead>
                            <tr>
                                <th>
                                    <input type="checkbox"
                                        checked={filtered.length > 0 && selectedIds.length === filtered.length}
                                        onChange={toggleSelectAll}
                                        className="lp-checkbox"
                                    />
                                </th>
                                <th>Product</th>
                                <th>Category</th>
                                <th>MRP</th>
                                <th>Price</th>
                                <th>Discount</th>
                                <th>Stock</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(item => (
                                <tr key={item._id} className={selectedIds.includes(item._id) ? 'lp-row-selected' : ''}>
                                    <td>
                                        <input type="checkbox" checked={selectedIds.includes(item._id)} onChange={() => toggleSelect(item._id)} className="lp-checkbox" />
                                    </td>
                                    <td>
                                        <div className="lp-product-cell">
                                            <img src={`${url}/uploads/${item.image}`} alt={item.name} className="lp-img" />
                                            <span className="lp-name">{item.name}</span>
                                        </div>
                                    </td>
                                    <td><span className="lp-cat-badge">{item.category}</span></td>
                                    <td><span className="lp-mrp">₹{item.price}</span></td>
                                    <td><span className="lp-price">₹{item.sellingPrice}</span></td>
                                    <td>
                                        {discount(item.price, item.sellingPrice) > 0 &&
                                            <span className="lp-discount">{discount(item.price, item.sellingPrice)}% off</span>}
                                    </td>

                                    {/* Stock quick edit */}
                                    <td>
                                        <div className="lp-stock-cell">
                                            <input
                                                type="number"
                                                className="lp-stock-input"
                                                value={stockEdit[item._id] !== undefined ? stockEdit[item._id] : item.quantity}
                                                onChange={e => handleStockChange(item._id, e.target.value)}
                                            />
                                            {stockEdit[item._id] !== undefined && (
                                                <button className="lp-stock-save" onClick={() => saveStock(item)}>
                                                    <MdInventory size={13} />
                                                </button>
                                            )}
                                        </div>
                                    </td>

                                    {/* Out of stock toggle */}
                                    <td>
                                        <button className={`lp-toggle ${item.quantity > 0 ? 'lp-toggle-on' : 'lp-toggle-off'}`} onClick={() => toggleOutOfStock(item)} title={item.quantity > 0 ? 'Mark out of stock' : 'Mark in stock'}>
                                            {item.quantity > 0
                                                ? <><FaToggleOn size={18} /> In Stock</>
                                                : <><FaToggleOff size={18} /> Out of Stock</>
                                            }
                                        </button>
                                    </td>

                                    <td>
                                        <div className="lp-actions">
                                            <button className="lp-btn-edit" onClick={() => startEditing(item)} title="Edit"><FaEdit size={13} /></button>
                                            <button className="lp-btn-del" onClick={() => confirmDelete(item._id)} title="Delete"><MdDeleteForever size={15} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {!loading && filtered.length === 0 && <div className="lp-empty">No products found</div>}
            </div>

            {/* Delete Confirm Modal */}
            {deleteConfirm && (
                <div className="lp-overlay" onClick={() => setDeleteConfirm(null)}>
                    <div className="lp-confirm-modal" onClick={e => e.stopPropagation()}>
                        <div className="lp-confirm-icon">🗑️</div>
                        <h3 className="lp-confirm-title">
                            {deleteConfirm === 'bulk' ? `Delete ${selectedIds.length} products?` : 'Delete this product?'}
                        </h3>
                        <p className="lp-confirm-sub">This action cannot be undone.</p>
                        <div className="lp-confirm-btns">
                            <button className="lp-confirm-yes" onClick={doDelete}>Yes, Delete</button>
                            <button className="lp-confirm-no" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editingProduct && (
                <div className="lp-overlay" onClick={() => setEditingProduct(null)}>
                    <div className="lp-modal" onClick={e => e.stopPropagation()}>
                        <div className="lp-modal-header">
                            <h3>Edit Product</h3>
                            <button className="lp-modal-close" onClick={() => setEditingProduct(null)}><MdClose size={18} /></button>
                        </div>
                        <div className="lp-modal-body">
                            {[
                                { label: 'Name', name: 'name', type: 'text' },
                                { label: 'MRP Price (₹)', name: 'price', type: 'number' },
                                { label: 'Selling Price (₹)', name: 'sellingPrice', type: 'number' },
                                { label: 'Quantity', name: 'quantity', type: 'number' },
                            ].map(f => (
                                <div className="lp-modal-field" key={f.name}>
                                    <label>{f.label}</label>
                                    <input type={f.type} name={f.name} value={updatedProduct[f.name] || ''}
                                        onChange={e => setUpdatedProduct({ ...updatedProduct, [f.name]: e.target.value })} />
                                </div>
                            ))}
                            <div className="lp-modal-field">
                                <label>Category</label>
                                <select value={updatedProduct.category} onChange={e => setUpdatedProduct({ ...updatedProduct, category: e.target.value })}>
                                    {CATEGORIES.filter(Boolean).map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="lp-modal-field">
                                <label>New Image (optional)</label>
                                <input type="file" onChange={e => setNewImage(e.target.files[0])} />
                            </div>
                        </div>
                        <div className="lp-modal-footer">
                            <button className="lp-modal-save" onClick={updateProduct}>Save Changes</button>
                            <button className="lp-modal-cancel" onClick={() => setEditingProduct(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

List.propTypes = { url: PropTypes.string.isRequired };
export default List;
