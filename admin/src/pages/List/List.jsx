import { useState, useEffect } from 'react';
import './List.css'
import PropTypes from 'prop-types';
import { toast } from 'react-toastify'
import axios from 'axios'
import { MdDeleteForever } from "react-icons/md";


const List = ({ url }) => {


    const [list, setList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/product/list?category=${selectedCategory}`);
        if (response.data.success) {
            setList(response.data.data);
        }
        else {
            toast.error("Error");
        }
    }

    const removeProduct = async (foodId) => {
        const response = await axios.post(`${url}/api/product/remove`, { id: foodId });
        await fetchList();
        if (response.data.success) {
            toast.success(response.data.message);
        }
        else {
            toast.error("Error");
        }
    }

    useEffect(() => {
        fetchList();
    }, [selectedCategory]);

    return (
        <div className='list add flex-col'>
            <p>All Products List</p>
            <div>
                <select
                    className="show-product"
                    name="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">Select category</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Chocolates">Chocolates</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Coldrinks">Coldrinks</option>
                    <option value="Grocery">Grocery</option>
                </select>
            </div>
            <div className='list-table'>
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => {
                    return (
                        <div key={index} className='list-table-format'>
                            <img src={`${url}/uploads/` + item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>{item.price}</p>
                            <p onClick={() => removeProduct(item._id)} className='cursor-pointer'><MdDeleteForever size={25} /></p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
List.propTypes = {
    url: PropTypes.string.isRequired,
}
export default List