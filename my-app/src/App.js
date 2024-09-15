import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RestaurantList from './components/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail';
import LocationSearch from './components/LocationSearch';
import ImageSearch from './components/ImageSearch';
import Navbar from './components/Navbar';
import './main.css';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantsPerPage] = useState(10); // You can adjust this number as needed

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route 
            path="/" 
            element={
              <RestaurantList 
                currentPage={currentPage}
                restaurantsPerPage={restaurantsPerPage}
                paginate={paginate}
              />
            } 
          />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          <Route path="/search/location" element={<LocationSearch />} />
          <Route path="/search/image" element={<ImageSearch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;