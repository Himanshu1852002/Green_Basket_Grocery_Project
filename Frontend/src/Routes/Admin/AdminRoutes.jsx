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
import Reviews from '../../Pages/Admin/Reviews/Reviews';
import SendNotification from '../../Pages/Admin/Notifications/SendNotification';
import SpecialCollections from '../../Pages/Admin/SpecialCollections/SpecialCollections';
import Messages from '../../Pages/Admin/Messages/Messages';
import Coupons from '../../Pages/Admin/Coupons/Coupons';
import Categories from '../../Pages/Admin/Categories/Categories';
import SalesReport from '../../Pages/Admin/SalesReport/SalesReport';
import NotFound from '../../Pages/User/NotFound/NotFound';

const AdminRoutes = () => {
    const url = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

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
                        <Route path="reviews" element={<Reviews />} />
                        <Route path="notifications" element={<SendNotification />} />
                        <Route path="special-collections" element={<SpecialCollections />} />
                        <Route path="messages" element={<Messages />} />
                        <Route path="coupons" element={<Coupons />} />
                        <Route path="categories" element={<Categories />} />
                        <Route path="sales-report" element={<SalesReport />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default AdminRoutes;
