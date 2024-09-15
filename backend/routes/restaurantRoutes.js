const express = require("express");
const router = express.Router();
const geolib = require("geolib");
const Restaurant = require("../models/restaurants");

// Get Restaurant by ID
router.get("/restaurant/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      "Restaurant ID": req.params.id,
    });
    console.log(restaurant);
    if (!restaurant) return res.status(404).send("Restaurant not found");
    res.json(restaurant);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get List of Restaurants with Pagination
router.get("/restaurants", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const restaurants = await Restaurant.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json(restaurants);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

function haversineDistance(coords1, coords2) {
  return geolib.getDistance(
    { latitude: coords1.lat, longitude: coords1.lng },
    { latitude: coords2.lat, longitude: coords2.lng }
  );
}
// Get restaurants near given coordinates and radius
router.get("/restaurants/near", async (req, res) => {
  const { lat, lng, radius } = req.query;

  if (!lat || !lng || !radius) {
    return res
      .status(400)
      .json({ error: "Please provide latitude, longitude, and radius" });
  }

  // Convert lat, lng, and radius to numbers
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lng);
  const radiusInMeters = parseFloat(radius) * 1000; // Convert radius from km to meters

  try {
    // Fetch all restaurants
    const allRestaurants = await Restaurant.find();

    // Filter restaurants within the radius using the Haversine formula
    const restaurantsWithinRadius = allRestaurants.filter((restaurant) => {
      // Check if the restaurant has valid Latitude and Longitude
      if (!restaurant.Latitude || !restaurant.Longitude) return false;

      const restaurantCoords = {
        lat: parseFloat(restaurant.Latitude),
        lng: parseFloat(restaurant.Longitude),
      };

      // Calculate the distance between user's coordinates and restaurant coordinates
      const distance = haversineDistance(
        { lat: latitude, lng: longitude },
        restaurantCoords
      );

      // Return true if the restaurant is within the specified radius
      return distance <= radiusInMeters;
    });

    if (restaurantsWithinRadius.length === 0) {
      return res
        .status(404)
        .json({ message: "No restaurants found within this range" });
    }

    res.status(200).json(restaurantsWithinRadius);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error });
  }
});

module.exports = router;