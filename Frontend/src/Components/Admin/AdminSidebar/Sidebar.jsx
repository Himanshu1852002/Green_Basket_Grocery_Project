import './Sidebar.css';
import { MdLibraryAdd, MdDashboardCustomize, MdShoppingBag } from 'react-icons/md';
import { FaListAlt, FaUsers, FaStar, FaBell } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const navItems = [
    { to: '/admin/dashboard',     icon: <MdDashboardCustomize size={20} />, label: 'Dashboard' },
    { to: '/admin/add',           icon: <MdLibraryAdd size={20} />,         label: 'Add Product' },
    { to: '/admin/list',          icon: <FaListAlt size={18} />,            label: 'Products' },
    { to: '/admin/orders',        icon: <MdShoppingBag size={20} />,        label: 'Orders' },
    { to: '/admin/users',         icon: <FaUsers size={18} />,              label: 'Users' },
    { to: '/admin/reviews',       icon: <FaStar size={17} />,               label: 'Reviews' },
    { to: '/admin/notifications', icon: <FaBell size={17} />,               label: 'Notifications' },
];

const Sidebar = () => {
    return (
        <aside className="as-sidebar">
            <nav className="as-nav">
                {navItems.map(item => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) => `as-link ${isActive ? 'as-active' : ''}`}
                    >
                        <span className="as-icon">{item.icon}</span>
                        <span className="as-label">{item.label}</span>
                        <span className="as-active-bar" />
                    </NavLink>
                ))}
            </nav>

            {/* Bottom version tag */}
            <div className="as-footer">
                <span className="as-version">v1.0.0</span>
            </div>
        </aside>
    );
};

export default Sidebar;
