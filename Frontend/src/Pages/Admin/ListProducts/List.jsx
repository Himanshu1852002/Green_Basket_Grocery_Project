import { useState, useEffect } from 'react';
import './List.css';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import axios from 'axios';
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Button } from 'react-bootstrap';

const List = ({ url }) => {
    const [list, setList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [editingProduct, setEditingProduct] = useState(null);
    const [updatedProduct, setUpdatedProduct] = useState({});
    const [newImage, setNewImage] = useState(null);

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/product/list?category=${selectedCategory}`);
        if (response.data.success) {
            setList(response.data.data);
        } else {
            toast.error("Error fetching products");
        }
    };

    const removeProduct = async (productId) => {
        const response = await axios.post(`${url}/api/product/remove`, { id: productId });
        await fetchList();
        if (response.data.success) {
            toast.success(response.data.message);
        } else {
            toast.error("Error deleting product");
        }
    };

    const startEditing = (product) => {
        setEditingProduct(product._id);
        setUpdatedProduct(product);
        setNewImage(null);
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct({ ...updatedProduct, [name]: value });
    };

    const handleImageChange = (e) => {
        setNewImage(e.target.files[0]);
    };

    const updateProduct = async () => {
        const formData = new FormData();
        formData.append('id', updatedProduct._id);
        formData.append('name', updatedProduct.name);
        formData.append('price', updatedProduct.price);
        formData.append('sellingPrice', updatedProduct.sellingPrice);
        formData.append('quantity', updatedProduct.quantity);
        formData.append('category', updatedProduct.category);
        if (newImage) {
            formData.append('image', newImage); 
        }

        try {
            const response = await axios.post(`${url}/api/product/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.success) {
                toast.success("Product updated successfully!");
                setEditingProduct(null);
                fetchList();
            } else {
                toast.error("Error updating product");
            }
        } catch (error) {
            toast.error("Error updating product");
            console.log(error)
        }
    };

    const cancelEditing = () => {
        setEditingProduct(null);
    };

    useEffect(() => {
        fetchList();
    }, [selectedCategory]);

    return (
        <div className="mt-5 pt-2 container">
            <h1 className="text-center text-muted mb-4 mt-5">All Products List</h1>
            <div className="mb-4 text-center">
                <select
                    className="form-select w-25 mx-auto"
                    name="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Select category</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Chocolates">Chocolates</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Coldrinks">Coldrinks</option>
                    <option value="Grocery">Grocery</option>
                </select>
            </div>

            <div className="product-list">
                {list.map((item) => (
                    <div key={item._id} className="list-product-card mb-3">
                        <div className="list-card d-flex flex-row align-items-center p-3 shadow-sm">
                            <img
                                src={`${url}/uploads/${item.image}`}
                                alt={item.name}
                                className="card-img-small rounded me-3"
                                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                            />
                            <div className="flex-grow-1">
                                <h6 className="mb-1">{item.name}</h6>
                                <p className="mb-0 small text-muted">
                                    <strong>Category:</strong> {item.category}
                                </p>
                                <p className="mb-0">
                                    <strong>Price:</strong> <span className="text-muted text-decoration-line-through">₹{item.price}</span> |
                                    <strong className="text-success"> ₹{item.sellingPrice}</strong>
                                </p>
                                <p className="mb-0 small text-muted">
                                    <strong>Quantity:</strong> {item.quantity}
                                </p>
                            </div>
                            <div>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    className="me-2 mb-1 mb-sm-0 btn-success"
                                    onClick={() => startEditing(item)}
                                >
                                    <FaEdit size={16}/>
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => removeProduct(item._id)}
                                >
                                    <MdDeleteForever size={16} />
                                </Button>
                            </div>
                        </div>

                        {/* Popup for editing */}
                        {editingProduct === item._id && (
                            <div className="edit-popup p-3 mt-3 border rounded bg-light">
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={updatedProduct.name}
                                        onChange={handleUpdateChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="price"
                                        value={updatedProduct.price}
                                        onChange={handleUpdateChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Selling Price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="sellingPrice"
                                        value={updatedProduct.sellingPrice}
                                        onChange={handleUpdateChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Quantity</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="quantity"
                                        value={updatedProduct.quantity}
                                        onChange={handleUpdateChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={handleImageChange}
                                    />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <Button variant="success" onClick={updateProduct}>
                                        Save Changes
                                    </Button>
                                    <Button variant="secondary" onClick={cancelEditing}>
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

List.propTypes = {
    url: PropTypes.string.isRequired,
};

export default List;


