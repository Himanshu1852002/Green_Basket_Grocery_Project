import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const AdminProtectedRoutes = ({ children }) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return children;
}

AdminProtectedRoutes.propTypes = {
    children: PropTypes.node.isRequired,

};

export default AdminProtectedRoutes