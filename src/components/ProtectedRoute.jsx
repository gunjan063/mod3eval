import React from 'react';
import {Navigate, useLocation} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function ProtectedRoute({ children, allowedRole }) {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/" state={{ from: location }} replace />;

    }
    if (allowedRole && !allowedRole.includes(user.role)) {
        return <Navigate to="/customer/dashboard" replace />;
    }
    return children;
}   
export default ProtectedRoute;