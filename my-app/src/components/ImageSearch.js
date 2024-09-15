import React, { useState } from 'react';
import './ImageSearch.css';  // Import the custom CSS

function ImageSearch() {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);  // Reset error on file change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select an image to search.");
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    setIsLoading(true);

    fetch('http://localhost:4000/api/restaurants/image-search', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to search restaurants.');
        }
        return response.json();
      })
      .then(data => setResults(data))
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="image-search-container">
      <h2 className="search-heading">Search Restaurants by Food Image</h2>
      <form onSubmit={handleSubmit} className="image-upload-form">
        <div className="file-input-wrapper">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
            required
          />
          <span className="file-input-label">
            {file ? file.name : 'Choose an image'}
          </span>
        </div>
        <button type="submit" className="search-btn" disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {isLoading && <p className="loading-message">Searching for restaurants...</p>}

      {!isLoading && results.length > 0 && (
        <ul className="restaurant-list">
          {results.map(restaurant => (
            <li key={restaurant.id} className="restaurant-item">
              <h3>{restaurant.name}</h3>
              {restaurant.featured_image && (
                <img src={restaurant.featured_image} alt={restaurant.name} className="restaurant-image" />
              )}
              <p>{restaurant.cuisine}</p>
              <p>{restaurant.location}</p>
            </li>
          ))}
        </ul>
      )}

      {!isLoading && results.length === 0 && !error && (
        <p className="no-results-message">No restaurants found for this image.</p>
      )}
    </div>
  );
}

export default ImageSearch;
