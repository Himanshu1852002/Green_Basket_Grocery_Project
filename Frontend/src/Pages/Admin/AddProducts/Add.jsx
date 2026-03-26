import './Add.css';
import upload_img from '../../../assets/Images/Images/upload_area.png';
import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdLibraryAdd } from 'react-icons/md';

const CATEGORIES = ['Fruits', 'Vegetables', 'Chocolates', 'Snacks', 'Coldrinks', 'Grocery'];
const UNITS = ['kg', 'g', 'liters', 'ml', 'pieces'];

const Add = ({ url }) => {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: '', unit: '', description: '',
        price: '', sellingPrice: '', quantity: '', category: 'Fruits',
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!image) { toast.error('Please upload a product image'); return; }
        if (Number(data.sellingPrice) > Number(data.price)) { toast.error('Selling price cannot be greater than MRP'); return; }
        if (Number(data.sellingPrice) <= 0 || Number(data.price) <= 0) { toast.error('Price must be greater than 0'); return; }
        if (Number(data.quantity) < 0) { toast.error('Quantity cannot be negative'); return; }
        const formData = new FormData();
        Object.entries(data).forEach(([k, v]) => formData.append(k, k === 'price' || k === 'sellingPrice' || k === 'quantity' ? Number(v) : v));
        formData.append('image', image);
        try {
            const res = await axios.post(`${url}/api/product/add`, formData);
            if (res.data.success) {
                setData({ name: '', unit: '', description: '', price: '', sellingPrice: '', quantity: '', category: 'Fruits' });
                setImage(null);
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch { toast.error('Failed to add product'); }
    };

    return (
        <div className="ap-page">
            <div className="ap-header">
                <h1 className="ap-title"><MdLibraryAdd size={22} /> Add Product</h1>
                <p className="ap-sub">Fill in the details to add a new product</p>
            </div>

            <form className="ap-form" onSubmit={onSubmit}>

                {/* Image Upload */}
                <div className="ap-upload-wrap">
                    <label htmlFor="ap-image" className="ap-upload">
                        {image
                            ? <img src={URL.createObjectURL(image)} alt="preview" className="ap-preview" />
                            : <>
                                <img src={upload_img} alt="upload" className="ap-upload-icon" />
                                <span className="ap-upload-text"><FaCloudUploadAlt size={18} /> Click to upload image</span>
                              </>
                        }
                    </label>
                    <input type="file" id="ap-image" hidden required onChange={e => setImage(e.target.files[0])} />
                    {image && <button type="button" className="ap-remove-img" onClick={() => setImage(null)}>✕ Remove</button>}
                </div>

                {/* Fields */}
                <div className="ap-fields">
                    <div className="ap-row">
                        <div className="ap-field">
                            <label>Product Name</label>
                            <input name="name" value={data.name} onChange={onChange} placeholder="e.g. Fresh Apple" required />
                        </div>
                        <div className="ap-field">
                            <label>Unit</label>
                            <select name="unit" value={data.unit} onChange={onChange} required>
                                <option value="">-- Select unit --</option>
                                {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="ap-field">
                        <label>Description</label>
                        <textarea name="description" value={data.description} onChange={onChange} rows={3} placeholder="Write product description..." required />
                    </div>

                    <div className="ap-row">
                        <div className="ap-field">
                            <label>Category</label>
                            <select name="category" value={data.category} onChange={onChange}>
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="ap-field">
                            <label>MRP Price (₹)</label>
                            <input type="number" name="price" value={data.price} onChange={onChange} placeholder="e.g. 100" required />
                        </div>
                        <div className="ap-field">
                            <label>Selling Price (₹) {data.price && data.sellingPrice && Number(data.sellingPrice) > Number(data.price) && <span style={{color:'#e53935', fontSize:'0.75rem'}}>⚠ Cannot exceed MRP</span>}</label>
                            <input type="number" name="sellingPrice" value={data.sellingPrice} onChange={onChange} placeholder="e.g. 80" required
                                style={data.price && data.sellingPrice && Number(data.sellingPrice) > Number(data.price) ? {borderColor:'#e53935'} : {}}
                            />
                        </div>
                        <div className="ap-field">
                            <label>Quantity</label>
                            <input type="number" name="quantity" value={data.quantity} onChange={onChange} placeholder="e.g. 50" required />
                        </div>
                    </div>

                    <button type="submit" className="ap-submit">
                        <MdLibraryAdd size={18} /> Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};

Add.propTypes = { url: PropTypes.string.isRequired };
export default Add;
