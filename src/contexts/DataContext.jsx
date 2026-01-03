import React, { createContext,useState, useContext, use } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [restaurants, setRestaurants] = useState([]);


  useEffect(() => {
    const saved=localStorage.getItem('evalData');
    if (saved) {
      setRestaurants (JSON.parse (saved));
    }
}, []);

  useEffect(() => {
    localStorage.setItem('evalData', JSON.stringify(restaurants));
}, [restaurants]);
    const addRestaurant = (restaurantData) => {
        const newRestaurant = {
            id: Date.now().toString(),
            ...restaurantData,
        };
        setRestaurants(prev=>[...prev, newRestaurant]);
    }
    const updateRestaurant = (id, updatedData) => {
        setRestaurants(prev=>prev.map
            (restaurant=>
                restaurant.id===id ?
                 { ...restaurant, ...updatedData }
                  : restaurant
            )
        );
    };
    const deleteRestaurant = (id) => {
        setRestaurants(prev=>prev.filter(restaurant=>restaurant.id!==id));
    }
    const value = {
        restaurants,
        addRestaurant,
        updateRestaurant,
        deleteRestaurant,
    };  
  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}