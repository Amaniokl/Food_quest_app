// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');  // For image uploads
const path = require('path');

// Initialize app
const app = express();
app.use(bodyParser.json());


// MongoDB Connection
const username = encodeURIComponent("amanoutlook2003");
const password = encodeURIComponent("Aman@2003");
const cluster = "cluster0.06bk8.mongodb.net";
const dbName = "restaurants";

const uri = `mongodb+srv://${username}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));
// ... rest of your code ...
// Restaurant Schema

const restaurantSchema = new mongoose.Schema({
    restaurant_id: Number,  // Changed from 6317637 to Number
    restaurant_name: String,
    country_code: String,
    city: String,
    address: String,
    locality: String,
    locality_verbose: String,
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: [Number]
    },
    cuisines: String,
    average_cost_for_two: Number,
    currency: String,
    has_table_booking: Boolean,
    has_online_delivery: Boolean,
    is_delivering_now: Boolean,
    switch_to_order_menu: Boolean,
    price_range: Number,
    aggregate_rating: Number,
    rating_color: String,
    rating_text: String,
    votes: Number,
    photos_url: String,
    url: String,
    menu_url: String,
    book_url: String,
    featured_image: String
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);


// Get all restaurants
app.get('/restaurants', async (_req, res) => {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
});

// Get restaurant details
// Get restaurant by Restaurant ID (not _id)
app.get("/restaurant/:id", async (req, res) => {
    try {
      const restaurantId = parseInt(req.params.id); // Ensure it's cast to a number
      const restaurant = await Restaurant.findOne({
        "Restaurant ID": restaurantId,
      });
      if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
      }
      res.json(restaurant);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

// Search restaurants by location (geo-location search)
// app.get('/restaurants/location', async (req, res) => {
//     const { lat, lng, radius } = req.query;
//     const restaurants = await Restaurant.find({
//         location: {
//             $geoWithin: {
//                 $centerSphere: [[lng, lat], radius / 6378.1], // Radius in kilometers
//             },
//         },
//     });
//     res.json(restaurants);
// });

// Image search (upload and recognize cuisine type)
// const upload = multer({ dest: 'uploads/' });
// app.post('/restaurants/search-image', upload.single('image'), (req, res) => {
//     const image = req.file.path;
//     // Use an image recognition API (e.g., TensorFlow.js, Google Vision API) here to identify the cuisine.
//     const recognizedCuisine = "pasta"; // Example after recognition
//     Restaurant.find({ cuisine: recognizedCuisine }).then(restaurants => res.json(restaurants));
// });

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
