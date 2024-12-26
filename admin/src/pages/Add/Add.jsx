import './Add.css';
import upload_img from '../../assets/upload_area.png';
import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'


const Add = ({ url }) => {

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        unit: "",
        description: "",
        price: "",
        category: "Fruits"
    });

    const onChangeHandler = async (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("unit", data.unit);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);

        const response = await axios.post(`${url}/api/product/add`, formData);
        if (response.data.success) {
            setData({
                name: "",
                unit: "",
                description: "",
                price: "",
                category: "Fruits"
            })
            setImage(false);
            toast.success(response.data.message);
        }
        else {
            toast.error(response.data.message)
        }
    }

    return (
        <div className="add">
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <label htmlFor="image">
                        <img className='w-100 h-100' src={image ? URL.createObjectURL(image) : upload_img} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>
                <div className='d-flex gap-4 h-100'>
                    <div className="add-product-name flex-col">
                        <p>Product Name</p>
                        <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type here" />
                    </div>-
                    <div className="flex-col">
                        <p>Product Unit</p>
                        <select className='add-product-unit' onChange={onChangeHandler} value={data.unit} name="unit">
                            <option value="">--Select unit--</option>
                            <option value="kg">kg</option>
                            <option value="g">g</option>
                            <option value="liters">liters</option>
                            <option value="ml">ml</option>
                            <option value="pieces">pieces</option>
                        </select>
                    </div>
                </div>
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows='6' placeholder="Write Description"></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select onChange={onChangeHandler} name="category">
                            <option value="Fruits">Fruits</option>
                            <option value="Vegetables">Vegetables</option>
                            <option value="Chocolates">Chocolates</option>
                            <option value="Snacks">Snacks</option>
                            <option value="Coldrinks">Coldrinks</option>
                            <option value="Grocery">Grocery</option>
                        </select>
                    </div>

                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} type="Number" name="price" placeholder="₹10" />
                    </div>
                </div>
                <button type="submit" className='add-btn'>Add</button>
            </form>
        </div>
    )
}

Add.propTypes = {
    url: PropTypes.string.isRequired,
}


export default Add;