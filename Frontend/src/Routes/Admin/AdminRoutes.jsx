import { Route, Routes } from "react-router-dom";
import Add from "../../Pages/Admin/AddProducts/Add";
import List from "../../Pages/Admin/ListProducts/List";
import Orders from "../../Pages/Admin/Orders/Orders";
import { ToastContainer } from "react-toastify";
import Navbar from "../../Components/Admin/AdminNavbar/Navbar";
import Sidebar from "../../Components/Admin/AdminSidebar/Sidebar";
import "./AdminRoutes.css"; // Add custom styles
import Dashboard from "../../Pages/Admin/Dashboard/Dashboard";

const AdminRoutes = () => {
    const url = import.meta.env.REACT_APP_API_BASE_URL;

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
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default AdminRoutes;
