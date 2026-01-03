import  React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute requiredRole={["admin"]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer/dashboard"
                element={
                  <ProtectedRoute requiredRole={["customer"]}>
                    <CustomerDashboard />
                  </ProtectedRoute>
                }
              />
            <Route path="*" element={<Navigate to="/" /> } />
            </Routes>
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;