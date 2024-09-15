import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LocationSearch.css';  // Import the custom CSS

function LocationSearch() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [radius, setRadius] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:4000/api/restaurants/near?lat=${latitude}&lng=${longitude}&radius=${radius}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error searching restaurants:', error);
      setError('Failed to search restaurants. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Full stars
    const halfStars = rating % 1 >= 0.5 ? 1 : 0; // Half star if the decimal part is 0.5 or more
    const emptyStars = 5 - fullStars - halfStars; // Remaining stars

    const stars = '★'.repeat(fullStars) + '⯪'.repeat(halfStars) + '☆'.repeat(emptyStars);
    return <span className="stars">{stars}</span>;
};
  return (
    <div className="location-search-container">
      <h2 className="search-heading">Search Restaurants by Location</h2>
      <form onSubmit={handleSearch} className="search-form">
        <div className="input-group">
          <input
            type="number"
            step="any"
            placeholder="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <input
            type="number"
            step="any"
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <input
            type="number"
            step="any"
            placeholder="Radius (km)"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <button type="submit" disabled={isLoading} className="search-btn">
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {isLoading ? (
        <p className="loading-message">Searching for restaurants...</p>
      ) : results.length > 0 ? (
        <ul className="restaurant-list">
          {results.map(restaurant => (
            <li key={restaurant['Restaurant ID']} className="restaurant-item">
              <Link to={`/restaurant/${restaurant['Restaurant ID']}`} className="restaurant-link">
                <h3>{restaurant['Restaurant Name']}</h3>
              </Link>
              {restaurant.featured_image && (
                <img 
                  src={restaurant.featured_image} 
                  alt={restaurant['Restaurant Name']}
                  className="restaurant-image"
                />
              )}
              <div className="restaurant-info">
                <p><strong>Cuisines:</strong> {restaurant.Cuisines}</p>
                <p><strong>Address:</strong> {restaurant.Address}</p>
                <p><strong>Rating:</strong> {renderStars(restaurant['Aggregate rating'])} ({restaurant['Rating text']})</p>
                <p><strong>Average Cost for Two:</strong> {restaurant['Average Cost for two']} {restaurant.Currency}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : results.length === 0 && !isLoading ? (
        <p className="no-results-message">No restaurants found in this area.</p>
      ) : null}
    </div>
  );
}

export default LocationSearch;
