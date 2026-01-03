import React, { useState, useEffect } from "react";

import { useData } from "../contexts/DataContext"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

function AdminDashboard() {
    const {restaurants, addrestaurant, updateRestaurant, deleteRestaurant} = useData();
    const {logout} = useAuth();
    const navigate = useNavigate();
     const [searchTerm, setSearchTerm] = useState("");
     const [formData , setFormData] = useState({ name: "", cuisine: "", rating: "" });
    const [editingId, setEditingId] = useState(null); 
    const  [alert, setalert] = useState('')
    
    const filteredRestaurants = restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlesubmit
    = (e) => {
        e.preventDefault();
        if (editingId) {
            updateRestaurant(editingId, Formdata);
            setalert('Restaurant updated successfully');
        } else {
            addrestaurant(Formdata);
            setalert('Restaurant added successfully');
        }
        setFormdata({ name: "", cuisine: "", rating: "" });
        setTimeout(() => 
            setalert(''), 3000);
    }
        }
 const handleedit = (restaurant) => {
     setFormdata(restaurant);
     setEditingId(restaurant.id);
 }
    const handledelete = (id) => {
        if(window.confirm("Are you sure you want to delete this restaurant?")) {
        deleteRestaurant(id);
        setalert('Restaurant deleted successfully');    
        setTimeout(() => 
            setalert(''), 3000);
    }
    };
    
    return (
        <div className="admin-dashboard">
            <aside className="sidebar">
                <h2>Admin Dashboard</h2>
                <button onClick={logout}>Logout</button>
            </aside>
           
                <div className="top-bar">
                    <input
                        type="text"
                        placeholder="search restaurants..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                </div>

        
    );

            export default AdminDashboard;