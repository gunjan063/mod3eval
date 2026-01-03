import React, { createContext, useContext, useState, useEffect} from 'react';
import {usenavigate} from 'react-router-dom';
const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUser({ role: payload.role });
        } catch {
            localStorage.removeItem('token');
        }
    }
      setLoading(false);
    }, []);

  const login = (email, password) => {
    if (email === 'admin@admin.com' && password === 'admin012') {
        const token = btoa(JSON.stringify({ role: 'admin' }));
        localStorage.setItem('token', `jwt.${token}`);
        setUser({ role: 'admin' });
        return true;
    }
    if (email === 'customer@customer.com' && password === 'customer012') {
        const token = btoa(JSON.stringify({ role: 'customer' }));
        localStorage.setItem('token', `jwt.${token}`);
        setUser({ role: 'customer' });
        return true;
    }
    return false;
  } 
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  }

  const value = { user, login, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) 
        throw new Error('useAuth must be used within an AuthProvider');
    
    return context;
    }
export default AuthContext;
