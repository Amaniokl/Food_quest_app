import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './home.css';

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRestaurants, setTotalRestaurants] = useState(0);
  const limit = 8; // This should match the limit in your backend

  useEffect(() => {
    fetchRestaurants();
  }, [currentPage]);

  const fetchRestaurants = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:4000/api/restaurants?page=${currentPage}&limit=${limit}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRestaurants(data);
      // Assuming the backend returns the total count in the header
      const totalCount = response.headers.get('X-Total-Count');
      setTotalRestaurants(totalCount ? parseInt(totalCount) : 0);
    } catch (e) {
      setError('Failed to fetch restaurants. Please try again later.');
      console.error('Error fetching restaurants:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const totalPages = Math.ceil(totalRestaurants / limit);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (isLoading) return <div className="loading">Loading restaurants...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Full stars
    const halfStars = rating % 1 >= 0.5 ? 1 : 0; // Half star if the decimal part is 0.5 or more
    const emptyStars = 5 - fullStars - halfStars; // Remaining stars

    const stars = '★'.repeat(fullStars) + '⯪'.repeat(halfStars) + '☆'.repeat(emptyStars);
    return <span className="stars">{stars}</span>;
};

  return (
    <div className="home-container">
      <h1 className="home-title">Restaurants</h1>
      {restaurants.length === 0 ? (
        <p>No restaurants found.</p>
      ) : (
        <>
          <div className="restaurant-grid">
            {restaurants.map((restaurant, index) => (
              <div key={restaurant['Restaurant ID']} className="restaurant-card" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="card-image">
                  {restaurant.featured_image ? (
                    <img src={restaurant.featured_image} alt={restaurant['Restaurant Name']} />
                  ) : (
                    <div className="placeholder-image">No image available</div>
                  )}
                </div>
                <div className="card-content">
                  <Link to={`/restaurant/${restaurant['Restaurant ID']}`}>
                    <h2>{restaurant['Restaurant Name']}</h2>
                  </Link>
                  <p><strong>Cuisines</strong>: {restaurant.Cuisines}</p>
                  <p><strong>Rating</strong>: {renderStars(restaurant['Aggregate rating'])} ({restaurant['Rating text']})</p>
                  <p><strong>Location</strong>: {restaurant.City}, {restaurant['Country Code']}</p>
                  <p><strong>Average Cost for Two</strong>: {restaurant['Average Cost for two']} {restaurant.Currency}</p>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="pagination">
      <button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>{currentPage}</span>
      <button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}




export default RestaurantList;