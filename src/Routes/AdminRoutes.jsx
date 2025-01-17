import { Route, Routes } from "react-router-dom"
import Add from '../Pages/Admin/AddProducts/Add'
import List from '../Pages/Admin/ListProducts/List'
import Orders from '../Pages/Admin/Orders/Orders'
import { ToastContainer } from 'react-toastify';
import Navbar from "../Components/Admin/AdminNavbar/Navbar";
import Sidebar from '../Components/Admin/AdminSidebar/Sidebar'

const AdminRoutes = () => {

    const url = "http://localhost:3000"

    return (
        <div>
            <ToastContainer autoClose={1500} />
            <Navbar />
            <div className='d-flex'>
                <Sidebar />
                <Routes>
                    <Route path="add" element={<Add url={url} />} />
                    <Route path="list" element={<List url={url} />} />
                    <Route path="orders" element={<Orders url={url} />} />
                </Routes>
            </div>
        </div>
    )
}

export default AdminRoutes