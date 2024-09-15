import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import './RestaurantDetail.css';

function RestaurantDetail() {
  const [restaurant, setRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const fetchRestaurantDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:4000/api/restaurant/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setRestaurant(data);
    } catch (e) {
      setError('Failed to fetch restaurant details. Please try again later.');
      console.error('Error fetching restaurant details:', e);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchRestaurantDetails();
  }, [fetchRestaurantDetails]);

  if (isLoading) {
    return <div className="loading">Loading restaurant details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!restaurant) {
    return <div className="error">Restaurant not found.</div>;
  }

  const {
    'Restaurant Name': name,
    featured_image: image,
    Cuisines,
    'Aggregate rating': rating,
    'Rating text': ratingText,
    'Average Cost for two': costForTwo,
    Currency,
    'Price range': priceRange,
    Address,
    City,
    'Country Code': countryCode,
    Locality,
    'Locality Verbose': localityVerbose,
    Votes,
    'Has Table booking': hasTableBooking,
    'Has Online delivery': hasOnlineDelivery,
    'Is delivering now': isDeliveringNow,
    menu_url: menuUrl,
    url: restaurantUrl,
    photos_url: photosUrl,
    book_url: bookUrl
  } = restaurant;

  return (
    <div className="restaurant-detail">
      <h1>{name}</h1>
      {image && (
        <img 
          src={image} 
          alt={name} 
          className="restaurant-image" 
        />
      )}
      <div className="restaurant-info">
        <p><strong>Cuisines:</strong> {Cuisines}</p>
        <p><strong>Rating:</strong> {rating} ({ratingText})</p>
        <p><strong>Average Cost for Two:</strong> {costForTwo} {Currency}</p>
        <p><strong>Price Range:</strong> {priceRange}/5</p>
        <p><strong>Address:</strong> {Address}, {City}, {countryCode}</p>
        <p><strong>Locality:</strong> {Locality} ({localityVerbose})</p>
        <p><strong>Votes:</strong> {Votes}</p>
        <p><strong>Table Booking:</strong> {hasTableBooking ? 'Yes' : 'No'}</p>
        <p><strong>Online Delivery:</strong> {hasOnlineDelivery ? 'Yes' : 'No'}</p>
        <p><strong>Currently Delivering:</strong> {isDeliveringNow ? 'Yes' : 'No'}</p>
      </div>

      <div className="restaurant-links">
        {menuUrl && <a href={menuUrl} target="_blank" rel="noopener noreferrer" className="link">View Menu</a>}
        {restaurantUrl && <a href={restaurantUrl} target="_blank" rel="noopener noreferrer" className="link">Visit Restaurant Website</a>}
        {photosUrl && <a href={photosUrl} target="_blank" rel="noopener noreferrer" className="link">View Photos</a>}
        {bookUrl && <a href={bookUrl} target="_blank" rel="noopener noreferrer" className="link">Book a Table</a>}
      </div>
    </div>
  );
}

export default RestaurantDetail;
