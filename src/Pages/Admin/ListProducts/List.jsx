import { useState, useEffect } from 'react';
import './List.css';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import axios from 'axios';
import { MdDeleteForever } from "react-icons/md";
import { Button } from 'react-bootstrap';

const List = ({ url }) => {
    const [list, setList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

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

    const handleEdit = (productId) => {
        toast.info(`Edit item with ID: ${productId}`);
    };

    useEffect(() => {
        fetchList();
    }, [selectedCategory]);

    return (
        <div className="list-container mt-5 container">
            <h1 className="text-center text-muted mt-5 mb-4">All Products List</h1>
            <div className="mb-4 text-center">
                <select
                    className="form-select w-50 mx-auto"
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
                {list.map((item, index) => (
                    <div key={index} className="list-product-card mb-3">
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
                                    className="me-2"
                                    onClick={() => handleEdit(item._id)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => removeProduct(item._id)}
                                >
                                    <MdDeleteForever size={16} /> Delete
                                </Button>
                            </div>
                        </div>
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
