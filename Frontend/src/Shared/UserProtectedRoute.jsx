import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) return <Navigate to="/" replace />;
    return children;
};

UserProtectedRoute.propTypes = { children: PropTypes.node.isRequired };

export default UserProtectedRoute;
