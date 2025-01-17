import './Sidebar.css'
import { MdLibraryAdd } from "react-icons/md";
import { FaListAlt } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='sidebar position-fixed'>
            <div className="sidebar-options">
                <Link to='/admin/add' className="sidebar-option">
                    <MdLibraryAdd size={25} />
                    <span className='d-none d-md-flex'> Add Items</span>
                </Link>
                <Link to='/admin/list' className="sidebar-option">
                    <FaListAlt size={25} />
                    <span className='d-none d-md-flex'>List Items</span>
                </Link>
                <Link to='/admin/orders' className="sidebar-option">
                    <AiFillProduct size={25} />
                    <span className='d-none d-md-flex'>Orders</span>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar