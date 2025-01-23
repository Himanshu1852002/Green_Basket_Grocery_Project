import './Add.css';
import upload_img from '../../../assets/Images/Images/upload_area.png';
import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ url }) => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        unit: "",
        description: "",
        price: "",
        sellingPrice: "",
        quantity: "",
        category: "Fruits",
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("unit", data.unit);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("sellingPrice", Number(data.sellingPrice));
        formData.append("category", data.category);
        formData.append("image", image);
        formData.append("quantity", Number(data.quantity));

        const response = await axios.post(`${url}/api/product/add`, formData);
        if (response.data.success) {
            setData({
                name: "",
                unit: "",
                description: "",
                price: "",
                sellingPrice: "",
                category: "Fruits",
                quantity: "",
            });
            setImage(false);
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
    };

    return (
        <div className="container-fluid mt-5 d-flex justify-content-center align-items-center flex-column add">
            <h1 className='mt-5 text-center'>Add Products</h1>
            <form className="row w-lg-75 w-50 g-4" onSubmit={onSubmitHandler}>
                {/* Image Upload */}
                <div className="col-md-3 text-center">
                    <label htmlFor="image" className="add-img-upload">
                        <img
                            className="w-100 h-auto"
                            src={image ? URL.createObjectURL(image) : upload_img}
                            alt="Upload"
                        />
                    </label>
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        id="image"
                        hidden
                        required
                    />
                </div>

                {/* Product Name */}
                <div className="col-md-6">
                    <label>Product Name</label>
                    <input
                        type="text"
                        className="form-control border-3"
                        name="name"
                        value={data.name}
                        onChange={onChangeHandler}
                        placeholder="Type here"
                        required
                    />
                </div>

                {/* Product Unit */}
                <div className="col-md-3">
                    <label>Product Unit</label>
                    <select
                        className="form-select border-3"
                        name="unit"
                        value={data.unit}
                        onChange={onChangeHandler}
                        required
                    >
                        <option value="">--Select unit--</option>
                        <option value="kg">kg</option>
                        <option value="g">g</option>
                        <option value="liters">liters</option>
                        <option value="ml">ml</option>
                        <option value="pieces">pieces</option>
                    </select>
                </div>

                {/* Product Description */}
                <div className="col-md-12">
                    <label>Product Description</label>
                    <textarea
                        className="form-control border-3"
                        name="description"
                        value={data.description}
                        onChange={onChangeHandler}
                        rows="4"
                        placeholder="Write description"
                        required
                    ></textarea>
                </div>

                {/* Category and Price */}
                <div className="col-md-4">
                    <label>Product Category</label>
                    <select
                        className="form-select border-3"
                        name="category"
                        value={data.category}
                        onChange={onChangeHandler}
                    >
                        <option value="Fruits">Fruits</option>
                        <option value="Vegetables">Vegetables</option>
                        <option value="Chocolates">Chocolates</option>
                        <option value="Snacks">Snacks</option>
                        <option value="Coldrinks">Coldrinks</option>
                        <option value="Grocery">Grocery</option>
                    </select>
                </div>

                <div className="col-md-4">
                    <label>Product Price</label>
                    <input
                        type="number"
                        className="form-control border-3"
                        name="price"
                        value={data.price}
                        onChange={onChangeHandler}
                        placeholder="₹10"
                        required
                    />
                </div>

                {/* Selling Price */}
                <div className="col-md-4">
                    <label>Selling Price</label>
                    <input
                        type="number"
                        className="form-control border-3"
                        name="sellingPrice"
                        value={data.sellingPrice}
                        onChange={onChangeHandler}
                        placeholder="₹15"
                        required
                    />
                </div>

                {/* Quantity */}
                <div className="col-md-4">
                    <label>Quantity</label>
                    <input
                        type="number"
                        className="form-control border-3"
                        name="quantity"
                        value={data.quantity}
                        onChange={onChangeHandler}
                        placeholder="Enter quantity"
                        required
                    />
                </div>

                <div className="col-md-12 text-center">
                    <button type="submit" className="btn btn-success w-50">
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};

Add.propTypes = {
    url: PropTypes.string.isRequired,
};

export default Add;
