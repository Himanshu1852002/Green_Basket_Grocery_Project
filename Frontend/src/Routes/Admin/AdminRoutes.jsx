import { Route, Routes } from "react-router-dom";
import Add from "../../Pages/Admin/AddProducts/Add";
import List from "../../Pages/Admin/ListProducts/List";
import Orders from "../../Pages/Admin/Orders/Orders";
import { ToastContainer } from "react-toastify";
import Navbar from "../../Components/Admin/AdminNavbar/Navbar";
import Sidebar from "../../Components/Admin/AdminSidebar/Sidebar";
import "./AdminRoutes.css";
import Dashboard from '../../Pages/Admin/Dashboard/Dashboard';
import Users from '../../Pages/Admin/Users/Users';
import NotFound from '../../Pages/User/NotFound/NotFound';

const AdminRoutes = () => {
    const url = "https://green-basket-grocery-project.onrender.com"

    return (
        <div className="admin-layout">
            <ToastContainer autoClose={1500} />
            <Navbar />
            <div className="display-flex">
                <Sidebar />
                <div className="admin-content">
                    <Routes>
                        <Route path="/" element={<Dashboard url={url} />} />
                        <Route path="dashboard" element={<Dashboard url={url} />} />
                        <Route path="add" element={<Add url={url} />} />
                        <Route path="list" element={<List url={url} />} />
                        <Route path="orders" element={<Orders url={url} />} />
                        <Route path="users" element={<Users />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default AdminRoutes;
