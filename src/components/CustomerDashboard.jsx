import React, {usestate} from 'react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';

function CustomerDashboard() {
    const {restaurants} = useData();
    const {logout} = useAuth();

    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ cuisine: '', minRating: 0 });

    const filteredRestaurants = restaurants.filter((restaurant) => {
        const matchesSearch =
            restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCuisine =
            filters.cuisine ? restaurant.cuisine === filters.cuisine : true;
        const matchesRating =
            restaurant.rating >= filters.minRating;
        return matchesSearch && matchesCuisine && matchesRating;
    });
     return(
        <div className="customer-dashboard">
            <header>
                <h1>Customer Dashboard</h1> 
                <button onClick={logout}>Logout</button>
            </header>
            <div className="filters">

                <input
                    type="text"
                    placeholder="Search restaurants..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    value={filters.cuisine}
                    onChange={(e) => setFilters({...filters, cuisine: e.target.value})}
                >
                    <option value="">All Cuisines</option>
                    <option value="Italian">Italian</option>
                    <option value="Mexican">Mexican</option>
                    <option value="Indian">Indian</option>
                </select>
                <input
                    type="number"
                    placeholder="Min Rating"
                    value={filters.minRating}
                    onChange={(e) => setFilters({...filters, minRating: parseFloat(e.target.value) || 0})}
                />
            </div>
            <div className="restaurant-list">
                {filteredRestaurants.map((restaurant) => (
                    <div key={restaurant.id} className="restaurant-card">
                        <h2>{restaurant.name}</h2>
                        <p>{restaurant.cuisine}</p>
                        <p>Rating: {restaurant.rating}</p>
                        <button>View Details</button>
                    </div>
                ))}
            </div>
        </div>
     );
}
export default CustomerDashboard;