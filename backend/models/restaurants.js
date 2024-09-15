// models/Restaurant.js
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    'Restaurant ID': { type: Number, required: true, unique: true },
    'Restaurant Name': { type: String, required: true },
    'Country Code': Number,
    City: String,
    Address: String,
    Locality: String,
    'Locality Verbose': String,
    Longitude: Number,
    Latitude: Number,
    Cuisines: String,
    'Average Cost for two': Number,
    Currency: String,
    'Has Table booking': String,
    'Has Online delivery': String,
    'Is delivering now': String,
    'Switch to order menu': String,
    'Price range': Number,
    'Aggregate rating': Number,
    'Rating color': String,
    'Rating text': String,
    Votes: Number,
    photos_url: String,
    url: String,
    menu_url: String,
    book_url: String,
    featured_image: String,
  }, { collection: 'all' });
  

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;