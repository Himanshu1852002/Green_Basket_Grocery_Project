import './Sidebar.css'
import add_icon from '../../assets/add_icon.png'
import order_icon from '../../assets/order_icon.png'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="sidebar-options">
                <Link to='/add' className="sidebar-option">
                    <img src={add_icon} alt="" />
                    <p className='mb-0'>Add Items</p>
                </Link>
                <Link to='/list' className="sidebar-option">
                    <img src={order_icon} alt="" />
                    <p className='mb-0'>List Items</p>
                </Link>
                <Link to='/orders' className="sidebar-option">
                    <img src={order_icon} alt="" />
                    <p className='mb-0'>Orders</p>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar